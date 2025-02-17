import { z } from "zod";

export const createTenantSchema = z.object({
    name: z.string().min(2).max(50),
    domain: z.string().url(),
    idpOrgId: z.string().min(2).max(50),
    idpOrgName: z.string(),
});

