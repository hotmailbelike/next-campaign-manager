import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
	return (
		<div className='flex h-16 items-center justify-between border-b bg-white px-4'>
			<h1 className='text-xl font-semibold'>Campaign</h1>
			<div className='flex items-center gap-2'>
				<Button variant='ghost' size='icon'>
					<Bell className='h-5 w-5' />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 rounded-full p-0'>
							<span className='sr-only'>Open user menu</span>
							<div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary'>
								<span className='text-sm font-medium text-primary-foreground'>D</span>
							</div>
						</Button>
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
