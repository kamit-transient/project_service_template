export interface IPaginatedData<T> {
    data: T[];
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}



export interface IStringToStringDictionary {
    [key: string]: string;
}


export type IReviewStatus = 'pending' | 'approved' | 'rejected';
export type IQualityStatus = 'spam' | 'inappropriate' | 'phishing' | "ok";

export type IRole = 'user' | 'editor' | 'admin'; // Define all roles you use
export type IAction = 'read' | 'create' | 'update' | 'delete'; // Define the possible actions
export type IResource = 'comment' | 'profile' | "article" | "tenant"; // Define all resources
export type ISettingType = "comment" | "scraping"