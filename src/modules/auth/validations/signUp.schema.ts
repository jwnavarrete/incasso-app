import * as yup from "yup";

const signUpSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .matches(/^\S.*\S$/, "Name cannot start or end with a space"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^\S.*\S$/, "Email cannot start or end with a space"),
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
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\S.*\S$/, "Phone number cannot start or end with a space"),
  country: yup
    .string()
    .required("Country is required")
    .matches(/^\S.*\S$/, "Country cannot start or end with a space"),
  typeIdentification: yup
    .string()
    .required("Type of identification is required")
    .matches(/^\S.*\S$/, "Type of identification cannot start or end with a space"),
  identification: yup
    .string()
    .required("Identification is required")
    .matches(/^\S.*\S$/, "Identification cannot start or end with a space"),
});

const companyInfoSchema = yup.object().shape({
  name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters long")
    .matches(/^[a-zA-Z0-9]+([a-zA-Z0-9- ]*[a-zA-Z0-9])?$/, "Company name can only contain letters, numbers, hyphens, and spaces, and cannot start or end with a space"),
  contactEmail: yup
    .string()
    .email("Invalid email format")
    .required("Contact email is required"),
  kvk: yup.string().required("Kvk code is required"), // No additional validation specified for kvk
  country: yup.string().required("Country is required"),
  address: yup.string().required("Address is required"),
  type: yup.string().required("Company type is required"),
  numberOfEmployees: yup.string().required("Number of employees is required"),
});

export { signUpSchema, companyInfoSchema };
