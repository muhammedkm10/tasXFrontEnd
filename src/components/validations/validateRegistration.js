export function validateRegistration({ username, email, password, password2 }) {
  const errors = {};

  if (!username.trim()) {
    errors.username = "Username is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!email.includes("@") || !email.includes(".")) {
    errors.email = "Invalid email format";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!password2.trim()) {
    errors.password2 = "Confirm password is required";
  } else if (password !== password2) {
    errors.password2 = "Passwords do not match";
  }

  return errors;
}
