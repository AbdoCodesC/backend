export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage: "Username must be 5 to 32 chars",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username be a string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "displayName cannot be empty",
    },
  },
  password: {
    notEmpty: true,
  },
};
