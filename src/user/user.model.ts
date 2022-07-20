import { prop } from "@typegoose/typegoose";
import {Base, TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

// role user is admin, manager
export enum Permission {
    admin = "admin",
    manager = "manager",
}
// extends Base( +id )
export interface UserModel extends Base {}
// extends TimeStamps( +createdAt, +updatedAt )
export class UserModel extends TimeStamps {
    @prop({ unique: true })
    login: string;

    @prop()
    passwordHash: string;

    @prop({ enum: Permission, default: Permission.manager })
    role: Permission;
}