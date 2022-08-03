import { useEffect } from 'react';
import { Person } from '../../types/Person';
import sortBoth from './images/sort_both.png';
import sortAsc from './images/sort_asc.png';
import sortDesc from './images/sort_desc.png';
import { getSearchWith } from '../../utils/searchWith';

type Props = {
  by: keyof Person,
  setSearchParams: any,
  sortBy: string | null,
  searchParams: URLSearchParams,
  visiblePeople: Person[],
  sortPeople: (people: Person[]) => void,
};

export const PeopleSort: React.FC<Props> = ({
  by,
  setSearchParams,
  searchParams,
  sortBy,
  visiblePeople,
  sortPeople,
}) => {
  const sortedPeople = [...visiblePeople].sort((a: any, b: any) => {
    if (sortBy?.startsWith('asc')) {
      const direction = sortBy.slice(4);

      if (typeof a[direction] === 'string') {
        return String(a[direction]).localeCompare(String(b[direction]));
      }

      return a[direction] - b[direction];
    }

    if (sortBy?.startsWith('desc')) {
      const direction = sortBy.slice(5);

      if (typeof a[direction] === 'string') {
        return String(b[direction]).localeCompare(String(a[direction]));
      }

      return a[direction] - a[direction];
    }

    return 0;
  });

  useEffect(() => {
    sortPeople(sortedPeople);
  }, [sortBy]);

  switch (sortBy) {
    case `desc_${by}`:
      return (
        <button
          type="button"
          className="PeoplePage__sort"
          onClick={() => {
            setSearchParams(
              getSearchWith({ sortBy: `asc_${by}` }, searchParams),
            );
          }}
        >
          <img src={sortDesc} alt="sort desc" />
        </button>
      );
    case `asc_${by}`:
      return (
        <button
          type="button"
          className="PeoplePage__sort"
          onClick={() => {
            setSearchParams(
              getSearchWith({ sortBy: '' }, searchParams),
            );
          }}
        >
          <img src={sortAsc} alt="sort asc" />
        </button>
      );
    default:
      return (
        <button
          type="button"
          className="PeoplePage__sort"
          onClick={() => {
            setSearchParams(
              getSearchWith({ sortBy: `desc_${by}` }, searchParams),
            );
          }}
        >
          <img src={sortBoth} alt="sort both" />
        </button>
      );
  }
};
