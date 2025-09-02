import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  filters: URLSearchParams,
) => {
  const queryRaw = filters.get('query') || '';
  const sex = filters.get('sex') || '';
  const centuries = filters
    .getAll('centuries')
    .map(Number)
    .filter(n => Number.isFinite(n));
  const sort =
    (filters.get('sort') as 'name' | 'sex' | 'born' | 'died' | null) || null;
  const isDesc = filters.get('order') === 'desc';

  const q = queryRaw.trim().toLowerCase();

  let filteredPeople = [...people];

  if (q) {
    filteredPeople = filteredPeople.filter(p => {
      const name = (p.name ?? '').toLowerCase();
      const mother = (p.motherName ?? '').toLowerCase();
      const father = (p.fatherName ?? '').toLowerCase();

      return name.includes(q) || mother.includes(q) || father.includes(q);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(p => {
      const born = p.born;

      if (!Number.isFinite(born)) {
        return false;
      }

      const century = Math.ceil((born as number) / 100);

      return centuries.includes(century);
    });
  }

  const cmpStr = (a?: string | null, b?: string | null) => {
    const A = a ?? null;
    const B = b ?? null;

    if (A === null && B === null) {
      return 0;
    }

    if (A === null) {
      return 1;
    }

    if (B === null) {
      return -1;
    }

    const r = A.localeCompare(B);

    return isDesc ? -r : r;
  };

  const cmpNum = (a?: number | null, b?: number | null) => {
    const A = Number.isFinite(a as number) ? (a as number) : null;
    const B = Number.isFinite(b as number) ? (b as number) : null;

    if (A === null && B === null) {
      return 0;
    }

    if (A === null) {
      return 1;
    }

    if (B === null) {
      return -1;
    }

    const r = A - B;

    return isDesc ? -r : r;
  };

  if (sort) {
    filteredPeople.sort((a, b) => {
      if (sort === 'name' || sort === 'sex') {
        return cmpStr(a[sort], b[sort]);
      }

      return cmpNum(a[sort], b[sort]);
    });
  }

  return filteredPeople;
};
