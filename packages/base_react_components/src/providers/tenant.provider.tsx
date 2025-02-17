"use client"
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useAuth } from './auth.provider';
import { TenantApiCalls } from '../backend/tenant.api';
import { STORAGE_ACTIVE_TENANT_ID, STORAGE_ACTIVE_TENANT_NAME } from '../utils/app.constants';
import { logger } from '../lib/client.logger';
import { ITenant } from '../types/tenants.type';
import { PaginatedRecords } from '../types/common.type';
type ITenantContext = {
    activeTenant: string | null,
    activeTenantName: string | null,
    handleActiveTenantSelection: (tenantId: string) => void,
    getAllTenantsQuery: UseQueryResult<PaginatedRecords<ITenant>, Error>
}

let tenantContext = createContext<ITenantContext | undefined>(undefined);

export const useTenant = () => {
    const context = useContext(tenantContext);
    if (!context) {
        throw new Error('useTenantContext must be used within a TenantProvider');
    }
    return context;
};


export const TenantContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [activeTenant, setActiveTenant] = useState<string | null>(null)
    const [activeTenantName, setActiveTenantName] = useState<string | null>(null)
    let { user } = useAuth()
    let tenantApiCalls = new TenantApiCalls({ jwt: user?.id_token! });

    useEffect(() => {
        let activeItemId = localStorage.getItem(STORAGE_ACTIVE_TENANT_ID);
        let activeItemName = localStorage.getItem(STORAGE_ACTIVE_TENANT_NAME)
        setActiveTenant(activeItemId);
        setActiveTenantName(activeItemName);
    }, [activeTenant, activeTenantName]);


    let getAllTenantsQuery = useQuery({
        queryFn: tenantApiCalls.getAllTenant, queryKey: ["allTenants"]
    });

    const handleActiveTenantSelection = (tenantId: string) => {
        logger.info("you selected... tenant", tenantId);

        let tenant = getAllTenantsQuery.data?.data?.find((t: any) => t.id === tenantId)

        if (tenant) {

            setActiveTenant(tenant?.id);
            setActiveTenantName(tenant?.name);
            localStorage.setItem(STORAGE_ACTIVE_TENANT_ID, tenant?.id)
            localStorage.setItem(STORAGE_ACTIVE_TENANT_NAME, tenant?.name)
        }

    }

    return (
        <tenantContext.Provider value={{ activeTenant, activeTenantName, handleActiveTenantSelection, getAllTenantsQuery }}>
            {children}
        </tenantContext.Provider>
    )
}
