import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import FormContainer from "../../components/form-container/FormContainer";
import type {
  ContainerFormField,
  IFormField
} from "../../interface/FormFieldType";

const CreateForm = () => {
  // formValues = [ [form1 -> 0], [form2 -> 1] ]

  const [formValues, setFormValues] = useState<
    Array<Array<IFormField | ContainerFormField>>
  >([]);
  const [formIndex, setFormIndex] = useState<number>(0);

  return (
    <div>
      {/* first form */}
      {formIndex === 0 && (
        <FormContainer
          title="Sign Up"
          formValues={formValues[formIndex]}
          updateFormValues={setFormValues}
          formIndex={formIndex}
          updateFormIndex={setFormIndex}
          navigateIcon={
            <BsArrowRightCircleFill
              style={{ fontSize: "32px", marginTop: "20px", cursor: "pointer" }}
            />
          }
        />
      )}

      {/* second form */}
      {formIndex === 1 && (
        <FormContainer
          title="Sign Up"
          subTitle="Password setup"
          formValues={formValues[formIndex]}
          updateFormValues={setFormValues}
          formIndex={formIndex}
          updateFormIndex={setFormIndex}
          navigateIcon={
            <BsArrowLeftCircleFill
              style={{ fontSize: "32px", marginTop: "20px", cursor: "pointer" }}
            />
          }
        />
      )}
    </div>
  );
};

export default CreateForm;
