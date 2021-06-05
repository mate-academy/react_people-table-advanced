const MIN_YEAR = 1400;
const MAX_AGE_DIFFERENCE = 150;

export function isFormFieldValid(name, value, state) {
  switch (name) {
    case 'name':
      return {
        isValid: value.search(/\d/g) === -1,
        errorMessage: 'Only letters and spaces are allowed in the name',
      };

    case 'born': {
      const isYearValid = validateYear(value);

      if (!isYearValid.isValid) {
        return isYearValid;
      }

      return validateAge(value, state.died.value);
    }

    case 'died': {
      const isYearValid = validateYear(value);

      if (!isYearValid.isValid) {
        return isYearValid;
      }

      return validateAge(state.born.value, value);
    }

    default:
      return {
        isValid: true,
        errorMessage: '',
      };
  }
}

function validateYear(year) {
  const currentYear = new Date().getFullYear();

  return {
    isValid: year >= MIN_YEAR && year <= currentYear,
    errorMessage: `Year should be >= 1400 and <= ${currentYear}`,
  };
}

function validateAge(born, died) {
  const difference = died - born;

  return {
    isValid: died === ''
      || (difference >= 0 && difference < MAX_AGE_DIFFERENCE),
    errorMessage: 'Difference between born and died should be >= 0 and < 150',
  };
}
