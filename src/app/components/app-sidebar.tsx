'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import {
	ChartNoAxesColumn,
	ChevronDown,
	Flag,
	Home,
	Settings,
	SquareCheckBig,
	TrendingUp,
	Users,
	LifeBuoy,
	ChevronUp,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useState } from 'react';

const navigation = [
	{
		name: 'Analytics',
		href: '/analytics',
		icon: Home,
		subItems: [
			{ name: 'Overview', href: '/analytics/overview' },
			{ name: 'Reports', href: '/analytics/reports' },
		],
	},
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: ChartNoAxesColumn,
		subItems: [
			{ name: 'Activity', href: '/dashboard/main' },
			{ name: 'Team Stats', href: '/dashboard/stats' },
		],
	},
	{
		name: 'Campaign',
		href: '/campaign',
		icon: TrendingUp,
		subItems: [
			{ name: 'Overview', href: '/campaign' },
			{ name: 'Reports', href: '/analytics/reports' },
		],
	},
	{
		name: 'CRM',
		href: '/crm',
		icon: SquareCheckBig,
		subItems: [
			{ name: 'Overview', href: '/analytics/overview' },
			{ name: 'Reports', href: '/analytics/reports' },
		],
	},
	{
		name: 'Replies',
		href: '/replies',
		icon: Flag,
		subItems: [
			{ name: 'Overview', href: '/analytics/overview' },
			{ name: 'Reports', href: '/analytics/reports' },
		],
	},
	{
		name: 'Projects',
		href: '/projects',
		icon: Users,
		subItems: [
			{ name: 'Overview', href: '/analytics/overview' },
			{ name: 'Reports', href: '/analytics/reports' },
		],
	},
	{
		name: 'Extra Leads',
		href: '/extraLeads',
		icon: Users,
		subItems: [
			{ name: 'Overview', href: '/analytics/overview' },
			{ name: 'Reports', href: '/analytics/reports' },
		],
	},
	{
		name: 'Settings',
		href: '/analytics',
		icon: Settings,
		subItems: [
			{ name: 'Integration', href: '/analytics/overview' },
			{ name: 'Team Stats', href: '/analytics/reports' },
		],
	},
];

const bottomNavigation = [{ name: 'Support', href: '/support', icon: LifeBuoy }];

export function AppSidebar() {
	const pathname = usePathname();
	const [collapsibleState, setCollapsibleState] = useState(
		navigation.map(({ name }) => ({ name, isOpen: false }))
	);

	return (
		<Sidebar>
			<SidebarContent>
				<div className='flex h-full flex-col  bg-white '>
					<div className='flex h-16 items-center gap-2 px-6 py-8'>
						<div className='flex mt-4 items-center gap-2'>
							<div className='flex  h-6 w-6 items-center justify-center '>
								<img src='/logo.png' />
							</div>
							<span className='text-xl font-semibold text-gray-900'>Leadsync</span>
						</div>
					</div>
					<div className='text-sm text-gray-700 font-medium px-4 mt-9'>
						<p>Choose your Account</p>
					</div>
					<div className='flex flex-1 flex-col gap-2 px-4 py-2'>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									role='combobox'
									className='w-full justify-between'
								>
									Project name
									<ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width]'>
								<DropdownMenuItem>Project 1</DropdownMenuItem>
								<DropdownMenuItem>Project 2</DropdownMenuItem>
								<DropdownMenuItem>Project 3</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<nav className='flex flex-1 mt-4 flex-col gap-1'>
							{navigation.map((item, idx) => {
								const Icon = item.icon;
								return (
									<Collapsible key={item.name} className='group'>
										<CollapsibleTrigger
											onClick={() =>
												setCollapsibleState((prev) =>
													prev.map((state, i) => {
														if (i === idx) {
															return { ...state, isOpen: !state.isOpen };
														}
														return state;
													})
												)
											}
											className={cn(
												'group flex items-center gap-x-3 rounded-md px-2 py-2 text-md font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full',
												pathname === item.href && 'bg-gray-50 text-gray-900'
											)}
										>
											<Icon className='h-5 w-5 shrink-0' />
											{item.name}
											{item.subItems && !collapsibleState[idx].isOpen && (
												<ChevronDown
													className='ml-auto h-4 w-4 shrink-0'
													color='#98A2B3'
												/>
											)}
											{item.subItems && collapsibleState[idx].isOpen && (
												<ChevronUp className='ml-auto h-4 w-4 shrink-0' color='#98A2B3' />
											)}
										</CollapsibleTrigger>
										{item.subItems && (
											<CollapsibleContent className='pl-6'>
												{item.subItems.map((subItem) => (
													<Link
														key={subItem.name}
														href={subItem.href}
														className={cn(
															'flex items-center gap-x-3 rounded-md px-4 py-2 text-md font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900',
															pathname === subItem.href && 'bg-gray-50 text-gray-900'
														)}
													>
														{subItem.name}
													</Link>
												))}
											</CollapsibleContent>
										)}
									</Collapsible>
								);
							})}
						</nav>
						<div className='flex flex-col gap-1'>
							{bottomNavigation.map((item) => {
								const Icon = item.icon;
								return (
									<Link
										href={item.href}
										key={item.name}
										className={cn(
											'group flex items-center gap-x-3 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
											pathname === item.href && 'bg-gray-50 text-gray-900'
										)}
									>
										<Icon className='h-5 w-5 shrink-0' />
										{item.name}
									</Link>
								);
							})}
						</div>
						<Separator className='my-2' />
						<div className='flex items-center gap-2 rounded-md p-2'>
							<div className=' relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
								<img
									className='rounded-full flex h-10 w-10 items-center'
									src='/sidebar-avatar.png'
								/>
								<span className='absolute bottom-1 top-7 right-1 left-8 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
							</div>
							<div className='flex flex-1 flex-col'>
								<span className='text-sm font-medium'>Dev</span>
								<span className='text-xs text-gray-500'>dev@leadsync.ai</span>
							</div>
							<Avatar className='mr-2 w-4'>
								<AvatarImage src='log-out-icon.svg' />
								<AvatarFallback>IT</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
