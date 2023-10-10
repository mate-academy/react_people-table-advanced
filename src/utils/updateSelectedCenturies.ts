export function updateSelectedCenturies(
  selectedCenturies: string[],
  century: string,
) {
  return selectedCenturies.includes(century)
    ? selectedCenturies.filter(cent => cent !== century)
    : [...selectedCenturies, century];
}
