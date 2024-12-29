'use server';

import { PaginatedCampaignResponse } from '@/lib/types';

const serverUrl = process.env.SERVER_URL;

export const listCampaigns = async (): Promise<PaginatedCampaignResponse> => {
	const response = await fetch(`${serverUrl}/campaigns`);
	return response.json();
};

export const distinctCampaignNames = async (): Promise<string[]> => {
	const response = await fetch(`${serverUrl}/campaigns/names/distinct`);
	return response.json();
};
