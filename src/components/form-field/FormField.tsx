import { useState } from "react";
import type { IFormField } from "../../interface/FormFieldType";
import styles from "./FormField.module.css";
import type { ErrorDetailsType } from "../../interface/ErrorType";

type FormFieldProps = {
  field: IFormField;
  submitValidation?: ErrorDetailsType;
  updateFormFieldData: any;
};

const FormField = ({
  field,
  submitValidation,
  updateFormFieldData
}: FormFieldProps) => {
  const [fieldData, setFieldData] = useState<IFormField>({ ...field });
  const [error, setError] = useState<ErrorDetailsType | null>(null);

  const handleField = (event: any) => {
    const tempFormData = { ...fieldData };

    if (fieldData.type === "checkbox") {
      tempFormData["isChecked"] = event.target.checked;
      tempFormData["value"] = event.target.checked;

      const errorDetails = field.validate(event.target.checked, fieldData.id);
      setError({ ...errorDetails });
    } else {
      tempFormData["value"] = event.target.value;
    }
    setFieldData(tempFormData);
  };

  const handleBlur = () => {
    const errorDetails = field.validate(fieldData.value, fieldData.id);
    console.log("errorDetails", errorDetails);

    setError({ ...errorDetails }); // this schedules a re-render
    console.log("error:: after", error); // shows old value still

    updateFormFieldData(fieldData);
  };
  // After the function completes, React re-renders your component with the new error value. and JSX is evaluated again and error msg is shown in UI

  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={fieldData.id}>{fieldData.label}</label>
      <input
        id={fieldData.id}
        type={fieldData.type}
        name={fieldData.id}
        placeholder={fieldData.placeholder}
        value={fieldData.value}
        checked={fieldData?.isChecked}
        className={
          error
            ? error.isValid === false
              ? styles.error_input
              : "" // field error exists and is valid, so ignore submitValidation
            : submitValidation?.isValid === false
            ? styles.error_input
            : ""
        }
        onChange={(event) => handleField(event)}
        onBlur={() => handleBlur()}
      />
      <p>
        {error
          ? error.isValid === false && error.errMsg
          : submitValidation?.isValid === false && submitValidation.errMsg}
      </p>
    </div>
  );
};
export default FormField;
