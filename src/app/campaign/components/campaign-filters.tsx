import { Search, ChevronDown, XCircle } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dispatch, SetStateAction } from 'react';

interface CampaignFiltersProps {
	searchCampaignByPartialName: string;
	setSearchCampaignByPartialName: (value: string) => void;
	selectedCampaignStatusFilter: string;
	setSelectedCampaignStatusFilter: (value: string) => void;
	selectedCampaigns: string[];
	setSelectedCampaigns: Dispatch<SetStateAction<string[]>>;
	campaignOptions: string[];
	searchCampaignOptions: string;
	setSearchCampaignOptions: (value: string) => void;
	searchedCampaignOptions: string[];
	setCampaignFilter: (filter: any) => void;
}

export default function CampaignFilters({
	searchCampaignByPartialName,
	setSearchCampaignByPartialName,
	selectedCampaignStatusFilter,
	setSelectedCampaignStatusFilter,
	selectedCampaigns,
	setSelectedCampaigns,
	campaignOptions,
	searchCampaignOptions,
	setSearchCampaignOptions,
	searchedCampaignOptions,
	setCampaignFilter,
}: CampaignFiltersProps) {
	return (
		<div className='lg:flex items-center lg:space-y-0 space-y-2'>
			{/* Campaign Search */}
			<div className='relative rounded-full mr-4 w-[350px] bg-gray-50'>
				<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
				<Input
					placeholder='Search Campaign'
					className='pl-8 rounded-full'
					value={searchCampaignByPartialName}
					onChange={({ target: { value } }) => {
						setSearchCampaignByPartialName(value);
						setCampaignFilter((prev: any) => ({ ...prev, partialName: value }));
					}}
				/>
			</div>

			{/* Campaign Status Filter */}
			<Select
				value={selectedCampaignStatusFilter}
				onValueChange={(value) => {
					setSelectedCampaignStatusFilter(value);
					setCampaignFilter((prev: any) => ({
						...prev,
						status: value !== 'Filter by' ? value : '',
					}));
				}}
				defaultValue='Filter by'
			>
				<SelectTrigger className='w-[124px] mr-2 rounded-full text-gray-800'>
					<SelectValue placeholder='Filter by' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='Filter by'>
							{selectedCampaignStatusFilter === 'Filter by' ? 'Filter by' : 'None'}
						</SelectItem>
						<SelectItem value='DRAFT'>Draft</SelectItem>
						<SelectItem value='ACTIVE'>Active</SelectItem>
						<SelectItem value='COMPLETED'>Completed</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			{/* Campaign filter */}
			<Popover>
				<PopoverTrigger
					className={`text-left w-[190px] rounded-full border-[1px] py-2 px-3 text-sm font-medium flex items-center justify-between ${
						selectedCampaigns.length > 0
							? 'text-indigo-800 bg-indigo-50 border-indigo-400'
							: 'text-gray-800 bg-white border-gray-300'
					}`}
				>
					<div className='flex items-center space-x-2'>
						<span>
							{selectedCampaigns.length > 0 ? 'Select Campaign' : 'Select Campaign'}
						</span>
						{selectedCampaigns.length > 0 && (
							<span className='bg-indigo-600 text-white rounded-full px-2 py-1 text-xs font-medium'>
								{selectedCampaigns.length}
							</span>
						)}
					</div>
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
													if (checked) {
														setSelectedCampaigns((prev) => [...prev, campaignOption]);
														setCampaignFilter((prev: any) => ({
															...prev,
															exactNames: prev.exactNames
																? `${prev.exactNames},${campaignOption}`
																: campaignOption,
														}));
													} else {
														setSelectedCampaigns((prev) =>
															prev.filter((opt) => opt !== campaignOption)
														);
														setCampaignFilter((prev: any) => ({
															...prev,
															exactNames: prev.exactNames
																.split(',')
																.filter((name: string) => name !== campaignOption)
																.join(','),
														}));
													}
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
													if (checked) {
														setSelectedCampaigns((prev) => [...prev, campaignOption]);
														setCampaignFilter((prev: any) => ({
															...prev,
															exactNames: prev.exactNames
																? `${prev.exactNames},${campaignOption}`
																: campaignOption,
														}));
													} else {
														setSelectedCampaigns((prev) =>
															prev.filter((opt) => opt !== campaignOption)
														);
														setCampaignFilter((prev: any) => ({
															...prev,
															exactNames: prev.exactNames
																.split(',')
																.filter((name: string) => name !== campaignOption)
																.join(','),
														}));
													}
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
	);
}
