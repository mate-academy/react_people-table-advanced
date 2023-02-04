export function sortBy(array: any[], field:string): any[] {
  let typ: string;
  let i = 0;

  typ = array[i][field];

  while (typ === 'object' || typ === 'undefined') {
    i += 1;
    typ = array[i][field];
  }

  switch (typ) {
    case 'string':
      return array.sort((a, b) => a[field].localeCompare(b[field]));
    case 'number':
      return array.sort((a, b) => a[field] - b[field]);
    default:
      return array
        .sort((a, b) => String(a[field]).localeCompare(String(b[field])));
  }
}
