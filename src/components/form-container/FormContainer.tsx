import { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import type {
  ContainerFormField,
  IFormField
} from "../../interface/FormFieldType";
import FormField from "../form-field/FormField";
import styles from "./FormContainer.module.css";
import Button from "../button/Button";
import type { ErrorDetailsType } from "../../interface/ErrorType";
import { firstFormData, secondFormData } from "../../constants/FormData";

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
  const [error, setError] = useState<Record<string, ErrorDetailsType>>({});

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
    const tempFormFields = [...formFields];

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

  const validateAllFields = (
    formFieldsData: Array<IFormField | ContainerFormField>
  ) => {
    const newErrors: Record<string, ErrorDetailsType> = {};

    formFieldsData.forEach((field) => {
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

    // if (Object.values(newErrors).every((el) => el.isValid === true)) {
    //   console.log(Object.values(newErrors));
    // }
  };

  const handleSubmitOnFormNavigation = () => {
    // handle submit when clicked navigation icon
    updateFormIndex(formIndex === 0 ? 1 : 0);
  };

  //TODO: Move to top
  const allForms = [firstFormData, secondFormData];

  const renderFormFields = () => {
    const formdata = formValues ?? allForms[formIndex];
    return formdata.map((field, index) => {
      return getDynamicFields(field, index);
    });
  };

  const onFormSubmit = () => {
    console.log("submit");
  };

  useEffect(() => {
    console.log("formIndex", formIndex);
    validateAllFields(allForms[formIndex]);
  }, [formIndex]);

  return (
    <div className={styles.formContainer}>
      <h1>{title}</h1>
      <p>Please fill up the details</p>
      <h3>{subTitle}</h3>
      {renderFormFields()}
      {/* Submit form */}
      {formIndex === 1 && (
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
