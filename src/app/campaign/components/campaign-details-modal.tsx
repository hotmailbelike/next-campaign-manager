import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Campaign } from '@/lib/types';

interface CampaignDetailsModalProps {
	showCampaignDetailsModal: boolean;
	setShowCampaignDetailsModal: (show: boolean) => void;
	selectedCampaign: Campaign | null;
}

export function CampaignDetailsModal({
	showCampaignDetailsModal,
	setShowCampaignDetailsModal,
	selectedCampaign,
}: CampaignDetailsModalProps) {
	return (
		<Dialog
			open={showCampaignDetailsModal}
			onOpenChange={(isOpen) => setShowCampaignDetailsModal(isOpen)}
		>
			<DialogContent className='w-[300px] md:w-[512px]'>
				<DialogHeader>
					<DialogTitle>Campaign Details</DialogTitle>
				</DialogHeader>

				<div className='grid gap-2 py-4'>
					<div className=''>
						<Label className='text-right mb-2'>Name:</Label>
						<p className='text-sm font-normal'>{selectedCampaign?.['name']}</p>
					</div>
					<Separator></Separator>
					<div className=''>
						<Label className='text-right mb-2'>Description:</Label>
						<p className='text-sm font-normal'>{selectedCampaign?.['description']}</p>
					</div>
					<Separator></Separator>

					<div className=''>
						<Label className='text-right mb-2'>Leads:</Label>
						<p className='text-sm font-normal'>{selectedCampaign?.['totalLeads']}</p>
					</div>
					<Separator></Separator>

					<div className=''>
						<Label className='text-right mb-2'>Invites:</Label>
						<p className='text-sm font-normal'>{selectedCampaign?.['invites']}</p>
					</div>
					<Separator></Separator>

					<div className=''>
						<Label className='text-right mb-2'>Connections:</Label>
						<p className='text-sm font-normal'>{selectedCampaign?.['connections']}</p>
					</div>
					<Separator></Separator>
				</div>

				<DialogFooter>
					<Button
						onClick={() => setShowCampaignDetailsModal(false)}
						type='button'
						size={'sm'}
						className='bg-indigo-700 hover:bg-indigo-800'
					>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
