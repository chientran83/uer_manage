import { UserType } from "../../services/types/UserType";

export interface UserFormType { 
    submitHandle : Function, 
    dataItem?: UserType
}