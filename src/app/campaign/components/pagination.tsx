import { Button } from '@/components/ui/button';
import { twMerge } from 'tailwind-merge';

interface PaginationProps {
	totalCount: number;
	currentPageNumber: number;
	totalPages: number;
	handlePageChange: (direction: 'next' | 'previous') => void;
}

export default function Pagination({
	totalCount,
	currentPageNumber,
	totalPages,
	handlePageChange,
}: PaginationProps) {
	const canGoToPrevPage = () => {
		return currentPageNumber !== 1;
	};

	const canGoToNextPage = () => {
		return currentPageNumber !== totalPages;
	};

	const numberOfRecordsShownIndicator = () => {
		const startRecord = (currentPageNumber - 1) * 10 + 1;
		const endRecord = Math.min(currentPageNumber * 10, totalCount);
		return `${startRecord}-${endRecord}`;
	};

	return (
		<div className='flex items-center justify-between px-4 py-2'>
			<div className='text-sm font-medium text-gray-500'>
				Showing <span className='text-black'>{numberOfRecordsShownIndicator()}</span> of{' '}
				<span className='text-black'>{totalCount}</span>
			</div>
			<div className='flex '>
				<Button
					variant='outline'
					className={twMerge(
						'rounded-tr-none rounded-br-none border-r-0 text-sm font-medium px-3 py-2',
						canGoToPrevPage()
							? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800'
							: 'text-gray-500  hover:text-gray-600 hover:cursor-not-allowed'
					)}
					size='sm'
					onClick={() => handlePageChange('previous')}
				>
					Previous
				</Button>
				<Button
					variant='outline'
					className={twMerge(
						'rounded-tl-none rounded-bl-none text-sm font-medium px-6 py-2',
						canGoToNextPage()
							? 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800'
							: 'text-gray-500  hover:text-gray-600 hover:cursor-not-allowed'
					)}
					size='sm'
					onClick={() => handlePageChange('next')}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
