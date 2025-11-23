// validation.js
export const validateTaskForm = (form) => {
  const errors = {};

  if (!form.title || form.title.trim() === "") {
    errors.title = "Task title is required.";
  } else if (form.title.length < 3) {
    errors.title = "Task title must be at least 3 characters.";
  }

  if (!form.description || form.description.trim() === "") {
    errors.description = "Task description is required.";
  } else if (form.description.length < 5) {
    errors.description = "Task description must be at least 5 characters.";
  }


  return errors;
};
