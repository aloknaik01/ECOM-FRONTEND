/**
 * Email validation
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Password validation (8-16 characters)
 */
export const validatePassword = (password) => {
  return password.length >= 8 && password.length <= 16;
};

/**
 * Login form validation
 */
export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be between 8 to 16 characters';
  }

  return errors;
};

/**
 * Register form validation
 */
export const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be between 8 to 16 characters';
  }

  return errors;
};

/**
 * Change password form validation
 */
export const validateChangePasswordForm = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (!validatePassword(values.newPassword)) {
    errors.newPassword = 'Password must be between 8 to 16 characters';
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = 'Confirm password is required';
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Passwords do not match';
  }

  return errors;
};

/**
 * Reset password form validation
 */
export const validateResetPasswordForm = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(values.password)) {
    errors.password = 'Password must be between 8 to 16 characters';
  }

  if (!values.conformPassword) {
    errors.conformPassword = 'Confirm password is required';
  } else if (values.password !== values.conformPassword) {
    errors.conformPassword = 'Passwords do not match';
  }

  return errors;
};

/**
 * Product form validation
 */
export const validateProductForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Product name is required';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  }

  if (!values.price) {
    errors.price = 'Price is required';
  } else if (isNaN(values.price) || Number(values.price) < 0) {
    errors.price = 'Invalid price';
  }

  if (!values.category) {
    errors.category = 'Category is required';
  }

  if (!values.stock) {
    errors.stock = 'Stock is required';
  } else if (isNaN(values.stock) || Number(values.stock) < 0) {
    errors.stock = 'Invalid stock quantity';
  }

  return errors;
};

/**
 * Checkout form validation
 */
export const validateCheckoutForm = (values) => {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!values.address) {
    errors.address = 'Address is required';
  }

  if (!values.city) {
    errors.city = 'City is required';
  }

  if (!values.state) {
    errors.state = 'State is required';
  }

  if (!values.country) {
    errors.country = 'Country is required';
  }

  if (!values.pincode) {
    errors.pincode = 'Pincode is required';
  } else if (!/^\d{6}$/.test(values.pincode)) {
    errors.pincode = 'Invalid pincode';
  }

  return errors;
};