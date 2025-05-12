import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { firstFormData, secondFormData } from "../../constants/FormData";
import FormContainer from "../../components/form-container/FormContainer";

const CreateForm = () => {
  const [isFirstForm, setIsFirstForm] = useState<boolean>(true);

  const handleFormNavigation = () => {
    setIsFirstForm(!isFirstForm);
  };
  return (
    <div>
      {/* first form */}
      {isFirstForm && (
        <FormContainer
          formFields={firstFormData}
          title="Sign Up"
          navigateIcon={
            <BsArrowRightCircleFill
              style={{ fontSize: "32px", marginTop: "20px", cursor: "pointer" }}
            />
          }
          handleFormNavigation={() => handleFormNavigation()}
        />
      )}

      {/* second form */}
      {!isFirstForm && (
        <FormContainer
          title="Sign Up"
          subTitle="Password setup"
          formFields={secondFormData}
          hasSubmitButton={true}
          navigateIcon={
            <BsArrowLeftCircleFill
              style={{ fontSize: "32px", marginTop: "20px", cursor: "pointer" }}
            />
          }
          handleFormNavigation={() => handleFormNavigation()}
        />
      )}
    </div>
  );
};

export default CreateForm;
