import { Person } from '../types';

export function filter(people: Person[], params: URLSearchParams) {
  let filtered = [...people];

  if (params.has('sex')) {
    filtered = filtered.filter(person => person.sex === params.get('sex'));
  }

  if (params.has('centuries')) {
    const centuries = params.getAll('centuries');

    filtered = filtered.filter(person => {
      return (
        centuries.includes(`${Math.ceil(person.born / 100)}`) ||
        centuries.includes(`${Math.ceil(person.died / 100)}`)
      );
    });
  }

  if (params.has('query')) {
    const query = params.get('query')?.toLowerCase().trim() as string;

    filtered = filtered.filter(person => {
      return (
        person.name.trim().includes(query) ||
        person.motherName?.trim().includes(query) ||
        person.fatherName?.trim().includes(query)
      );
    });
  }

  if (params.has('sort')) {
    switch (params.get('sort')) {
      case 'name':
        filtered.sort((it, other) => it.name.localeCompare(other.name));
        break;
      case 'sex':
        filtered.sort((it, other) => it.sex.localeCompare(other.sex));
        break;
      case 'born':
        filtered.sort((it, other) => it.born - other.born);
        break;
      case 'died':
        filtered.sort((it, other) => it.died - other.died);
        break;
    }

    if (params.has('order', 'desc')) {
      filtered.reverse();
    }
  }

  return filtered;
}
