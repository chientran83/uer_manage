import * as yup from "yup"

export const UserSchema = yup.object({
    firstName: yup.string().min(2).max(16).required(),
    lastName: yup.string().min(2).max(16).required(),
    gender: yup.string().oneOf(["male", "female"]).required(),
    phone: yup.string().min(6).max(16).required(),
    address: yup.string().min(2).max(40).required(),
    dateOfBirth: yup.date().max(Date()).required(),
    school: yup.string().min(2).max(16).required(),
    isGraduate: yup.boolean(),
    email: yup.string().email().required(),
    favourites: yup.array(),
});