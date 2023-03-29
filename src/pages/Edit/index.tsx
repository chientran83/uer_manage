import { useParams } from "react-router-dom";
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { message } from "antd"

import { useAppDispatch } from '../../redux/store';
import { updateUser, getUserById } from '../../redux/slices/userSlice'
import UserForm from "../../components/common/UserForm";
import { UserType } from "../../services/types/UserType";
import { InitialStateType } from "../../services/types/InitialStateType";

const Edit: React.FC = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleUpdate = async (data: UserType) => {
        const resultAction = await dispatch(updateUser({ userId: params.userId, data }))
        if (updateUser.fulfilled.match(resultAction)) {
            navigate("/")
        } else {
            if (resultAction.payload) {
                messageApi.open({
                    type: "error",
                    content: "Update user faise !",
                });
            }
        }
    }

    const user = useSelector((state: { users: InitialStateType }) => state.users.user)

    useEffect(() => {
        dispatch(getUserById(params.userId))
    }, [])

    return (
        <>
            {contextHolder}
            <h1>Edit user by Id is {user.id}:</h1>
            <UserForm submitHandle={handleUpdate} dataItem={user} />
        </>
    )
}
export default Edit;