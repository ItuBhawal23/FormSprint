import { useState } from "react";
import SignUpFirstForm from "./components/SignUpFirstForm/SignUpFirstForm";
import SignUpSecondForm from "./components/SignUpSecondForm/SignUpSecondForm";
import styles from "./SignUpContainer.module.css";

// create form
const SignUp = () => {
  const [isFirstForm, setIsFirstForm] = useState<boolean>(true);

  const navigateToSecondForm = () => {
    setIsFirstForm(false);
  };
  return (
    <div className={styles.signInFormContainer}>
      <h1>Sign Up</h1>
      <p>Please fill in the details to create an account</p>
      <form action="">
        {isFirstForm && (
          <SignUpFirstForm navigateToSecondForm={navigateToSecondForm} />
        )}
        {!isFirstForm && <SignUpSecondForm />}
      </form>
    </div>
  );
};

export default SignUp;
