export function isFormFieldValid(name, value) {
  switch (name) {
    case 'name':
      return name.search(/\W|\d/g) !== -1;

    case 'born':
    case 'died':
      return value >= 1400 && value <= (new Date().getFullYear());

    default:
      return false;
  }
}
