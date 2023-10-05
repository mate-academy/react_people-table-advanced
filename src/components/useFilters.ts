import { Person } from '../types';

export enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export function useFilters(
  AllMaleFemale: 'm' | 'f' | null,
  query: string,
  centuries: string[],
  sort: string,
  order: string,
  people: Person[] | undefined,
) {
  const sortedPeople = people?.filter(({
    sex,
    name,
    born,
    motherName,
    fatherName,
  }) => {
    // wejsciowo pokazujemy wszystko wiec filtr zwraca wszystko
    let filterCondition = true;

    // jezeli ograniczymy zbior przyciskiem all male female
    // to zwrócimy tylko co bedzie  zgodne z zadanym sex(m/f/null)

    if (AllMaleFemale) {
      filterCondition = sex === AllMaleFemale;
    }
    // query do filtrowania po name, motherName i fatherName
    // pokazemy tylko to co zawiera naszeQuery

    if (query) {
      const loweredQuery = query.toLowerCase();

      filterCondition = filterCondition
        && (name.toLowerCase().includes(loweredQuery)
          || (motherName?.toLowerCase().includes(loweredQuery) || false)
          || (fatherName?.toLowerCase().includes(loweredQuery) || false));
    }
    // jezeli jest jakis wiek w tablicy to dopisujemy warunek ze
    // nasze 'borny' po zaokragleniu do wieku beda zawarte w tablicy wiekow

    if (centuries.length) {
      filterCondition = filterCondition
        && centuries.includes(`${Math.ceil(born / 100)}`);
    }

    return filterCondition;
  });

  // ustawiamy to po czym sortujemy na wyniku funkcji strzałkowej(zbiorze tego co widzimy),
  // wartosci z enuma SortBy:name,sex,born,died

  if (sort) {
    sortedPeople?.sort((personA, personB) => {
      switch (sort) {
        case SortBy.Name:
          return personA.name.localeCompare(personB.name);
        case SortBy.Sex:
          return personA.sex.localeCompare(personB.sex);
        case SortBy.Born:
          return personA.born - personB.born;
        case SortBy.Died:
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  // Asc i Desc

  if (order === 'DESC') {
    sortedPeople?.reverse();
  }

  if (order === 'ASC') {
    (sortedPeople?.reverse())?.reverse();
  }

  return sortedPeople;
}
