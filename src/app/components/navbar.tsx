'use client';

import { useSidebar } from '@/components/ui/sidebar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';
import { useEffect } from 'react';

export function Navbar() {
	const { setOpen, setOpenMobile, isMobile } = useSidebar();

	useEffect(() => {
		if (!isMobile) {
			setOpen(true);
		}
	}, [isMobile]);

	return (
		<div className='flex items-center justify-between border-b bg-white px-6 py-7'>
			<h1 className='text-xl text-gray-900 font-semibold flex items-center gap-2	'>
				{isMobile && (
					<Menu
						className='hover:cursor-pointer'
						onClick={() => {
							setOpenMobile(true);
							console.log('first');
						}}
					/>
				)}
				Campaign
			</h1>
			<div className='flex items-center gap-4'>
				<Avatar className='hover:cursor-pointer w-6 h-6'>
					<AvatarImage src='headphones-icon.svg' />
					<AvatarFallback>HS</AvatarFallback>
				</Avatar>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className='hover:cursor-pointer w-8 h-8'>
							<AvatarImage src='navbar-avatar.png' />
							<AvatarFallback>NR</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Sign out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
