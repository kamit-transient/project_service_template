import { NextFunction, Response } from 'express'
import { RequestWithUser } from '../types/Auth.type';
import { IAction, IResource } from '../types/common.types';
// import { Permission } from 'accesscontrol';



export function checkAuthorization(action: IAction, resource: IResource) {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        // const userRole: Role[] = req.user?.roles!;
        // const userId = req.params.userId;

        // // Determine if the user is trying to perform the action on their own resource
        // const isOwnResource = userId === req.user?.id;

        // // Check the permission dynamically
        // let permission: any;
        // if (isOwnResource) {
        //     permission = ac.can(userRole)[`${action}Own`](resource);
        // } else {
        //     permission = ac.can(userRole)[`${action}Any`](resource);
        // }

        // // If the permission is granted, proceed to the next middleware
        // if (permission.granted) {
        //     req.permission = permission; // Pass the permission object to the next middleware
        //     return next();
        // }

        return res.status(403).json({ message: 'Access Denied' });
    }
}
