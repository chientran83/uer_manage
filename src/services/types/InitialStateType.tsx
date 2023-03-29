import { UserType } from '../../services/types/UserType';
import {MessageType} from '../../services/types/MessageType'

export interface InitialStateType {
    isLoading: boolean,
    messages: MessageType,
    errors: any,
    user: UserType,
    users: UserType[]
}