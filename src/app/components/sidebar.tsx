'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	BarChart2,
	Box,
	Building2,
	ChevronDown,
	Home,
	LayoutDashboard,
	LogOut,
	Mail,
	MessageSquare,
	Settings,
	Users2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
	{ name: 'Analytics', href: '/analytics', icon: Home },
	{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ name: 'Campaign', href: '/campaign', icon: BarChart2 },
	{ name: 'CRM', href: '/crm', icon: Building2 },
	{ name: 'Replies', href: '/replies', icon: MessageSquare },
	{ name: 'Projects', href: '/projects', icon: Box },
	{ name: 'Extract Leads', href: '/extract-leads', icon: Users2 },
];

const bottomNavigation = [
	{ name: 'Settings', href: '/settings', icon: Settings },
	{ name: 'Support', href: '/support', icon: Mail },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className='flex h-full w-60 flex-col border-r bg-white'>
			<div className='flex h-16 items-center gap-2 border-b px-4'>
				<div className='flex items-center gap-2'>
					<div className='flex h-8 w-8 items-center justify-center rounded bg-primary'>
						<Box className='h-5 w-5 text-primary-foreground' />
					</div>
					<span className='text-xl font-semibold'>Leadsync</span>
				</div>
			</div>

			<div className='flex flex-1 flex-col gap-2 p-2'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' role='combobox' className='w-full justify-between'>
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

				<nav className='flex flex-1 flex-col gap-1'>
					{navigation.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.name}
								href={item.href}
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
				</nav>

				<div className='flex flex-col gap-1'>
					{bottomNavigation.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.name}
								href={item.href}
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

				<div className='flex items-center gap-2 rounded-md p-2'>
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
						<span className='text-sm font-medium'>D</span>
					</div>
					<div className='flex flex-1 flex-col'>
						<span className='text-sm font-medium'>Dev</span>
						<span className='text-xs text-gray-500'>dev@leadsync.ai</span>
					</div>
					<Button variant='ghost' size='icon' className='h-8 w-8'>
						<LogOut className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
}
