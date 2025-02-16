import * as yup from "yup";

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const slugCompanySchema = yup.object().shape({
  slug: yup
    .string()
    .matches(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .required("Slug is required"),
});


const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/^\S.*\S$/, "Password cannot start or end with a space"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required')
    .matches(/^\S.*\S$/, "Confirm password cannot start or end with a space"),
});

export { emailSchema, slugCompanySchema, resetPasswordSchema };
