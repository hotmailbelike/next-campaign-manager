import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getMonthYear(date: Date): string {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const monthName = months[date.getMonth()];
	const year = date.getFullYear();

	return `${monthName} ${year}`;
}

export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function hasTruthyValue(obj: Record<string, any>): boolean {
	return Object.values(obj).some((value) => Boolean(value));
}
