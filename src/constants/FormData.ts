import type {
  ContainerFormField,
  IFormField
} from "../interface/FormFieldType";
import {
  validateAddress,
  validateCheckbox,
  validateConfirmPassword,
  validateEmail,
  validateNameField,
  validateNumberInput,
  validatePassword,
  validateTextField,
  validateUrl
} from "../utils/fieldValidtaion";

export const firstFormData: Array<IFormField | ContainerFormField> = [
  {
    fields: [
      {
        id: "firstName",
        label: "First Name",
        placeholder: "Enter your First Name",
        type: "text",
        value: "",
        validate: (value: any) => validateNameField(value)
      },
      {
        id: "lastName",
        label: "Last Name",
        placeholder: "Enter your Last Name",
        type: "text",
        value: "",
        validate: (value: any) => validateNameField(value)
      }
    ]
  },
  {
    id: "age",
    label: "Age",
    placeholder: "Enter your Age",
    type: "number",
    value: "",
    validate: (value: any, id?: string) => validateNumberInput(value, id)
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your Email address",
    type: "email",
    value: "",
    validate: (value) => validateEmail(value)
  },
  {
    id: "address",
    label: "Address",
    placeholder: "Enter your address",
    type: "text",
    value: "",
    validate: (value: any) => validateAddress(value)
  },
  {
    id: "company",
    label: "Company",
    placeholder: "Enter your company",
    type: "text",
    value: "",
    validate: (value: any) => validateTextField(value)
  },
  {
    id: "website",
    label: "Website",
    placeholder: "Enter your website",
    type: "url",
    value: "",
    validate: (value: any) => validateUrl(value)
  }
];

export const secondFormData: IFormField[] = [
  {
    id: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    value: "",
    validate: (value: any) => validatePassword(value)
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
    value: "",
    validate: (value: any) => validateConfirmPassword(value)
  },
  {
    id: "termsAgree",
    label: "I agree to the terms and conditions",
    type: "checkbox",
    value: false,
    isChecked: false,
    validate: (value: any) => validateCheckbox(value)
  }
];
