import * as yup from "yup";

const registerUserSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/^\S.*\S$/, "Password cannot start or end with a space"),
});

export { registerUserSchema };
