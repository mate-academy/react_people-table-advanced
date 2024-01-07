import { Person } from '../types/Person';
import { Sort } from '../types/Sort';
import { getCentury } from '../helper';

type Options = {
  sexParams: string | null;
  centuriesParams: string[];
  queryParams: string | null;
  sortParams: string | null;
  orderParams: boolean;
};

export const filteredPeople = (people: Person[], {
  sexParams,
  centuriesParams,
  queryParams,
  sortParams,
  orderParams,
}: Options) => {
  let copiedPeople = [...people];

  if (sexParams) {
    copiedPeople = copiedPeople.filter(({ sex }) => sex === sexParams);
  }

  if (centuriesParams.length > 0) {
    copiedPeople = copiedPeople.filter(
      person => centuriesParams.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (queryParams) {
    const lowerQuery = queryParams.toLocaleLowerCase();

    copiedPeople = copiedPeople.filter(({
      name,
      motherName,
      fatherName,
    }) => {
      return [name, motherName || '', fatherName || '']
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortParams) {
    copiedPeople.sort((a, b) => {
      switch (sortParams) {
        case Sort.Name:
        case Sort.Sex:
          return a[sortParams].localeCompare(b[sortParams]);

        case Sort.Born:
        case Sort.Died:
          return a[sortParams] - b[sortParams];

        default:
          return 0;
      }
    });

    if (orderParams) {
      copiedPeople.reverse();
    }
  }

  return copiedPeople;
};
