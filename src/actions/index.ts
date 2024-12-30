'use server';

import {
	PaginatedCampaignResponse,
	Campaign,
	CreateCampaign,
	ErrorResponse,
} from '@/lib/types';

const serverUrl = process.env.SERVER_URL;

export const listCampaigns = async (): Promise<
	PaginatedCampaignResponse | ErrorResponse
> => {
	try {
		const response = await fetch(`${serverUrl}/campaigns`);
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:11 -> listCampaigns -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};

export const getCampaignById = async (
	campaignId: string
): Promise<Campaign | ErrorResponse> => {
	try {
		const response = await fetch(`${serverUrl}/campaigns/${campaignId}`);
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:33 -> getCampaignById -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};

export const distinctCampaignNames = async (): Promise<string[] | ErrorResponse> => {
	try {
		const response = await fetch(`${serverUrl}/campaigns/names/distinct`);
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:33 -> distinctCampaignNames -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};

export const createCampaign = async (
	data: CreateCampaign
): Promise<Campaign | ErrorResponse> => {
	try {
		const response = await fetch(`${serverUrl}/campaigns`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:56 -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};

export const startCampaign = async (
	campaignId: string
): Promise<Campaign | ErrorResponse> => {
	try {
		const response = await fetch(`${serverUrl}/campaigns/${campaignId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status: 'ACTIVE' }),
		});
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:89 -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};

export const deleteCampaignById = async (
	campaignId: string
): Promise<Campaign | ErrorResponse> => {
	try {
		const response = await fetch(`${serverUrl}/campaigns/${campaignId}`, {
			method: 'DELETE',
		});
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:104 -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};

export const filterCampaigns = async (filterQueryObject: {
	exactName?: string;
	partialName?: string;
	status?: string;
}): Promise<Campaign[] | ErrorResponse> => {
	try {
		const queryParams = new URLSearchParams();

		if (filterQueryObject.exactName) {
			queryParams.append('exactName', filterQueryObject.exactName);
		}
		if (filterQueryObject.partialName) {
			queryParams.append('partialName', filterQueryObject.partialName);
		}
		if (filterQueryObject.status) {
			queryParams.append('status', filterQueryObject.status);
		}

		const queryString = queryParams.toString();
		const url = `${serverUrl}/campaigns/search/filters${
			queryString ? `?${queryString}` : ''
		}`;
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.error('📣 -> file: index.ts:121 -> filterCampaigns -> error:', error);
		if (error instanceof Error) {
			return { message: error.message, code: 500 };
		}
		return { message: 'Unknown error occurred', code: 500 };
	}
};
