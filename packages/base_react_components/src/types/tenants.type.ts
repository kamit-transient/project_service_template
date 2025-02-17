import { z } from "zod";

export interface ITenant {
    "id": "string",
    "createdBy": "string",
    "createdAt": Date,
    "updatedAt": Date,
    "name": "string",
    "domain": "string",
    "isActive": boolean,
    "settings": Record<string, any>
}

