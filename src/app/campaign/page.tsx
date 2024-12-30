'use client';

import { useState, useEffect, FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import CampaignFilters from './components/campaign-filters';
import CampaignList from './components/campaign-list';
import CampaignDetailsModal from './components/campaign-details-modal';
import CampaignCreateModal from './components/campaign-create-modal';
import CampaignDeleteModal from './components/campaign-delete-modal';
import Pagination from './components/pagination';
import Loader from './components/loader';

import {
	listCampaigns,
	distinctCampaignNames,
	createCampaign,
	getCampaignById,
	startCampaign,
	deleteCampaignById,
	filterCampaigns,
} from '@/actions';
import { hasTruthyValue } from '@/lib/utils';
import { CreateCampaign, PaginatedCampaignResponse, Campaign } from '@/lib/types';

export default function CampaignPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [campaign, setCampaign] = useState<PaginatedCampaignResponse | null>(null);
	const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

	const [selectedCampaignStatusFilter, setSelectedCampaignStatusFilter] =
		useState('Filter by');
	const [campaignOptions, setCampaignOptions] = useState<string[]>([]);
	const [searchedCampaignOptions, setSearchedCampaignOptions] = useState<string[]>([]);

	// this one is for campaign search
	const [searchCampaignByPartialName, setSearchCampaignByPartialName] =
		useState<string>('');

	// this one is for the search text inside the campaign filter
	const [searchCampaignOptions, setSearchCampaignOptions] = useState<string>('');
	const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
	const [createCampaignObj, setCreateCampaignObj] = useState<CreateCampaign>({
		name: '',
		description: '',
		totalLeads: 0,
		invites: 0,
		connections: 0,
	});
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
	const [selectedCampaignIDForDelete, setSelectedCampaignIDForDelete] = useState<
		string | null
	>(null);

	const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
	const [showCampaignDetailsModal, setShowCampaignDetailsModal] = useState(false);
	const [showCampaignDeleteModal, setShowCampaignDeleteModal] = useState(false);

	const [paginationDetails, setPaginationDetails] = useState({
		totalPages: 1,
		currentPageNumber: 1,
	});

	const canGoToPrevPage = () => {
		return paginationDetails.currentPageNumber !== 1;
	};

	const canGoToNextPage = () => {
		return paginationDetails.currentPageNumber !== paginationDetails.totalPages;
	};

	const handlePageChange = (direction: 'next' | 'previous') => {
		setIsLoading(true);
		if (direction === 'next' && canGoToNextPage()) {
			setPaginationDetails((prev) => ({
				...prev,
				currentPageNumber: prev.currentPageNumber + 1,
			}));
			listCampaigns(campaign?.nextCursor as string, 'next').then((paginatedCampaigns) => {
				setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
				setIsLoading(false);
			});
		} else if (direction === 'previous' && canGoToPrevPage()) {
			setPaginationDetails((prev) => ({
				...prev,
				currentPageNumber: prev.currentPageNumber - 1,
			}));
			listCampaigns(campaign?.previousCursor as string, 'previous').then(
				(paginatedCampaigns) => {
					setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
					setIsLoading(false);
				}
			);
		}
	};

	const [campaignFilter, setCampaignFilter] = useState({
		exactNames: '', // comma-separated (without whitespace)
		partialName: '',
		status: '',
	});

	const handlePromptDelete = (campaignId: string) => {
		setSelectedCampaignIDForDelete(campaignId);
		setShowCampaignDeleteModal(true);
	};

	const handleCreateCampaignObj = (key: string, value: string | number) =>
		setCreateCampaignObj((prev) => ({ ...prev, [key]: value }));

	const handleCreateCampaign = (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		createCampaign({
			...createCampaignObj,
			// not sure why have to do this, but without this parsing the server throws error
			totalLeads: parseInt(createCampaignObj.totalLeads as unknown as string),
			connections: parseInt(createCampaignObj.connections as unknown as string),
			invites: parseInt(createCampaignObj.invites as unknown as string),
		}).then(() => {
			listCampaigns()
				.then((paginatedCampaigns) => {
					setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
				})
				.then(() => {
					distinctCampaignNames().then((campaignNames) => {
						setCampaignOptions(campaignNames as string[]);
						setShowCreateCampaignModal(false);
						setCreateCampaignObj({
							name: '',
							description: '',
							totalLeads: 0,
							invites: 0,
							connections: 0,
						});
						setIsLoading(false);
					});
				});
		});
	};

	const handleSelectCampaign = (campaignId: string) => {
		setShowCampaignDetailsModal(true);
		getCampaignById(campaignId).then((campaign) =>
			setSelectedCampaign(campaign as Campaign)
		);
	};

	const handleStartCampaign = (campaignId: string) => {
		setIsLoading(true);
		startCampaign(campaignId).then(() =>
			listCampaigns().then((paginatedCampaigns) => {
				setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
				setIsLoading(false);
			})
		);
	};

	const handleDeleteCampaign = () => {
		if (selectedCampaignIDForDelete) {
			setIsLoading(true);
			deleteCampaignById(selectedCampaignIDForDelete).then(() => {
				listCampaigns()
					.then((paginatedCampaigns) => {
						setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
						setShowCampaignDeleteModal(false);
						setSelectedCampaignIDForDelete(null);
					})
					.then(() => {
						distinctCampaignNames().then((campaignNames) => {
							setCampaignOptions(campaignNames as string[]);
							setIsLoading(false);
						});
					});
			});
		}
	};

	useEffect(() => {
		setIsLoading(true);
		listCampaigns().then((paginatedCampaigns) => {
			setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
			setIsLoading(false);
		});

		distinctCampaignNames().then((campaignNames) => {
			setCampaignOptions(campaignNames as string[]);
		});
	}, []);

	useEffect(() => {
		if (searchCampaignOptions?.trim()) {
			const matches = campaignOptions.filter((opt) =>
				opt.toLowerCase().includes(searchCampaignOptions.toLowerCase())
			);
			setSearchedCampaignOptions(matches);
		} else {
			setSearchedCampaignOptions([]);
		}
	}, [searchCampaignOptions]);

	useEffect(() => {
		if (!hasTruthyValue(campaignFilter)) {
			setFilteredCampaigns([]);
		} else {
			setIsLoading(true);
			filterCampaigns(campaignFilter).then((filteredCampaigns) => {
				setFilteredCampaigns(filteredCampaigns as Campaign[]);
				setIsLoading(false);
			});
		}
	}, [campaignFilter]);

	useEffect(() => {
		setPaginationDetails((prev) => ({
			...prev,
			totalPages: campaign?.totalCount ? Math.ceil(campaign.totalCount / 10) : 1,
		}));
	}, [campaign]);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex lg:flex-row flex-col justify-between'>
				<CampaignFilters
					searchCampaignByPartialName={searchCampaignByPartialName}
					setSearchCampaignByPartialName={setSearchCampaignByPartialName}
					selectedCampaignStatusFilter={selectedCampaignStatusFilter}
					setSelectedCampaignStatusFilter={setSelectedCampaignStatusFilter}
					selectedCampaigns={selectedCampaigns}
					setSelectedCampaigns={setSelectedCampaigns}
					campaignOptions={campaignOptions}
					searchCampaignOptions={searchCampaignOptions}
					setSearchCampaignOptions={setSearchCampaignOptions}
					searchedCampaignOptions={searchedCampaignOptions}
					setCampaignFilter={setCampaignFilter}
				/>
				<div>
					<Button
						className='gap-2 bg-indigo-700 rounded-full lg:mt-0 mt-2 hover:bg-indigo-800'
						type='button'
						onClick={() => setShowCreateCampaignModal(true)}
					>
						<Plus className='h-4 w-4' /> Create Campaign
					</Button>
				</div>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					{/* Campaigns */}
					<CampaignList
						campaigns={
							filteredCampaigns?.length
								? filteredCampaigns
								: (campaign?.data as Campaign[])
						}
						hasFilteredResults={
							!(hasTruthyValue(campaignFilter) && !filteredCampaigns.length)
						}
						handleSelectCampaign={handleSelectCampaign}
						handleStartCampaign={handleStartCampaign}
						handlePromptDelete={handlePromptDelete}
					/>
					{/* Pagination */}
					{!hasTruthyValue(campaignFilter) && (
						<Pagination
							totalCount={campaign?.totalCount || 0}
							currentPageNumber={paginationDetails.currentPageNumber}
							totalPages={paginationDetails.totalPages}
							handlePageChange={handlePageChange}
						/>
					)}
					{/* Create campaign modal */}
					<CampaignCreateModal
						showCreateCampaignModal={showCreateCampaignModal}
						setShowCreateCampaignModal={setShowCreateCampaignModal}
						createCampaignObj={createCampaignObj}
						handleCreateCampaignObj={handleCreateCampaignObj}
						handleCreateCampaign={handleCreateCampaign}
					/>
					{/* Campaign details modal */}
					<CampaignDetailsModal
						showCampaignDetailsModal={showCampaignDetailsModal}
						setShowCampaignDetailsModal={setShowCampaignDetailsModal}
						selectedCampaign={selectedCampaign}
					/>
					{/* Delete confirmation modal */}
					<CampaignDeleteModal
						showCampaignDeleteModal={showCampaignDeleteModal}
						setShowCampaignDeleteModal={setShowCampaignDeleteModal}
						handleDeleteCampaign={handleDeleteCampaign}
					/>
				</>
			)}
		</div>
	);
}
