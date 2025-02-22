export function arrayToggle(array: string[], value: string) {
  if (array.includes(value)) {
    return array.filter(item => item !== value);
  } else {
    return [...array, value];
  }
}
