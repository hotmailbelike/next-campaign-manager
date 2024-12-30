import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CampaignDeleteModalProps {
	showCampaignDeleteModal: boolean;
	setShowCampaignDeleteModal: (show: boolean) => void;
	handleDeleteCampaign: () => void;
}

export default function CampaignDeleteModal({
	showCampaignDeleteModal,
	setShowCampaignDeleteModal,
	handleDeleteCampaign,
}: CampaignDeleteModalProps) {
	return (
		<AlertDialog
			open={showCampaignDeleteModal}
			onOpenChange={(isOpen) => setShowCampaignDeleteModal(isOpen)}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this campaign?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className='bg-red-500 hover:bg-red-600'
						onClick={() => handleDeleteCampaign()}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
