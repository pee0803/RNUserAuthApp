// Email validation using regex
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = password => {
  return password && password.length >= 6;
};

// Name validation
export const validateName = name => {
  return name && name.trim().length >= 2;
};

// General field validation
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

// Form validation helper
export const validateForm = fields => {
  const errors = {};

  Object.keys(fields).forEach(key => {
    const { value, type, required = true, minLength } = fields[key];

    if (required && !value?.toString().trim()) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      return;
    }

    if (value && type === 'email' && !validateEmail(value)) {
      errors[key] = 'Invalid email format';
      return;
    }

    if (value && type === 'password' && minLength && value.length < minLength) {
      errors[key] = `Password must be at least ${minLength} characters`;
      return;
    }

    if (value && minLength && value.length < minLength) {
      errors[key] = `Must be at least ${minLength} characters`;
      return;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
