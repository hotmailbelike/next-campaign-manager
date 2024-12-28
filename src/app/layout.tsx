import { Inter } from 'next/font/google';

import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';

import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='flex h-screen'>
					<Sidebar />
					<div className='flex flex-1 flex-col'>
						<Navbar />
						<main className='flex-1 overflow-y-auto p-6 pb-28'>{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
