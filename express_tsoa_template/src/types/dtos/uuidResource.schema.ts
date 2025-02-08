import { IsNotEmpty, IsString, IsObject, IsUrl, IsJSON, IsOptional, ValidateNested, IsUUID } from 'class-validator';

import { IValidation } from '../ivalidation.type';
import { Type } from 'class-transformer';

export class TenantIdSchema implements IValidation {

    @IsUUID("4", { message: "tenantId must uuid v4..." })
    tenantId: string;
}

export class TenantIdArticleIdSchema extends TenantIdSchema implements IValidation {


    @IsUUID("4", { message: "articleId must uuid v4..." })
    articleId: string;
}

export class CommentIdSchema implements IValidation {

    @IsUUID("4", { message: "commentId must uuid v4..." })
    commentId: string;
}
