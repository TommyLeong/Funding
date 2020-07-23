const validateEmail = (email) => {
  if (
    email.length > 0 &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  ) {
    return true;
  }
  return false;
};

const validateOnlySpacingCharacters = (value) => {
  if (value.length > 0 && value.match(/^[a-zA-Z]+([-_\s]{1}[a-zA-Z]+)*$/)) {
    return true;
  }
  return false;
};

const validateOnlyDecimalValues = (value) => {
  if (value.length > 0 && value.match(/^\d+(\.\d{2})?$/)) {
    return true;
  }
  return false;
};

const validateOnly16Digits = (value) => {
  if (value.length > 0 && value.match(/^([0-9]{4}[\s-]?){3}([0-9]{4})$/)) {
    return true;
  }
  return false;
};

export {
  validateEmail,
  validateOnlySpacingCharacters,
  validateOnlyDecimalValues,
  validateOnly16Digits,
};
