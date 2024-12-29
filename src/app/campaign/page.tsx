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

import { listCampaigns, distinctCampaignNames } from '@/actions';
import { useState, useEffect } from 'react';
import { PaginatedCampaignResponse } from '@/lib/types';
import { capitalizeFirstLetter, getMonthYear } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function CampaignPage() {
	const [campaign, setCampaign] = useState<PaginatedCampaignResponse | null>(null);
	const [selectedFilter, setSelectedFilter] = useState('Filter by');
	const [campaignOptions, setCampaignOptions] = useState<string[]>([]);
	const [selectedCampaigns, setSelectedCampaigns] = useState([]);

	useEffect(() => {
		listCampaigns().then((paginatedCampaigns) => {
			setCampaign(paginatedCampaigns);
		});

		distinctCampaignNames().then((campaignNames) => {
			setCampaignOptions(campaignNames);
		});
	}, []);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex lg:flex-row flex-col  justify-between'>
				{/* <div className='grid lg:grid-cols-3 grid-cols-1 gap-2 items-center '> */}
				<div className='lg:flex items-center '>
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
								/>
								<XCircle
									className='absolute right-2.5 top-2.5 h-4 w-4 text-white z-10 hover:cursor-pointer'
									fill='#9ca3af'
								/>
							</div>
							<div className='p-4  text-gray-900 border-gray-200 border-[1px] rounded-md'>
								<div className='mb-3'>
									<Label className='text-sm font-semibold text-gray-900 '>
										Select Campaign
									</Label>
								</div>

								{campaignOptions?.length &&
									campaignOptions.map((campaignOption, idx) => (
										<div
											className={
												'flex items-center space-x-2 ' +
												(campaignOptions.length - 1 == idx ? 'mb-0' : 'mb-5')
											}
										>
											<Checkbox id='terms' className='bg-gray-50 shadow-none' />
											<Label
												htmlFor='terms'
												className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
											>
												{campaignOption}
											</Label>
										</div>
									))}
							</div>
						</PopoverContent>
					</Popover>
				</div>
				<div>
					<Button className='gap-2 bg-indigo-700 rounded-full lg:mt-0 mt-2'>
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
												{getMonthYear(new Date(campaign.createdAt))}
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
														<div className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'>
															<Avatar className='mr-6 w-5'>
																<AvatarImage src='adjustments-horizontal-icon.svg' />
																<AvatarFallback>AL</AvatarFallback>
															</Avatar>
															Go to Details
														</div>
													</DropdownMenuItem>
													<DropdownMenuItem className='p-0'>
														<div className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'>
															<Avatar className='mr-6 w-5'>
																<AvatarImage src='play-icon.svg' />
																<AvatarFallback>PY</AvatarFallback>
															</Avatar>
															Start Campaign
														</div>
													</DropdownMenuItem>
													<Separator className='w-[120%] ml-[-16px]' />
													<DropdownMenuItem className='text-red-600 p-0'>
														<div className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'>
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
											<div className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'>
												<Avatar className='mr-6 w-5'>
													<AvatarImage src='adjustments-horizontal-icon.svg' />
													<AvatarFallback>AL</AvatarFallback>
												</Avatar>
												Go to Details
											</div>
										</DropdownMenuItem>
										<DropdownMenuItem className='p-0'>
											<div className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'>
												<Avatar className='mr-6 w-5'>
													<AvatarImage src='play-icon.svg' />
													<AvatarFallback>PY</AvatarFallback>
												</Avatar>
												Start Campaign
											</div>
										</DropdownMenuItem>
										<Separator className='w-[120%] ml-[-16px]' />
										<DropdownMenuItem className='text-red-600 p-0'>
											<div className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'>
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
					<span className='text-black'>1000</span>
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
		</div>
	);
}
