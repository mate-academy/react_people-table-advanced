export const generateCallbackSort = (sortBy: string, sortOrder: string) => {
  const multiplier = sortOrder === 'asc' ? 1 : -1;
  let out: number;

  const fieldName = sortBy.toLowerCase();

  const callback = (h1: any, h2: any) => {
    let f1 = h1[fieldName];
    let f2 = h2[fieldName];

    if (fieldName === 'mother') {
      f1 = h1.motherName;
      f2 = h2.motherName;
    }

    if (fieldName === 'father') {
      f1 = h1.fatherName;
      f2 = h2.fatherName;
    }

    if (f1 === f2) {
      return 0;
    }

    if (f1 === null) {
      return 1;
    }

    if (f2 === null) {
      return -1;
    }

    switch (fieldName) {
      case 'born':
      case 'died':
        out = f1 - f2;
        break;

      case 'mother':
      case 'father':
      case 'sex':
      case 'name':
        out = f1.localeCompare(f2);
        break;

      default:
        throw new Error('undefined type of sort');
    }

    return out * multiplier;
  };

  return callback;
};
