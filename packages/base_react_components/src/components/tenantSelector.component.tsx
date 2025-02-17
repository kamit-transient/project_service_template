import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useTenant } from '../providers/tenant.provider';
import { Building, Pointer } from 'lucide-react';

function TenantSelectorComponent() {
    let { activeTenant, activeTenantName, handleActiveTenantSelection, getAllTenantsQuery } = useTenant();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {activeTenant && activeTenantName ? (<><Building /> {activeTenantName}</>) : (<>
                            <Pointer /> Choose Tenant
                        </>)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel >Available tenants </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={activeTenant!} onValueChange={handleActiveTenantSelection}>

                        {
                            getAllTenantsQuery.data?.data?.map(t => {
                                return (

                                    <DropdownMenuRadioItem key={t.id} className='flex gap-x-2' value={t.id}><Building size={`20`} className='text-sm ' /> {t.name}</DropdownMenuRadioItem>
                                )
                            })
                        }

                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export { TenantSelectorComponent }
