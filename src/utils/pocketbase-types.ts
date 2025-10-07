/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
	Svg = "svgs",
	Users = "users",
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
	user?: string; // ID of the user who created the SVG
}

// Response type includes expand
export interface SvgResponse extends SvgRecord {
	expand?: Record<string, any>;
}

// User Record Type
export interface UserRecord extends BaseRecord {
	email: string;
	username?: string;
	name?: string;
	avatar?: string;
	verified: boolean;
}

// User Response type
export interface UserResponse extends UserRecord {
	expand?: Record<string, any>;
}
