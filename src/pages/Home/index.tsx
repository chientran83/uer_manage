import { Table, Popconfirm, Spin, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DoubleRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { message } from "antd"

import Button from "../../components/common/Button";
import { UserType } from "../../services/types/UserType";
import { fetchUser, deleteUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';
import { InitialStateType } from '../../services/types/InitialStateType';
import { userSlice } from '../../redux/slices/userSlice';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const dataUsers = useSelector((state: { users: InitialStateType }) => state.users)

    const handleMessage = async (messages: any) => {
        if (messages.message) {
            messageApi.open({
                type: messages.type === "success" ? "success" : "error",
                content: messages.message,
            });
            dispatch(userSlice.actions.setMessage({ type: "", message: "" }));
        }
    }
    
    // useEffect(() => {
    // }, [])
    
    useEffect(() => {
        dispatch(fetchUser());
        // handleMessage(dataUsers.messages)
        if (dataUsers.messages.message) {
            messageApi.open({
                type: dataUsers.messages.type === "success" ? "success" : "error",
                content: dataUsers.messages.message,
            });
            dispatch(userSlice.actions.setMessage({ type: "", message: "" }));
        }
    },[]);

    const handleClickButtonDelete = (userId: string) => {
        dispatch(deleteUser(userId))
    }

    const tableColumns: ColumnsType<UserType> = [
        {
            title: 'id',
            width: 100,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'firstName',
            width: 100,
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'lastName',
            width: 100,
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            key: 'gender',
            width: 150,
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'address',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'dateOfBirth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            width: 150,
        },
        {
            title: 'school',
            dataIndex: 'school',
            key: 'school',
            width: 150,
        },
        {
            title: 'isGraduate',
            dataIndex: 'isGraduate',
            key: 'isGraduate',
            width: 150,
            render: (record) => {
                return record ? <Tag color="processing">Done</Tag> : <Tag color="warning">Not yes</Tag>
            }
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: 'favourites',
            dataIndex: 'favourites',
            key: 'favourites',
            width: 150,

            render: (record) => {
                return record.map((favoriteItem: string, index: number) => {
                    return <Tag key={index} color={
                        favoriteItem === "readBook" ? "magenta" :
                            favoriteItem === "food" ? "red" :
                                favoriteItem === "code" ? "volcano" :
                                    favoriteItem === "shoping" ? "orange" :
                                        favoriteItem === "watchTivi" ? "gold" : "lime"}>
                        {favoriteItem}
                    </Tag>
                })
            }
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            align: "center",
            render: (record) =>
                <>
                    <Button shape="circle" type="primary" to={`edit/${record.id}`}>
                        <DoubleRightOutlined />
                    </Button>

                    <Popconfirm
                        placement="bottomLeft"
                        title='Are you sure to delete this user?'
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => { handleClickButtonDelete(record.id) }}
                    >
                        <Button shape="circle" type="primary" danger>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </>
        },
    ];

    return (
        <>
            {contextHolder}
            <h1>User list :</h1>

            <Spin size='large' spinning={dataUsers.isLoading}>
                <Table
                    columns={tableColumns}
                    dataSource={dataUsers.users}
                    scroll={{ x: 1500 }}
                    rowKey="id"
                    sticky
                />
            </Spin>
        </>
    )
}
export default Home;