import { useState } from "react";
import type { IFormField } from "../../interface/FormFieldType";
import styles from "./FormField.module.css";

type FormFieldProps = {
  field: IFormField;
  handleBlurEvent: any;
};

const FormField = ({ field, handleBlurEvent }: FormFieldProps) => {
  const [fieldData, setFieldData] = useState<IFormField>({ ...field });

  const handleField = (event: any) => {
    const tempFormData = { ...fieldData };

    if (fieldData.type === "checkbox") {
      tempFormData["isChecked"] = event.target.checked;
      tempFormData["value"] = event.target.checked;
    } else {
      tempFormData["value"] = event.target.value;
    }
    setFieldData(tempFormData);
  };

  const handleBlur = () => {
    handleBlurEvent(fieldData);
  };

  return (
    <div
      className={styles.fields_container}
    >
      <div
        className={`${styles.field_wrapper} ${
          field.type === "checkbox" ? styles.checkbox_wrapper : ""
        }`}
      >
        <label htmlFor={fieldData.id}>{fieldData.label}</label>
        <input
          id={fieldData.id}
          type={fieldData.type}
          name={fieldData.id}
          placeholder={fieldData.placeholder}
          value={fieldData.value}
          checked={fieldData?.isChecked}
          className={field?.isValid === false ? styles.error_input : ""}
          onChange={(event) => handleField(event)}
          onBlur={() => handleBlur()}
        />
      </div>

      <div className={styles.error_wrapper}>
        <p>{field && field.errorMsg}</p>
      </div>
    </div>
  );
};
export default FormField;
