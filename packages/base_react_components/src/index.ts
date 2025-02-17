

import "./styles.css"

export { Alert, AlertTitle, AlertDescription } from "./components/ui/alert"
export { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar"
export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "./components/ui/breadcrumb"
export { Button, buttonVariants } from "./components/ui/button"
export { Calendar } from "./components/ui/calendar"
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card"
export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "./components/ui/carousel"
export { Checkbox } from "./components/ui/checkbox"
export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
} from "./components/ui/command"
export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "./components/ui/dialog"
export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuRadioGroup,
} from "./components/ui/dropdown-menu"
export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from "./components/ui/form"
export { Input } from "./components/ui/input"
export { Label } from "./components/ui/label"
export {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
} from "./components/ui/navigation-menu"
export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "./components/ui/pagination"
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./components/ui/popover"
export { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area"
export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from "./components/ui/select"
export { Separator } from "./components/ui/separator"
export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from "./components/ui/sheet"
export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "./components/ui/sidebar"
export { Skeleton } from "./components/ui/skeleton"
// export { Toaster } from "./components/ui/sonner"
export { Switch } from "./components/ui/switch"
export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "./components/ui/table"
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"
export { Textarea } from "./components/ui/textarea"
export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
} from "./components/ui/toast"
export { Toaster } from "./components/ui/toaster"
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip"

// components
export { TenantSelectorComponent } from "./components/tenantSelector.component"
// EXPORT PAGES
export { AuthCallback } from "./pages/callback";
export { Login } from "./pages/login";
export { SignupPage } from "./pages/signup"
export { Profile } from "./pages/profile"

// export utils
export * as CONSTANTS from "./utils/app.constants";
export { getOidcClient } from "./utils/oidc-client";
export { appCache } from "./utils/cache"


// export lib

export { logger } from "./lib/client.logger";

// export hooks
export { useIsMobile } from "./hooks/use-mobile"
export { useToast, toast } from "./hooks/use-toast";

//providers
export { type AuthContextType, AuthProvider, useAuth } from "./providers/auth.provider"
export { TenantContextProvider, useTenant } from "./providers/tenant.provider"
export { ThemeProvider } from "./providers/theme.provider"


// types
export { type PaginatedRecords, type ApiConfig, type ApiErrorType } from "./types/common.type"
export { type IRequestStatus } from "./types/formStatus.type"
export { type ITenant } from "./types/tenants.type"



// schema
export { createTenantSchema } from "./schema/tenants.schema"

// backend api wrappers
export { BaseBackendApi } from './backend/Base.api'
export { AppApi } from './backend/api'
export { ApiError } from "./backend/api.error"
export { TenantApiCalls } from "./backend/tenant.api"



// routes

// export { ManageSession } from "./routes/manageSession"