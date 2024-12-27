'use client';

import { MoreVertical, Plus, Search } from 'lucide-react';

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

			<div className='rounded-lg border bg-white'>
				<div className='flex items-center justify-between border-t px-4 py-2'>
					<div className='text-sm text-gray-500'>Showing 1-10 of 1000</div>
					<div className='flex gap-2'>
						<Button variant='outline' size='sm'>
							Previous
						</Button>
						<Button variant='outline' size='sm'>
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
