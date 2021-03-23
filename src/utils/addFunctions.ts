/* eslint-disable func-names */
import {
  Person, FieldError,
  ValidateOnSubmit, ValidatOnChange,
  CheckPerson, CreateSlug, Sort,
} from './type';
import { NameCheck } from './constants';

export const callback = function (sortBy: string, orderoToSort: string): Sort {
  switch (sortBy) {
    case 'name': return (a: Person, b: Person) => {
      return (orderoToSort === 'desc')
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy]);
    };

    case 'sex': return (a: Person, b: Person) => {
      return (orderoToSort === 'desc')
        ? b[sortBy].localeCompare(a[sortBy])
        : a[sortBy].localeCompare(b[sortBy]);
    };

    case 'born': return (a: Person, b: Person) => {
      return (orderoToSort === 'desc')
        ? (Number(b[sortBy]) - Number(a[sortBy]))
        : (Number(a[sortBy]) - Number(b[sortBy]));
    };

    case 'died': return (a: Person, b: Person): number => {
      return (orderoToSort === 'desc')
        ? (Number(b[sortBy]) - Number(a[sortBy]))
        : (Number(a[sortBy]) - Number(b[sortBy]));
    };

    default: return (a: Person, b: Person) => {
      return (orderoToSort === 'desc')
        ? b.slug.localeCompare(a.slug)
        : a.slug.localeCompare(b.slug);
    };
  }
};

export const filterItems = function (arr: Person[], query: string, birthYear: string | number) {
  if (!birthYear) {
    return arr.filter(item => item.sex === query);
  }

  return arr.filter(item => item.sex === query
    && Number(birthYear) - item.born >= 15
    && item.died - Number(birthYear) >= 0);
};

export const checkYear = function (year: string): boolean {
  if (!year) {
    return false;
  }

  const currentYear = new Date().getFullYear().toString().split('');
  const yearReg = new RegExp(`^(1[4-9][0-9][0-9]|200[0-9]|[0-${currentYear[0]}][0-${currentYear[1]}][0-${currentYear[2]}][0-${currentYear[3]}])$`);

  return yearReg.test(year);
};

const checkAge = (born: number, died: number): boolean => {
  const ageDiff = !!(((died - born) >= 0 && (died - born) < 150));

  return ageDiff;
};

export const checkPersonInList: CheckPerson = (form, people) => {
  const name = form.name.toLowerCase();
  const birthYear = Number(form.born);

  return people.some(person => person.name.toLowerCase() === name && person.born === birthYear);
};

export const validateOnSubmit: ValidateOnSubmit = (values) => {
  const errors: FieldError = {};

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (!NameCheck.test(values.name)) {
    errors.name = 'Name is invalid';
  }

  if (!values.born || values.born === '0') {
    errors.born = 'Enter Birth Year';
  } else if ((!checkYear(String(values.born)))) {
    errors.born = 'Birth Year is not in range! Valid range is 1400-present';
  }

  if (!values.died || values.born === '0') {
    errors.died = 'Enter Death Year';
  } else if ((!checkYear(String(values.died)))) {
    errors.died = 'Birth Year is not in range! Valid range is 1400-present';
  }

  if (values.born && values.died) {
    const age = checkAge(Number(values.born), Number(values.died));

    if (!age) {
      errors.died = 'Enter correct Birth/Death Year!';
    }
  }

  return errors;
};

export const validateOnChange: ValidatOnChange = (event) => {
  let inputValue = '';
  const { name, value } = event.target;

  switch (name) {
    case 'name': {
      if (!value) {
        inputValue = 'Name is required';
      } else if (!NameCheck.test(value)) {
        inputValue = 'Name is invalid';
      }

      break;
    }

    case 'born': {
      if (!value) {
        inputValue = 'Enter Birth Year';
      } else {
        inputValue = (!checkYear(value))
          ? 'Birth Year is not in range! Valid range is 1400-present' : '';
      }

      break;
    }

    case 'died': {
      if (!value) {
        inputValue = 'Enter Death Year';
      } else {
        inputValue = (!checkYear(value)) ? 'Death Year is not in range! Valid range  is 1400-present' : '';
      }

      break;
    }

    default: {
      break;
    }
  }

  return inputValue;
};

export const createSlug: CreateSlug = (name, bornYear) => {
  const array = name.trim().split(' ');

  array.push(bornYear);
  const newName = array.map(v => v.toLowerCase()).join('-');

  return newName;
};
