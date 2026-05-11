export function toggleValueInArray(array: string[], element: string) {
  const indexOfElement = array.indexOf(element);

  if (indexOfElement === -1) {
    array.push(element);
  } else {
    array.splice(indexOfElement, 1);
  }

  return array;
}
