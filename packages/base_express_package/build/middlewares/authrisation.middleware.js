"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = checkAuthorization;
// import { Permission } from 'accesscontrol';
function checkAuthorization(action, resource) {
    return (req, res, next) => {
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
    };
}
