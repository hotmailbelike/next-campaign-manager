'use client';

import { Plus, Search } from 'lucide-react';

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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const campaigns = [
	{
		id: 1,
		name: 'Growth Connection',
		createdAt: 'Create in August 2014',
		status: 'Draft',
		totalLead: 50,
		inviteSent: 50,
		connection: 50,
	},
	{
		id: 2,
		name: 'Market Expansion',
		createdAt: 'Created in January 2019',
		status: 'Active',
		totalLead: 120,
		inviteSent: 110,
		connection: 100,
	},
	{
		id: 3,
		name: 'Brand Awareness',
		createdAt: 'Created in March 2020',
		status: 'Completed',
		totalLead: 200,
		inviteSent: 200,
		connection: 150,
	},
	{
		id: 4,
		name: 'Product Launch',
		createdAt: 'Created in July 2022',
		status: 'Draft',
		totalLead: 80,
		inviteSent: 80,
		connection: 70,
	},
	{
		id: 5,
		name: 'Customer Retention',
		createdAt: 'Created in December 2021',
		status: 'Active',
		totalLead: 150,
		inviteSent: 145,
		connection: 140,
	},
	{
		id: 6,
		name: 'Networking Event',
		createdAt: 'Created in April 2023',
		status: 'Completed',
		totalLead: 60,
		inviteSent: 55,
		connection: 50,
	},
	{
		id: 7,
		name: 'Partnership Outreach',
		createdAt: 'Created in February 2022',
		status: 'Active',
		totalLead: 95,
		inviteSent: 95,
		connection: 90,
	},
	{
		id: 8,
		name: 'Seasonal Promotion',
		createdAt: 'Created in October 2020',
		status: 'Completed',
		totalLead: 300,
		inviteSent: 290,
		connection: 275,
	},
	{
		id: 9,
		name: 'Customer Feedback',
		createdAt: 'Created in May 2021',
		status: 'Draft',
		totalLead: 40,
		inviteSent: 40,
		connection: 30,
	},
	{
		id: 10,
		name: 'Sales Boost Campaign',
		createdAt: 'Created in November 2018',
		status: 'Active',
		totalLead: 180,
		inviteSent: 170,
		connection: 160,
	},
	// {
	// 	id: 11,
	// 	name: 'Influencer Outreach',
	// 	createdAt: 'Created in September 2023',
	// 	status: 'Completed',
	// 	totalLead: 75,
	// 	inviteSent: 70,
	// 	connection: 65,
	// },
];

export default function CampaignPage() {
	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center gap-4'>
				<div className='relative flex-1'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
					<Input placeholder='Search Campaign' className='pl-8' />
				</div>
				<Select>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Filter by' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='draft'>Draft</SelectItem>
							<SelectItem value='active'>Active</SelectItem>
							<SelectItem value='completed'>Completed</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Select>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select Campaign' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='growth'>Growth Connection</SelectItem>
							<SelectItem value='production'>Production house</SelectItem>
							<SelectItem value='realestate'>Real Estate</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button className='gap-2'>
					<Plus className='h-4 w-4' /> Create Campaign
				</Button>
			</div>

			{/* Campaigns */}
			{/* <Table>
					<TableHeader>
						<TableRow>
							<TableHead>NAME</TableHead>
							<TableHead>STATUS</TableHead>
							<TableHead>TOTAL LEAD</TableHead>
							<TableHead>INVITE SENT</TableHead>
							<TableHead>CONNECTION</TableHead>
							<TableHead className='w-[50px]'></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{campaigns.map((campaign) => (
							<TableRow key={campaign.id}>
								<TableCell>
									<div className='flex flex-col'>
										<span className='font-medium'>{campaign.name}</span>
										<span className='text-sm text-gray-500'>{campaign.createdAt}</span>
									</div>
								</TableCell>
								<TableCell>{campaign.status}</TableCell>
								<TableCell>{campaign.totalLead}</TableCell>
								<TableCell>{campaign.inviteSent}</TableCell>
								<TableCell>{campaign.connection}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' size='icon' className='h-8 w-8'>
												<MoreVertical className='h-4 w-4' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuItem>Go to Details</DropdownMenuItem>
											<DropdownMenuItem>Start Campaign</DropdownMenuItem>
											<DropdownMenuItem className='text-red-600'>
												Delete Campaign
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table> */}

			{/* Table */}
			<div className='text-gray-900'>
				{/* Table headers */}
				<div className='grid grid-cols-7 gap-4 p-4 rounded-xl bg-gray-50 border-gray-50 uppercase text-xs font-semibold text-gray-500'>
					<div className='col-span-2'>Name</div>
					<div>Status</div>
					<div>Total Lead</div>
					<div>Invite Sent</div>
					<div>Connection</div>
					<div></div>
				</div>

				{/* Table rows */}
				{campaigns.map((campaign) => (
					<div
						key={campaign.id}
						className='grid grid-cols-7 gap-4 py-6 px-4 my-4 rounded-xl bg-white border border-gray-100 items-center'
					>
						<div className='col-span-2'>
							<div className='flex items-center'>
								<Avatar className='mr-3'>
									<AvatarImage src='campaign-icon.svg' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className='flex flex-col'>
									<span className='leading-none text-sm font-semibold'>
										{campaign.name}
									</span>
									<span className='text-gray-500 leading-none text-xs font-normal mt-1'>
										{campaign.createdAt}
									</span>
								</div>
							</div>
						</div>
						<div>
							<Badge className='text-sm font-medium bg-gray-100  hover:bg-gray-200 text-gray-900'>
								{campaign.status}
							</Badge>
						</div>

						<div className='flex items-center'>
							<Avatar className='mr-2 w-4'>
								<AvatarImage src='user-icon.svg' />
								<AvatarFallback>UR</AvatarFallback>
							</Avatar>
							{campaign.totalLead}
						</div>
						<div className='flex items-center'>
							<Avatar className='mr-2 w-4'>
								<AvatarImage src='mail-icon.svg' />
								<AvatarFallback>IT</AvatarFallback>
							</Avatar>
							{campaign.inviteSent}
						</div>
						<div className='flex items-center'>
							<Avatar className='mr-2 w-4'>
								<AvatarImage src='check-icon.svg' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							{campaign.connection}
						</div>

						<div>
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
