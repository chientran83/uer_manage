import { useNavigate } from 'react-router-dom'
import { message } from "antd"

import { useAppDispatch } from '../../redux/store';
import { createUser } from '../../redux/slices/userSlice'
import UserForm from "../../components/common/UserForm";
import { UserType } from "../../services/types/UserType";

const Create: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const handleCreate = async (data: UserType) => {
        const resultAction = await dispatch(createUser(data))
        if (createUser.fulfilled.match(resultAction)) {
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

    return (
        <>
            {contextHolder}
            <h1>Create user:</h1>
            <UserForm submitHandle={handleCreate} />
        </>
    )
}
export default Create;