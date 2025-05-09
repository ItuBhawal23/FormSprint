import { BsArrowRightCircleFill } from "react-icons/bs";
import styles from "./SignUpFirstForm.module.css";

const SignUpFirstForm = ({navigateToSecondForm}) => {
  return (
    <div>
        {/* name field */}
        <div className={styles.nameField}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        {/* email */}
        <div className={styles.fieldWrapper}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        {/* Phone number */}
        <div className={styles.fieldWrapper}>
          <label htmlFor="contact">Phone Number</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your Phone Number"
          />
        </div>
        {/* DOB */}
        <div className={styles.fieldWrapper}>
          <label htmlFor="contact">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Enter your Date of Birth"
          />
        </div>
        {/* Gender */}
        <div className={styles.fieldWrapper}>
          <label>Gender</label>
          <div>
            <label htmlFor="female">Female</label>
            <input type="radio" id="female" name="female" />
            <label htmlFor="male">Male</label>
            <input type="radio" id="male" name="male" />
          </div>
        </div>
        {/* DOB */}
        <div className={styles.fieldWrapper}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Enter your Company"
          />
        </div>
        {/* Website */}
        <div className={styles.fieldWrapper}>
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="Enter your website url"
          />
        </div>
        {/* Redirect to next form page */}
        <BsArrowRightCircleFill className={styles.nextIcon} onClick={navigateToSecondForm}/>
    </div>
  );
};

export default SignUpFirstForm;
