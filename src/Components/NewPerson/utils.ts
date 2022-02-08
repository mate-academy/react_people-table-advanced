const MAX_AGE = 150;

export const MIN_BORN_YEAR = 1400;

export const defaultState: FormFields = {
  name: '',
  sex: null,
  born: null,
  died: null,
  motherName: '',
  fatherName: '',
};

export const defaultErrors: FormErrors = {
  name: {
    isEmpty: false,
    hasForbiddenSymbols: false,
    userAlreadyExists: false,
  },
  born: false,
  died: false,
};

export const checkIfEmpty = (value: string) => {
  const result = value.replace(/ /g, '');

  return result === '';
};

export const checkForForbiddenSymbols = (value: string) => {
  const result = value.match(/^[a-zA-Z\s]*$/);

  return !result;
};

export const generateSlug = (name: string, born: number) => {
  const result = name.toLowerCase().split(' ');

  result.push(born.toString());

  return result.join('-');
};

export const getParents = (people: ProcessedPerson[], born: number | null, sex: 'f' | 'm') => {
  return people.filter(
    person => person.sex === sex,
  ).filter(
    mother => (born ? mother.born < born && mother.died > born : true),
  );
};

export const isFormIncomplete = (fields: FormFields, errors: FormErrors) => {
  const hasIncompleteFields = [
    fields.name !== '',
    fields.sex,
    fields.born,
    fields.died,
  ].some(field => !field);
  const hasNameErrors = Object.values(errors.name).some(error => error);
  const hasYearErrors = errors.died || errors.born;

  return hasIncompleteFields || hasNameErrors || hasYearErrors;
};

export const getCurrentYear = () => {
  const currentDate = new Date();

  return currentDate.getFullYear();
};

export const getMaxDiedYear = (bornYear: number) => {
  const currentYear = getCurrentYear();
  const maxDiedYear = bornYear + MAX_AGE;

  return maxDiedYear > currentYear ? currentYear : maxDiedYear;
};

export const validateBornYear = (bornYear: number) => {
  const currentYear = getCurrentYear();

  return bornYear < MIN_BORN_YEAR || bornYear > currentYear;
};

export const validateDiedYear = (bornYear: number, diedYear: number) => {
  const maxDiedYear = getMaxDiedYear(bornYear);

  return diedYear < bornYear || diedYear > maxDiedYear;
};

export const generateNewPersonObject = (fields: FormFields, people: ProcessedPerson[]) => {
  const {
    name, sex, born, died, motherName, fatherName,
  } = fields;

  const mother = motherName === ''
    ? null
    : people.find(person => person.name === motherName) || null;

  const father = fatherName === ''
    ? null
    : people.find(person => person.name === fatherName) || null;

  const newPerson: ProcessedPerson = {
    name,
    sex: sex || 'f',
    born: born || 1400,
    died: died || 1400,
    motherName: motherName === '' ? null : motherName,
    fatherName: fatherName === '' ? null : fatherName,
    slug: generateSlug(name, born || 1400),
    mother,
    father,
  };

  return newPerson;
};
