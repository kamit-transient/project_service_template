import { z } from "zod";

import { ITenant } from "../types/tenants.type";
import { QueryFunctionContext } from "@tanstack/react-query";
import { AppApi } from "./api";
import { createTenantSchema } from "../schema/tenants.schema";
import { PaginatedRecords } from "../types/common.type";

export class TenantApiCalls extends AppApi {

    constructor(args?: { jwt: string } | null) {
        super(args);
    }

    addTenant = async (tenant: z.infer<typeof createTenantSchema>): Promise<ITenant> => {
        console.log(tenant)
        let data: ITenant = await this.fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_API_URL}/tenants`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(tenant),
        });

        return data;
    }

    getAllTenant = async (): Promise<PaginatedRecords<ITenant>> => {
        console.log("`${process.env.NEXT_PUBLIC_API_URL}/tenants?page=1`", `${process.env.NEXT_PUBLIC_API_URL}/tenants?page=1`);

        let data: PaginatedRecords<ITenant> = await this.fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_API_URL}/tenants?page=1`, {
            cache: "force-cache",
            method: "GET"
        });

        return data;
    }

    getTenantById = async (tenantId: string): Promise<ITenant> => {

        let data: ITenant = await this.fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantId}`);

        return data;
    }

    deleteTenantById = async (tenantId: string): Promise<boolean> => {

        try {

            let data: boolean = await this.fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantId}`, {
                method: "DELETE"
            });

            return data;
        } catch (error) {
            throw error;
        }
    }

    getTenantStats = async ({ queryKey }: QueryFunctionContext<[string, string]>): Promise<{ review: any[], quality: any[], total: number }> => {
        let [, tenantId] = queryKey;
        try {

            let data: { review: any[], quality: any[], total: number } = await this.fetchWithErrorHandling(`${process.env.NEXT_PUBLIC_API_URL}/tenants/${tenantId}/stats`, {
                method: "GET",
                headers: this.headers
            });

            return data;
        } catch (error) {
            throw error;
        }
    }

}