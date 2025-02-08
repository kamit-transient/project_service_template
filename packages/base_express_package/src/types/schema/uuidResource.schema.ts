import { IsUUID } from 'class-validator';

import { IValidation } from '../ivalidation.type';

export class UuidIdSchema implements IValidation {

    @IsUUID("4", { message: "id must be uuid v4..." })
    id: string;
}
