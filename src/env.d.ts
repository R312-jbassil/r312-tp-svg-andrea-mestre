/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        user?: {
            id: string;
            email: string;
            username?: string;
            name?: string;
            avatar?: string;
            verified: boolean;
            created: string;
            updated: string;
        };
    }
}
