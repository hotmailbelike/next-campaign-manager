import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateCampaign } from '@/lib/types';
import { FormEvent } from 'react';

interface CampaignCreateModalProps {
	showCreateCampaignModal: boolean;
	setShowCreateCampaignModal: (show: boolean) => void;
	createCampaignObj: CreateCampaign;
	handleCreateCampaignObj: (key: string, value: string | number) => void;
	handleCreateCampaign: (e: FormEvent) => void;
}

export default function CampaignCreateModal({
	showCreateCampaignModal,
	setShowCreateCampaignModal,
	createCampaignObj,
	handleCreateCampaignObj,
	handleCreateCampaign,
}: CampaignCreateModalProps) {
	return (
		<Dialog
			open={showCreateCampaignModal}
			onOpenChange={(isOpen) => setShowCreateCampaignModal(isOpen)}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create a new Campaign</DialogTitle>
					<DialogDescription>
						New Campaigns will be in draft by default.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleCreateCampaign}>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='text-right'>Name</Label>
							<Input
								required
								value={createCampaignObj['name']}
								onChange={({ target: { value } }) =>
									handleCreateCampaignObj('name', value)
								}
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='text-right'>Description</Label>
							<Textarea
								required
								value={createCampaignObj['description']}
								onChange={({ target: { value } }) =>
									handleCreateCampaignObj('description', value)
								}
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='text-right'>Leads</Label>
							<Input
								required
								type='number'
								value={createCampaignObj['totalLeads']}
								onChange={({ target: { value } }) =>
									handleCreateCampaignObj('totalLeads', value)
								}
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='text-right'>Invites</Label>
							<Input
								required
								type='number'
								value={createCampaignObj['invites']}
								onChange={({ target: { value } }) =>
									handleCreateCampaignObj('invites', value)
								}
								className='col-span-3'
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='text-right'>Connections</Label>
							<Input
								required
								type='number'
								value={createCampaignObj['connections']}
								onChange={({ target: { value } }) =>
									handleCreateCampaignObj('connections', value)
								}
								className='col-span-3'
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={() => setShowCreateCampaignModal(false)}
							type='button'
							size={'sm'}
							className='bg-red-500 hover:bg-red-600'
						>
							Cancel
						</Button>
						<Button
							type='submit'
							size={'sm'}
							className='bg-indigo-700 hover:bg-indigo-800'
						>
							Create Campaign
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
