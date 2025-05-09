import styles from "./SignUpSecondForm.module.css";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const SignUpSecondForm = () => {
  return (
    <div>
      <h3 style={{textAlign: "left"}}>Set up Password</h3>
      {/* Password */}
      <div className={styles.fieldWrapper}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your Password"
        />
      </div>

          {/*Confirm Password */}
      <div className={styles.fieldWrapper}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your Password"
        />
      </div>

      {/* checkbox */}
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          name="acceptAll"
          checked={true}
          onChange={(e) => console.log(e)}
        />
        <label htmlFor="acceptAll">I agree to the terms and conditions</label>
      </div>

      {/* navigate back to first form */}
      <BsArrowLeftCircleFill className={styles.prevIcon} />
    </div>
  );
};

export default SignUpSecondForm;
