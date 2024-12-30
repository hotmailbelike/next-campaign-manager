export enum CampaignStatus {
	ACTIVE,
	INACTIVE,
	DRAFT,
	COMPLETED,
}

export type Campaign = {
	id: string;
	name: string;
	description: string;
	totalLeads: number;
	invites: number;
	connections: number;
	status: CampaignStatus;
	createdAt: Date;
	updatedAt: Date;
};

export type PaginatedCampaignResponse = {
	data: Campaign[];
	cursor: string | null;
	hasMore: boolean;
	totalCount: number;
};

export type CreateCampaign = {
	name: string;
	description: string;
	totalLeads: number;
	invites: number;
	connections: number;
};

export type ErrorResponse = {
	message: string;
	code: number;
};
