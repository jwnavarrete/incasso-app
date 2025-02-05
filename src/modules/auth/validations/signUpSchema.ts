import * as yup from "yup";

const signUpSchema = yup.object().shape({});

const _signUpSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  phone: yup.string().required("Phone number is required"),
  // .matches(/^\+5997\d{7}$/, "Phone number must be a valid Bonaire number"),
  country: yup.string().required("Country is required"),
  typeIdentification: yup
    .string()
    .required("Type of identification is required"),
  identification: yup.string().required("Identification is required"),
});

const companyInfoSchema = yup.object().shape({});

const _companyInfoSchema = yup.object().shape({
  name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters long"),
  contactEmail: yup
    .string()
    .email("Invalid email format")
    .required("Contact email is required"),
  kvk: yup.string().required("Kvk code is required"), // No additional validation specified for kvk
  country: yup.string().required("Country is required"),
  address: yup.string().required("Address is required"),
  type: yup.string().required("Company type is required"),
  numberOfEmployes: yup.string().required("Number of employees is required"),
});

// const signUpSchema = yup.object().shape({});

export { signUpSchema, companyInfoSchema };
