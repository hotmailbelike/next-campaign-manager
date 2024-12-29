import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Navbar() {
	return (
		<div className='flex items-center justify-between border-b bg-white px-6 py-7'>
			<h1 className='text-xl text-gray-900 font-semibold'>Campaign</h1>
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
