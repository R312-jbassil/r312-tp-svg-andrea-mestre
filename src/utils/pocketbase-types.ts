/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
	Svg = "svgs",
}

// Base record type
export interface BaseRecord {
	id: string;
	created: string;
	updated: string;
}

// SVG Record Type
export interface SvgRecord extends BaseRecord {
	name: string;
	code: string;
	date?: string;
	prompt?: string;
	history?: string; // JSON string containing conversation history
}

// Response type includes expand
export interface SvgResponse extends SvgRecord {
	expand?: Record<string, any>;
}
