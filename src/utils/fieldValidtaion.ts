//validate Input field
export const validateTextField = (value: string | number | boolean | any) => {
  let errorDetail = {
    isValid: false,
    errorMessage: ""
  };

  if (!value.trim()) {
    return { ...errorDetail, errorMessage: "Field cannot be empty" };
  } else {
    return {
      isValid: true,
      errorMessage: ""
    };
  }
};

//validate Name field
export const validateNameField = (value: string | number | boolean | any) => {
  let errorDetail = {
    isValid: false,
    errorMessage: ""
  };

  const inValidCharRegex = /[\\/?*:<>{}]/;

  if (!value.trim()) {
    return { ...errorDetail, errorMessage: "Field cannot be empty" };
  } else if (value.length < 2 || value.length > 20) {
    return {
      ...errorDetail,
      errorMessage: "Name must be between 2 and 30 characters long"
    };
  } else if (value.match(inValidCharRegex)) {
    return {
      ...errorDetail,
      errorMessage: "Invalid characters /?*:<>{} are not allowed"
    };
  } else {
    return {
      isValid: true,
      errorMessage: ""
    };
  }
};

//validate Address field
export const validateAddress = (value: string | number | boolean | any) => {
  let errorDetail = {
    isValid: false,
    errorMessage: ""
  };

  const inValidCharRegex = /[\\/?*:<>{}]/;

  if (!value.trim()) {
    return { ...errorDetail, errorMessage: "Field cannot be empty" };
  } else if (value.length < 10 || value.length > 30) {
    return {
      ...errorDetail,
      errorMessage: "Address must be between 10 and 30 characters long"
    };
  } else if (value.match(inValidCharRegex)) {
    return {
      ...errorDetail,
      errorMessage: "Invalid characters /?*:<>{} are not allowed"
    };
  } else {
    return {
      isValid: true,
      errorMessage: ""
    };
  }
};

// validate email
export const validateEmail = (value: string | number | boolean | any) => {
  let errorDetail = {
    isValid: false,
    errorMessage: ""
  };

  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value.trim()) {
    return { ...errorDetail, errorMessage: "Field cannot be empty" };
  } else if (!validEmailRegex.test(value)) {
    return {
      ...errorDetail,
      errorMessage: "Invalid Error"
    };
  } else {
    return {
      ...errorDetail,
      isValid: true
    };
  }
};

//validate number
export const validateNumberInput = (
  value: string | number | boolean | any,
  id: string = ""
) => {
  let errorInfo = {
    isValid: false,
    errorMessage: ""
  };

  if (!value.trim()) {
    return { ...errorInfo, errorMessage: "Field cannot be empty" };
  } else if (id === "age") {
    if (value > 200 || value < 20) {
      return {
        ...errorInfo,
        errorMessage: "Age to be in between 20 to 200"
      };
    }
    return {
      ...errorInfo,
      isValid: true
    };
  } else {
    return {
      ...errorInfo,
      isValid: true
    };
  }
};

//validate url
export const validateUrl = (value: string | number | boolean | any) => {
  let errorInfo = {
    isValid: false,
    errorMessage: ""
  };

  const validUrlRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/;

  if (!value.trim()) {
    return { ...errorInfo, errorMessage: "Field cannot be empty" };
  } else if (!validUrlRegex.test(value)) {
    return {
      ...errorInfo,
      errorMessage: "Invalid url"
    };
  } else {
    return {
      ...errorInfo,
      isValid: true
    };
  }
};

let password = "";

// validate Password
export const validatePassword = (value: string | number | any) => {
  const errorInfo = {
    isValid: false,
    errorMessage: ""
  };

  // const specialCharacters = /[\\/@*?:$#][0-9][A-Z]/; // A1@ -> only one char from the regex
  const specialCharacters = /^(?=.*[A-Z])(?=.*\d)(?=.*[\\/@#$&*:?]).+$/; // at least one char from the regex

  if (!value.trim()) {
    return { ...errorInfo, errorMessage: "Field cannot be empty" };
  } else if (!specialCharacters.test(value)) {
    return {
      ...errorInfo,
      errorMessage:
        "Password must contain a capital letter, a number, a special character from /@*?:$#" //Aa@123
    };
  } else if (value.length < 8 || value.length > 15) {
    return {
      ...errorInfo,
      errorMessage:
        "Password length must be more than 8 characters and less than 15 characters"
    };
  } else {
    password = value;
    return {
      ...errorInfo,
      isValid: true
    };
  }
};

//validate confirm password
export const validateConfirmPassword = (value: string | number | any) => {
  let errorInfo = {
    isValid: false,
    errorMessage: ""
  };

  if (!value.trim()) {
    return { ...errorInfo, errorMessage: "Field cannot be empty" };
  } else if (value !== password) {
    return {
      ...errorInfo,
      errorMessage: "Password do not match"
    };
  } else {
    return {
      ...errorInfo,
      isValid: true
    };
  }
};

//validate checkbox
export const validateCheckbox = (value: string | number | any) => {
  console.log("value", value);

  let errorInfo = {
    isValid: false,
    errorMessage: ""
  };

  if (value === false) {
    return {
      ...errorInfo,
      errorMessage: "Please accept the terms and condition"
    };
  } else {
    return {
      ...errorInfo,
      isValid: true
    };
  }
};
