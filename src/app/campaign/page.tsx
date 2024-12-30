'use client';

import { ChevronDown, Plus, Search, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
	listCampaigns,
	distinctCampaignNames,
	createCampaign,
	getCampaignById,
	startCampaign,
	deleteCampaignById,
} from '@/actions';
import { useState, useEffect } from 'react';
import {
	CreateCampaign,
	PaginatedCampaignResponse,
	Campaign,
	CampaignStatus,
} from '@/lib/types';
import { capitalizeFirstLetter, getMonthYear } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CampaignPage() {
	const [campaign, setCampaign] = useState<PaginatedCampaignResponse | null>(null);
	const [selectedFilter, setSelectedFilter] = useState('Filter by');
	const [campaignOptions, setCampaignOptions] = useState<string[]>([]);
	const [searchedCampaignOptions, setSearchedCampaignOptions] = useState<string[]>([]);
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

	const handlePromptDelete = (campaignId: string) => {
		setSelectedCampaignIDForDelete(campaignId);
		setShowCampaignDeleteModal(true);
	};

	const handleCreateCampaignObj = (key: string, value: string | number) =>
		setCreateCampaignObj((prev) => ({ ...prev, [key]: value }));

	const handleSelectCampaign = (campaignId: string) => {
		setShowCampaignDetailsModal(true);
		getCampaignById(campaignId).then((campaign) =>
			setSelectedCampaign(campaign as Campaign)
		);
	};

	const handleStartCampaign = (campaignId: string) => {
		startCampaign(campaignId).then(() =>
			listCampaigns().then((paginatedCampaigns) => {
				setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
			})
		);
	};

	const handleDeleteCampaign = () => {
		if (selectedCampaignIDForDelete) {
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
						});
					});
			});
		}
	};

	useEffect(() => {
		listCampaigns().then((paginatedCampaigns) => {
			setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
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

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex lg:flex-row flex-col  justify-between'>
				{/* <div className='grid lg:grid-cols-3 grid-cols-1 gap-2 items-center '> */}
				<div className='lg:flex items-center '>
					{/* Campaign Search */}
					<div className='relative rounded-full mr-4 w-[350px] bg-gray-50'>
						<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
						<Input placeholder='Search Campaign' className='pl-8 rounded-full' />
					</div>

					{/* Campaign Status Filter */}
					<Select
						value={selectedFilter}
						onValueChange={setSelectedFilter}
						defaultValue='Filter by'
					>
						<SelectTrigger className='w-[124px] mr-2 rounded-full text-gray-800'>
							<SelectValue placeholder='Filter by' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='Filter by'>
									{selectedFilter === 'Filter by' ? 'Filter by' : 'None'}
								</SelectItem>
								<SelectItem value='DRAFT'>Draft</SelectItem>
								<SelectItem value='ACTIVE'>Active</SelectItem>
								<SelectItem value='COMPLETED'>Completed</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{/* Campaign filter */}
					<Popover>
						<PopoverTrigger className='text-left text-gray-800 w-[190px] rounded-full  border-gray-300 border-solid border-[1px] py-2 px-3 text-sm font-medium flex items-center justify-between'>
							Select Campaign
							<ChevronDown className='h-4 w-4' color='#1f2937' />
						</PopoverTrigger>
						<PopoverContent side='bottom' align='end' className='w-[300px] p-1'>
							<div className='relative w-full bg-gray-50 mb-2'>
								<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
								<Input
									placeholder='Search Campaign'
									className='pl-8 rounded-md focus-visible:outline-0 focus-visible:ring-[1px] focus-visible:ring-blue-600'
									onChange={({ target: { value } }) => setSearchCampaignOptions(value)}
									value={searchCampaignOptions || ''}
								/>
								<XCircle
									className='absolute right-2.5 top-2.5 h-4 w-4 text-white z-10 hover:cursor-pointer'
									fill='#9ca3af'
									onClick={() => setSearchCampaignOptions('')}
								/>
							</div>
							<div className='p-4  text-gray-900 border-gray-200 border-[1px] rounded-md'>
								<div className='mb-3'>
									<Label className='text-sm font-semibold text-gray-900 '>
										Select Campaign
									</Label>
								</div>

								{campaignOptions?.length &&
									(searchedCampaignOptions?.length
										? searchedCampaignOptions.map((campaignOption, idx) => (
												<div
													key={`searchedCampaignOption-${idx}`}
													className={
														'flex items-center space-x-2 ' +
														(campaignOptions.length - 1 == idx ? 'mb-0' : 'mb-5')
													}
												>
													<Checkbox
														checked={!!selectedCampaigns.includes(campaignOption)}
														id={campaignOption}
														className='bg-gray-50 shadow-none'
														onCheckedChange={(checked) => {
															if (checked)
																setSelectedCampaigns((prev) => [...prev, campaignOption]);
															else
																setSelectedCampaigns((prev) =>
																	prev.filter((opt) => opt !== campaignOption)
																);
														}}
													/>
													<Label
														htmlFor={campaignOption}
														className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
													>
														{campaignOption}
													</Label>
												</div>
										  ))
										: campaignOptions.map((campaignOption, idx) => (
												<div
													key={`campaignOption-${idx}`}
													className={
														'flex items-center space-x-2 ' +
														(campaignOptions.length - 1 == idx ? 'mb-0' : 'mb-5')
													}
												>
													<Checkbox
														checked={!!selectedCampaigns.includes(campaignOption)}
														id={campaignOption}
														className='bg-gray-50 shadow-none'
														onCheckedChange={(checked) => {
															if (checked)
																setSelectedCampaigns((prev) => [...prev, campaignOption]);
															else
																setSelectedCampaigns((prev) =>
																	prev.filter((opt) => opt !== campaignOption)
																);
														}}
													/>
													<Label
														htmlFor={campaignOption}
														className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
													>
														{campaignOption}
													</Label>
												</div>
										  )))}
							</div>
						</PopoverContent>
					</Popover>
				</div>
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

			{/* Campaigns */}
			{/* Table */}
			<div className='text-gray-900'>
				{/* Table headers */}
				<div className='lg:grid hidden grid-cols-7 gap-4 p-4 rounded-xl bg-gray-50 border-gray-50 uppercase text-xs font-semibold text-gray-500'>
					<div className='col-span-2'>Name</div>
					<div>Status</div>
					<div>Total Lead</div>
					<div>Invite Sent</div>
					<div>Connection</div>
					<div></div>
				</div>

				{/* Table rows */}
				{campaign?.data?.length &&
					campaign.data.map((campaign) => (
						<div
							key={campaign.id}
							className='grid lg:grid-cols-7 grid-cols-1 gap-4 py-6 px-4 my-4 rounded-xl bg-white border border-gray-100 items-center'
						>
							<div className='col-span-2 '>
								<div className='flex items-center'>
									<Avatar className='mr-3'>
										<AvatarImage src='campaign-icon.svg' />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className='flex flex-row justify-between'>
										<div className='flex flex-col'>
											<span className='leading-none text-sm font-semibold'>
												{campaign.name}
											</span>
											<span className='text-gray-500 leading-none text-xs font-normal mt-1'>
												Created in {getMonthYear(new Date(campaign.createdAt))}
											</span>
										</div>
										<div className='lg:hidden visible'>
											<DropdownMenu>
												<DropdownMenuTrigger asChild className='hover:cursor-pointer'>
													<Avatar className='mr-2 w-10'>
														<AvatarImage src='vertical-dots-icon.svg' />
														<AvatarFallback>VS</AvatarFallback>
													</Avatar>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align='end'
													className='w-[224px] border-none rounded-xl py-2 px-4'
												>
													<DropdownMenuItem className='p-0'>
														<div
															className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
															onClick={() => handleSelectCampaign(campaign.id)}
														>
															<Avatar className='mr-6 w-5'>
																<AvatarImage src='adjustments-horizontal-icon.svg' />
																<AvatarFallback>AL</AvatarFallback>
															</Avatar>
															Go to Details
														</div>
													</DropdownMenuItem>
													{campaign.status === CampaignStatus.DRAFT && (
														<DropdownMenuItem className='p-0'>
															<div
																className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
																onClick={() => handleStartCampaign(campaign.id)}
															>
																<Avatar className='mr-6 w-5'>
																	<AvatarImage src='play-icon.svg' />
																	<AvatarFallback>PY</AvatarFallback>
																</Avatar>
																Start Campaign
															</div>
														</DropdownMenuItem>
													)}
													<Separator className='w-[120%] ml-[-16px]' />
													<DropdownMenuItem className='text-red-600 p-0'>
														<div
															className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
															onClick={() => handlePromptDelete(campaign.id)}
														>
															<Avatar className='mr-6 w-5'>
																<AvatarImage src='trash-icon.svg' />
																<AvatarFallback>TH</AvatarFallback>
															</Avatar>
															Delete Campaign
														</div>
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</div>
								</div>
							</div>
							<div>
								<Badge className='text-sm font-medium bg-gray-100  hover:bg-gray-200 text-gray-900'>
									{capitalizeFirstLetter(campaign.status as unknown as string)}
								</Badge>
							</div>

							<div className='flex items-center'>
								<Avatar className='mr-2 w-4'>
									<AvatarImage src='user-icon.svg' />
									<AvatarFallback>UR</AvatarFallback>
								</Avatar>
								{campaign.totalLeads}
							</div>
							<div className='flex items-center'>
								<Avatar className='mr-2 w-4'>
									<AvatarImage src='mail-icon.svg' />
									<AvatarFallback>IT</AvatarFallback>
								</Avatar>
								{campaign.invites}
							</div>
							<div className='flex items-center'>
								<Avatar className='mr-2 w-4'>
									<AvatarImage src='check-icon.svg' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								{campaign.connections}
							</div>

							<div className='lg:flex hidden'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild className='hover:cursor-pointer'>
										<Avatar className='mr-2 w-10'>
											<AvatarImage src='vertical-dots-icon.svg' />
											<AvatarFallback>VS</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align='end'
										className='w-[224px] border-none rounded-xl py-2 px-4'
									>
										<DropdownMenuItem className='p-0'>
											<div
												className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
												onClick={() => handleSelectCampaign(campaign.id)}
											>
												<Avatar className='mr-6 w-5'>
													<AvatarImage src='adjustments-horizontal-icon.svg' />
													<AvatarFallback>AL</AvatarFallback>
												</Avatar>
												Go to Details
											</div>
										</DropdownMenuItem>
										{campaign.status == CampaignStatus.DRAFT && (
											<DropdownMenuItem className='p-0'>
												<div
													className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
													onClick={() => handleStartCampaign(campaign.id)}
												>
													<Avatar className='mr-6 w-5'>
														<AvatarImage src='play-icon.svg' />
														<AvatarFallback>PY</AvatarFallback>
													</Avatar>
													Start Campaign
												</div>
											</DropdownMenuItem>
										)}
										<Separator className='w-[120%] ml-[-16px]' />
										<DropdownMenuItem className='text-red-600 p-0'>
											<div
												className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
												onClick={() => handlePromptDelete(campaign.id)}
											>
												<Avatar className='mr-6 w-5'>
													<AvatarImage src='trash-icon.svg' />
													<AvatarFallback>TH</AvatarFallback>
												</Avatar>
												Delete Campaign
											</div>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					))}
			</div>

			{/* Pagination */}
			<div className='flex items-center justify-between px-4 py-2'>
				<div className='text-sm font-medium text-gray-500'>
					Showing <span className='text-black'>1-10</span> of{' '}
					<span className='text-black'>{campaign?.totalCount}</span>
				</div>
				<div className='flex '>
					<Button
						variant='outline'
						className='rounded-tr-none rounded-br-none border-r-0 text-sm font-medium px-3 py-2 text-gray-500  hover:text-gray-600'
						size='sm'
					>
						Previous
					</Button>
					<Button
						variant='outline'
						className='rounded-tl-none rounded-bl-none text-sm font-medium px-6 py-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800'
						size='sm'
					>
						Next
					</Button>
				</div>
			</div>

			{/* Create campaign modal */}
			<Dialog
				open={showCreateCampaignModal}
				onOpenChange={(isOpen) => setShowCreateCampaignModal(isOpen)}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Create a new Campaign</DialogTitle>
						<DialogDescription>
							New Campaigns will be in draft by default.
						</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							createCampaign({
								...createCampaignObj,
							}).then(() => {
								listCampaigns()
									.then((paginatedCampaigns) => {
										setCampaign(paginatedCampaigns as PaginatedCampaignResponse);
										setShowCreateCampaignModal(false);
									})
									.then(() => {
										distinctCampaignNames().then((campaignNames) => {
											setCampaignOptions(campaignNames as string[]);
										});
									});
							});
						}}
					>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label className='text-right'>Name</Label>
								<Input
									required
									value={createCampaignObj['name']}
									onChange={({ target: { value } }) =>
										handleCreateCampaignObj('name', value)
									}
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label className='text-right'>Description</Label>
								<Textarea
									required
									value={createCampaignObj['description']}
									onChange={({ target: { value } }) =>
										handleCreateCampaignObj('description', value)
									}
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label className='text-right'>Leads</Label>
								<Input
									required
									type='number'
									value={createCampaignObj['totalLeads']}
									onChange={({ target: { value } }) =>
										handleCreateCampaignObj('totalLeads', value)
									}
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label className='text-right'>Invites</Label>
								<Input
									required
									type='number'
									value={createCampaignObj['invites']}
									onChange={({ target: { value } }) =>
										handleCreateCampaignObj('invites', value)
									}
									className='col-span-3'
								/>
							</div>
							<div className='grid grid-cols-4 items-center gap-4'>
								<Label className='text-right'>Connections</Label>
								<Input
									required
									type='number'
									value={createCampaignObj['connections']}
									onChange={({ target: { value } }) =>
										handleCreateCampaignObj('connections', value)
									}
									className='col-span-3'
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								onClick={() => setShowCreateCampaignModal(false)}
								type='button'
								size={'sm'}
								className='bg-red-500 hover:bg-red-600'
							>
								Cancel
							</Button>
							<Button
								type='submit'
								size={'sm'}
								className='bg-indigo-700 hover:bg-indigo-800'
							>
								Create Campaign
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Campaign details modal */}
			<Dialog
				open={showCampaignDetailsModal}
				onOpenChange={(isOpen) => setShowCampaignDetailsModal(isOpen)}
			>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Campaign Details</DialogTitle>
					</DialogHeader>

					<div className='grid gap-2 py-4'>
						<div className=''>
							<Label className='text-right mb-2'>Name:</Label>
							<p className='text-sm font-normal'>{selectedCampaign?.['name']}</p>
						</div>
						<Separator></Separator>
						<div className=''>
							<Label className='text-right mb-2'>Description:</Label>
							<p className='text-sm font-normal'>{selectedCampaign?.['description']}</p>
						</div>
						<Separator></Separator>

						<div className=''>
							<Label className='text-right mb-2'>Leads:</Label>
							<p className='text-sm font-normal'>{selectedCampaign?.['totalLeads']}</p>
						</div>
						<Separator></Separator>

						<div className=''>
							<Label className='text-right mb-2'>Invites:</Label>
							<p className='text-sm font-normal'>{selectedCampaign?.['invites']}</p>
						</div>
						<Separator></Separator>

						<div className=''>
							<Label className='text-right mb-2'>Connections:</Label>
							<p className='text-sm font-normal'>{selectedCampaign?.['connections']}</p>
						</div>
						<Separator></Separator>
					</div>

					<DialogFooter>
						<Button
							onClick={() => setShowCampaignDetailsModal(false)}
							type='button'
							size={'sm'}
							className='bg-indigo-700 hover:bg-indigo-800'
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete confirmation modal */}
			<AlertDialog
				open={showCampaignDeleteModal}
				onOpenChange={(isOpen) => setShowCampaignDeleteModal(isOpen)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this campaign?</AlertDialogTitle>
						<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className='bg-red-500 hover:bg-red-600'
							onClick={() => handleDeleteCampaign()}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
