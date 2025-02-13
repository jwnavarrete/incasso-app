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

export { emailSchema, slugCompanySchema };
