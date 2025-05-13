import { useEffect, useState } from "react";

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
  const [errors, setErrors] = useState<Record<string, ErrorDetailsType>>({});

  const getDynamicFields = (
    field: IFormField | ContainerFormField,
    index: number
  ) => {
    if (Object.prototype.hasOwnProperty.call(field, "fields")) {
      return (
        <div className={styles.dynamicFieldWrapper} key={index}>
          {(field as ContainerFormField).fields.map((subField, subIndex) => (
            <FormField
              key={subIndex}
              field={subField}
              errors={errors[subField.id]}
              handleBlurEvent={handleFieldBlur}
            />
          ))}
        </div>
      );
    }
    return (
      <FormField
        key={index}
        field={field as IFormField}
        errors={errors[(field as IFormField).id]}
        handleBlurEvent={handleFieldBlur}
      />
    );
  };

  const validateFieldOnBlur = (data: IFormField) => {
    const errorInfo = data.validate(data.value, data.id);

    setErrors((prev) => ({ ...prev, [data.id]: errorInfo }));
  };

  const validateAllFields = (form: Array<IFormField | ContainerFormField>) => {
    const newErrors: Record<string, ErrorDetailsType> = {};

    form.forEach((field) => {
      if ("fields" in field && Array.isArray(field.fields)) {
        (field as ContainerFormField).fields.forEach((field) => {
          const containerErrorInfo = field.validate(field.value, field.id);
          newErrors[field.id] = containerErrorInfo;
        });
      }

      if ("value" in field && "id" in field) {
        const errorInfo = field.validate(field.value, field.id);
        newErrors[field.id] = errorInfo;
      }
    });
    return newErrors;
  };

  const handleFieldBlur = (data: IFormField) => {
    validateFieldOnBlur(data);

    const currentForm = [...allForms[formIndex]];

    currentForm.forEach((field, index) => {
      if (Object.prototype.hasOwnProperty.call(field, "fields")) {
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
      return getDynamicFields(field, index);
    });
  };

  // update global form data
  const updateGlobalFormData = (
    formData: Array<IFormField | ContainerFormField>
  ) => {
    // Update global formValues by replacing only the current index
    updateFormValues((prevFormValues: any) => {
      const updatedFormValues = [...prevFormValues]; // copy the whole existing array
      updatedFormValues[formIndex] = formData; // update the current index form into the global state
      return updatedFormValues;
    });
  };

  // handle submit when clicked navigation icon except the last form
  const handleSubmitOnFormNavigation = () => {
    const currentForm = [...allForms[formIndex]];

    if (formIndex === 0) {
      const errorDetails = validateAllFields(currentForm);
      console.log("errorDetails@@@@@@@@@@@@@@@@@@", errorDetails);

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
  };

  useEffect(() => {
    console.log("formValuespppppppppppppppppppppppp", formValues);
  }, [formValues]);

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
