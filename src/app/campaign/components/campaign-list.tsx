import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Campaign, CampaignStatus } from '@/lib/types';
import { capitalizeFirstLetter, getMonthYear } from '@/lib/utils';

interface CampaignListProps {
	campaigns: Campaign[];
	handleSelectCampaign: (id: string) => void;
	handleStartCampaign: (id: string) => void;
	handlePromptDelete: (id: string) => void;
	hasFilteredResults: boolean;
}

function ActionDropdown({
	handleSelectCampaign,
	handleStartCampaign,
	handlePromptDelete,
	campaignId,
	campaignStatus,
}: {
	handleSelectCampaign: (id: string) => void;
	handleStartCampaign: (id: string) => void;
	handlePromptDelete: (id: string) => void;
	campaignId: string;
	campaignStatus: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='hover:cursor-pointer'>
				<Avatar className='mr-2 w-10'>
					<AvatarImage src='vertical-dots-icon.svg' />
					<AvatarFallback>VS</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='w-[224px] border-none rounded-xl py-2 px-4'
			>
				<DropdownMenuItem className='p-0'>
					<div
						className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
						onClick={() => handleSelectCampaign(campaignId)}
					>
						<Avatar className='mr-6 w-5'>
							<AvatarImage src='adjustments-horizontal-icon.svg' />
							<AvatarFallback>AL</AvatarFallback>
						</Avatar>
						Go to Details
					</div>
				</DropdownMenuItem>
				{campaignStatus === CampaignStatus.DRAFT && (
					<DropdownMenuItem className='p-0'>
						<div
							className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
							onClick={() => handleStartCampaign(campaignId)}
						>
							<Avatar className='mr-6 w-5'>
								<AvatarImage src='play-icon.svg' />
								<AvatarFallback>PY</AvatarFallback>
							</Avatar>
							Start Campaign
						</div>
					</DropdownMenuItem>
				)}
				<Separator className='w-[120%] ml-[-16px]' />
				<DropdownMenuItem className='text-red-600 p-0'>
					<div
						className='flex items-center hover:cursor-pointer text-sm font-normal text-gray-700'
						onClick={() => handlePromptDelete(campaignId)}
					>
						<Avatar className='mr-6 w-5'>
							<AvatarImage src='trash-icon.svg' />
							<AvatarFallback>TH</AvatarFallback>
						</Avatar>
						Delete Campaign
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default function CampaignList({
	campaigns,
	handleSelectCampaign,
	handleStartCampaign,
	handlePromptDelete,
	hasFilteredResults,
}: CampaignListProps) {
	return (
		// Campaign Table
		<div className='text-gray-900'>
			{/* Table headers */}
			<div className='lg:grid hidden grid-cols-7 gap-4 p-4 rounded-xl bg-gray-50 border-gray-50 uppercase text-xs font-semibold text-gray-500'>
				<div className='col-span-2'>Name</div>
				<div>Status</div>
				<div>Total Lead</div>
				<div>Invite Sent</div>
				<div>Connection</div>
				<div></div>
			</div>

			{/* Table rows */}
			{!hasFilteredResults ? (
				<div className='text-center py-6'>
					<p className='text-gray-500'>No campaigns found according to your filters.</p>
				</div>
			) : (
				campaigns?.map((campaign) => (
					<div
						key={campaign.id}
						className='grid lg:grid-cols-7 grid-cols-1 gap-4 py-6 px-4 my-4 rounded-xl bg-white border border-gray-100 items-center'
					>
						<div className='lg:col-span-2 col-span-1'>
							<div className='flex items-center'>
								<Avatar className='mr-3'>
									<AvatarImage src='campaign-icon.svg' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className='flex flex-row justify-between lg:gap-x-0 gap-x-20'>
									<div className='flex flex-col'>
										<span className='leading-none text-sm font-semibold'>
											{campaign.name}
										</span>
										<span className='text-gray-500 leading-none text-xs font-normal mt-1'>
											Created in {getMonthYear(new Date(campaign.createdAt))}
										</span>
									</div>
									{/* Small screen dropdown */}
									<div className='lg:hidden visible'>
										<ActionDropdown
											handleSelectCampaign={handleSelectCampaign}
											handleStartCampaign={handleStartCampaign}
											handlePromptDelete={handlePromptDelete}
											campaignId={campaign.id}
											campaignStatus={campaign.status}
										/>
									</div>
								</div>
							</div>
						</div>
						<div>
							<span className='lg:hidden visible mr-4 text-gray-800 bg-gray-100 text-sm rounded p-1 '>
								STATUS:
							</span>
							<Badge
								className={`text-sm font-medium ${
									campaign.status === 'ACTIVE'
										? 'bg-green-500 hover:bg-green-600'
										: 'text-gray-900 bg-gray-100 hover:bg-gray-200'
								}`}
							>
								{capitalizeFirstLetter(campaign.status as unknown as string)}
							</Badge>
						</div>

						<div className='flex items-center'>
							<span className='lg:hidden visible mr-4 text-gray-800 bg-gray-100 text-sm rounded p-1 '>
								TOTAL LEAD:
							</span>

							<Avatar className='mr-2 w-4'>
								<AvatarImage src='user-icon.svg' />
								<AvatarFallback>UR</AvatarFallback>
							</Avatar>
							{campaign.totalLeads}
						</div>
						<div className='flex items-center'>
							<span className='lg:hidden visible mr-4 text-gray-800 bg-gray-100 text-sm rounded p-1 '>
								INVITE SENT:
							</span>

							<Avatar className='mr-2 w-4'>
								<AvatarImage src='mail-icon.svg' />
								<AvatarFallback>IT</AvatarFallback>
							</Avatar>
							{campaign.invites}
						</div>
						<div className='flex items-center'>
							<span className='lg:hidden visible mr-4 text-gray-800 bg-gray-100 text-sm rounded p-1 '>
								CONNECTION:
							</span>

							<Avatar className='mr-2 w-4'>
								<AvatarImage src='check-icon.svg' />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							{campaign.connections}
						</div>

						{/* large screen dropdown */}
						<div className='lg:flex hidden'>
							<ActionDropdown
								handleSelectCampaign={handleSelectCampaign}
								handleStartCampaign={handleStartCampaign}
								handlePromptDelete={handlePromptDelete}
								campaignId={campaign.id}
								campaignStatus={campaign.status}
							/>
						</div>
					</div>
				))
			)}
		</div>
	);
}
