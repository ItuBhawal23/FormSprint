import { useState } from "react";
import type {
  ContainerFormField,
  IFormField
} from "../../interface/FormFieldType";
import FormField from "../form-field/FormField";
import styles from "./FormContainer.module.css";
import Button from "../button/Button";
import type { ErrorDetailsType } from "../../interface/ErrorType";

type FormContainerProps = {
  title: string;
  subTitle?: string;
  formFields: Array<IFormField | ContainerFormField>;
  navigateIcon?: any;
  handleFormNavigation?: any;
  hasSubmitButton?: boolean;
};

const FormContainer = ({
  title,
  subTitle,
  formFields,
  navigateIcon,
  handleFormNavigation,
  hasSubmitButton = false
}: FormContainerProps) => {
  const [_formFields, setFormField] = useState<
    Array<IFormField | ContainerFormField>
  >([...formFields]);
  const [error, setError] = useState<Record<string, ErrorDetailsType>>({});

  const getDynamicFields = (
    field: IFormField | ContainerFormField,
    index: number
  ) => {
    console.log('field', field)
    if (Object.prototype.hasOwnProperty.call(field, "fields")) {
      return (
        <div className={styles.dynamicFieldWrapper} key={index}>
          {(field as ContainerFormField).fields.map((subField, subIndex) => (
            <FormField
              key={subIndex}
              field={subField}
              submitValidation={error[subField.id]}
              updateFormFieldData={updateFormFieldData}
            />
          ))}
        </div>
      );
    }
    return (
      <FormField
        key={index}
        field={field as IFormField}
        submitValidation={error[(field as IFormField).id]}
        updateFormFieldData={updateFormFieldData}
      />
    );
  };

  // This function is Invoked when the form field is modified on blur
  const updateFormFieldData = (data: IFormField) => {
    const tempFormFields = [..._formFields];

    tempFormFields.forEach((field, index) => {
      if (Object.prototype.hasOwnProperty.call(field, "fields")) {
        let tempIndex: number;

        tempIndex = (field as ContainerFormField).fields.findIndex(
          (field: IFormField) => field.id === data.id
        );

        if (tempIndex !== -1) {
          (field as ContainerFormField).fields[tempIndex]["value"] = data.value;
          tempFormFields[index] = field;
          return;
        }
      } else if ((field as IFormField).id === data.id) {
        (tempFormFields[index] as IFormField)["value"] = data.value;
        return;
      }
    });
    setFormField(tempFormFields);
  };

  const handleFormSubmit = () => {
    const newErrors: Record<string, ErrorDetailsType> = {};

    _formFields.forEach((field) => {
      console.log("field", field);
      if ("fields" in field && Array.isArray(field.fields)) {
        (field as ContainerFormField).fields.forEach((f) => {
          const containerErrorInfo = f.validate(f.value, f.id);
          newErrors[f.id] = containerErrorInfo;
        });
      }

      if ("value" in field && "id" in field) {
        const errorInfo = field.validate(field.value, field.id);
        newErrors[field.id] = errorInfo;
      }
    });
    console.log("newErrors", newErrors);

    setError(newErrors);
  };

  return (
    <div className={styles.formContainer}>
      <h1>{title}</h1>
      <p>Please fill up the details</p>

      <h3>{subTitle}</h3>
      {_formFields.map((field, index) => {
        return getDynamicFields(field, index);
      })}

      {/* Submit form */}
      {hasSubmitButton && (
        <Button
          label="Submit"
          onClick={() => handleFormSubmit()}
          disabled={false}
        />
      )}

      {/* navigate form */}
      <div
        className={styles.navigateIconWrapper}
        onClick={() => handleFormNavigation()}
      >
        {navigateIcon}
      </div>
    </div>
  );
};

export default FormContainer;
