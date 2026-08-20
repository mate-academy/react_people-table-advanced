import { Person } from '../types/Person';

export const ordenar = (var1: Person[], searchParams: URLSearchParams) => {
  const sortVar = [...var1];

  if (searchParams.get('sort')) {
    switch (searchParams.get('sort')) {
      case 'name':
        sortVar.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        sortVar.sort((a, b) => a.sex.localeCompare(b.sex));
        break;
      case 'born':
        sortVar.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        sortVar.sort((a, b) => a.died - b.died);
    }

    if (searchParams.get('order')) {
      sortVar.reverse();
    }
  }

  return sortVar;
};
