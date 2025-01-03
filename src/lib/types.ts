export enum CampaignStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	DRAFT = 'DRAFT',
	COMPLETED = 'COMPLETED',
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
	totalCount: number;
	nextCursor: string | null;
	previousCursor: string | null;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
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
