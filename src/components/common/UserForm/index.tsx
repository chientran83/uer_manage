import { Form, Input, Button, Select, DatePicker, Checkbox, Spin } from "antd";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';

import { UserSchema } from "../../../services/yupSchemas/UserSchema";
import { favoriteOption } from "../../../services/constants/favoriteOption";
import { UserFormType } from "../../../services/types/UserFormType";
import { InitialStateType } from "../../../services/types/InitialStateType";
import { UserType } from "../../../services/types/UserType";

const UserForm = ({ submitHandle, dataItem }: UserFormType) => {
    const { control, handleSubmit, reset, watch, formState: { errors,isValid } } = useForm({
        resolver: yupResolver(UserSchema),
        mode: "onBlur",
        reValidateMode: "onBlur",
        shouldFocusError: true
    });

    const resetAsyncForm = useCallback(async () => {
        if (dataItem) {
            reset({
                ...dataItem,
                dateOfBirth: dayjs(dataItem.dateOfBirth, 'YYYY/MM/DD'),
            })
        }
    }, [dataItem]);

    useEffect(() => {
        resetAsyncForm()
    }, [resetAsyncForm])

    const isLoading = useSelector((state: { users: InitialStateType }) => state.users.isLoading)

    const onSubmit: SubmitHandler<UserType> = async (data) => {
        // data.dateOfBirth = dayjs(data.dateOfBirth).format('YYYY/MM/DD');
        await submitHandle(data)
        // !dataItem?.id && reset()
    }

    return (
        <>
            <Spin tip="Loading..." spinning={isLoading}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={handleSubmit(onSubmit)}
                    layout="horizontal"
                >
                    <Form.Item label="First name"
                        validateStatus={errors.firstName ? "error" : ""}
                        help={errors?.firstName && `${errors?.firstName.message}`}
                    >
                        <Controller

                            name="firstName"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Enter first name" />}
                        />
                    </Form.Item>
                    <Form.Item label="Last name"
                        validateStatus={errors.lastName ? "error" : ""}
                        help={errors?.lastName && `${errors?.lastName.message}`}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Enter last name" />}
                        />
                    </Form.Item>
                    <Form.Item label="Gender"
                        validateStatus={errors.gender ? "error" : ""}
                        help={errors?.gender && `${errors?.gender.message}`}>
                        <Controller
                            name="gender"
                            control={control}

                            render={({ field }) =>
                                <Select
                                    {...field}
                                    style={{ width: 300 }}
                                    placeholder="Choose gender"
                                    options={[
                                        {
                                            value: "male",
                                            lable: "Male",
                                        },
                                        {
                                            value: "female",
                                            lable: "Female",
                                        }
                                    ]}
                                />}
                        />
                    </Form.Item>
                    <Form.Item label="Phone"
                        validateStatus={errors.phone ? "error" : ""}
                        help={errors?.phone && `${errors?.phone.message}`}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Enter phone number" />}
                        />
                    </Form.Item>
                    <Form.Item label="Address"
                        validateStatus={errors.address ? "error" : ""}
                        help={errors?.address && `${errors?.address.message}`}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Enter address" />}
                        />
                    </Form.Item>
                    <Form.Item label="DateOfBirth"
                        validateStatus={errors.dateOfBirth ? "error" : ""}
                        help={errors?.dateOfBirth && `${errors?.dateOfBirth.message}`}>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={({ field }) => <DatePicker {...field} placeholder="Enter date of birth" />}
                        />
                    </Form.Item>
                    <Form.Item label="School"
                        validateStatus={errors.school ? "error" : ""}
                        help={errors?.school && `${errors?.school.message}`}>
                        <Controller
                            name="school"
                            control={control}
                            render={({ field }) =>
                                <Select
                                    {...field}
                                    placeholder="Choose school"
                                    style={{ width: 300 }}
                                    options={[
                                        {
                                            value: 'My Dinh 2',
                                            label: 'My Dinh 2',
                                        },
                                        {
                                            value: 'Nam Thang Long',
                                            label: 'Nam Thang Long',
                                        },
                                        {
                                            value: 'Me Tri',
                                            label: 'Me Tri',
                                        },
                                        {
                                            value: 'Mai Dich',
                                            label: 'Mai Dich',
                                        },
                                        {
                                            value: 'Nguyen Chi Thanh',
                                            label: 'Nguyen Chi Thanh',
                                        },
                                    ]}
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Graduate"
                        validateStatus={errors.isGraduate ? "error" : ""}
                        help={errors?.isGraduate && `${errors?.isGraduate.message}`}>
                        <Controller
                            name="isGraduate"
                            control={control}
                            render={({ field }) => <Checkbox {...field} checked={watch("isGraduate")}></Checkbox>}
                        />
                    </Form.Item>
                    <Form.Item label="Email"
                        validateStatus={errors.email ? "error" : ""}
                        help={errors?.email && `${errors?.email.message}`}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder="Enter email" />}
                        />
                    </Form.Item>
                    <Form.Item label="Favourites"
                        validateStatus={errors.favourites ? "error" : ""}
                        help={errors?.favourites && `${errors?.favourites.message}`}>
                        <Controller
                            name="favourites"
                            control={control}
                            render={({ field }) =>
                                <Select
                                    {...field}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select your favorite job"
                                    options={favoriteOption}
                                />
                            }
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit" disabled={!isValid}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </>
    )
}
export default UserForm;