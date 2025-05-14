import { useState } from "react";

import type {
  ContainerFormField,
  IFormField
} from "../../interface/FormFieldType";
import FormField from "../form-field/FormField";
import styles from "./FormContainer.module.css";
import Button from "../button/Button";
import { firstFormData, secondFormData } from "../../constants/FormData";
import type { ErrorDetailsType } from "../../interface/ErrorType";

type FormContainerProps = {
  title: string;
  subTitle?: string;
  formValues: Array<IFormField | ContainerFormField>;
  updateFormValues: any;
  formIndex: number;
  updateFormIndex: any;
  navigateIcon?: any;
};

const FormContainer = ({
  title,
  subTitle,
  formValues,
  updateFormValues,
  formIndex,
  updateFormIndex,
  navigateIcon
}: FormContainerProps) => {
  const allForms = [firstFormData, secondFormData];
  const [, setErrors] = useState<Record<string, ErrorDetailsType>>({});

  const validateAllFields = (form: Array<IFormField | ContainerFormField>) => {
    const newErrors: Record<string, ErrorDetailsType> = {};

    form.forEach((field) => {
      if ("fields" in field && Array.isArray(field.fields)) {
        (field as ContainerFormField).fields.forEach((subField) => {
          const containerErrorInfo = subField.validate(
            subField.value,
            subField.id
          );
          newErrors[subField.id] = containerErrorInfo;
          updateErrorStatus(subField, containerErrorInfo);
        });
      }

      if ("value" in field && "id" in field) {
        const errorInfo = field.validate(field.value, field.id);
        newErrors[field.id] = errorInfo;
        updateErrorStatus(field, errorInfo);
      }
    });
    return newErrors;
  };

  const handleFieldBlur = (data: IFormField) => {
    const errorInfo = data.validate(data.value, data.id);
    updateErrorStatus(data, errorInfo);

    setErrors((prev) => ({ ...prev, [data.id]: errorInfo }));

    const currentForm = [...allForms[formIndex]];
    currentForm.forEach((field, index) => {
      if ("fields" in field && Array.isArray(field.fields)) {
        let tempIndex: number;

        tempIndex = (field as ContainerFormField).fields.findIndex(
          (field: IFormField) => field.id === data.id
        );

        if (tempIndex !== -1) {
          (field as ContainerFormField).fields[tempIndex]["value"] = data.value;
          currentForm[index] = field;
          return;
        }
      } else if ((field as IFormField).id === data.id) {
        (currentForm[index] as IFormField)["value"] = data.value;
        return;
      }
    });
  };

  const renderFormFields = () => {
    const formData = formValues ?? allForms[formIndex];

    return formData.map((field, index) => {
      if ("fields" in field) {
        return (
          <div className={styles.dynamicFieldWrapper} key={index}>
            {field.fields.map((subField, subIndex) => (
              <FormField
                key={subField.id || subIndex}
                field={subField}
                handleBlurEvent={handleFieldBlur}
              />
            ))}
          </div>
        );
      }

      return (
        <FormField
          key={field.id || index}
          field={field}
          handleBlurEvent={handleFieldBlur}
        />
      );
    });
  };

  const updateErrorStatus = (data: IFormField, errorInfo: any) => {
    console.log("errors", data, errorInfo);

    const currentForm = [...allForms[formIndex]];

    currentForm.forEach((field, index) => {
      if ("fields" in field) {
        let tempIndex: number;

        tempIndex = (field as ContainerFormField).fields.findIndex(
          (field: IFormField) => field.id === data.id
        );

        if (tempIndex !== -1) {
          (field as ContainerFormField).fields[tempIndex]["isValid"] =
            errorInfo.isValid;
          (field as ContainerFormField).fields[tempIndex]["errorMsg"] =
            errorInfo.errorMsg;
          currentForm[index] = field;
          return;
        }
      } else if ((field as IFormField).id === data.id) {
        (currentForm[index] as IFormField)["isValid"] = errorInfo.isValid;
        (currentForm[index] as IFormField)["errorMsg"] = errorInfo.errorMsg;
        return;
      }
    });
  };

  // update global form data
  const updateGlobalFormData = (
    formData: Array<IFormField | ContainerFormField>
  ) => {
    // Update global formValues by replacing only the current index
    updateFormValues((prevFormValues: any) => {
      const copyPrevData = [...prevFormValues];
      copyPrevData[formIndex] = formData; // update the current index form into the global state
      return copyPrevData;
    });
  };

  // handle submit when clicked navigation icon except the last form
  const handleSubmitOnFormNavigation = () => {
    const currentForm = [...allForms[formIndex]];

    if (formIndex === 0) {
      const errorDetails = validateAllFields(currentForm);

      setErrors(errorDetails);

      const hasError = Object.values(errorDetails).some((e) => !e.isValid);
      if (!hasError) {
        updateGlobalFormData(currentForm);
        updateFormIndex(1);
      }
    } else {
      updateFormIndex(0);
    }
  };

  // handle form submit and also validate each form before submission
  const onFormSubmit = () => {
    const lastFormIndex = allForms.length - 1;
    const lastForm = [...allForms[lastFormIndex]];

    if (formIndex === lastFormIndex) {
      const errorDetails = validateAllFields(lastForm);
      console.log("errorDetails:: lastForm", errorDetails);

      setErrors(errorDetails);

      const hasError = Object.values(errorDetails).some((e) => !e.isValid);
      if (!hasError) {
        updateGlobalFormData(lastForm);
      }
    }
    window.alert("Form submitted successfully")
  };

  return (
    <div className={styles.formContainer}>
      <h1>{title}</h1>
      <p>Please fill up the details</p>
      <h3>{subTitle}</h3>

      {/* render form fields */}
      {renderFormFields()}

      {/* Submit form */}
      {formIndex === allForms.length - 1 && (
        <Button
          label="Submit"
          onClick={() => onFormSubmit()}
          disabled={false}
        />
      )}

      {/* navigate form */}
      <div
        className={styles.navigateIconWrapper}
        onClick={() => handleSubmitOnFormNavigation()}
      >
        {navigateIcon}
      </div>
    </div>
  );
};

export default FormContainer;
