/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeopleRow } from '../PersonRow';
import { useMemo } from 'react';
import { SearchParamsForFilter } from '../../types/SearchParamsForFilter';
import { SortParams } from '../../types/SortParams';

type Props = {
  people: Person[];
};

function filterPeopleBySearchParams(
  peopleList: Person[],
  { queryParam, centuriesParam, peopleSexParam }: SearchParamsForFilter,
) {
  const queryInLowerCase = queryParam.toLowerCase();

  return peopleList.filter(person => {
    const personCentury = Math.ceil(person.born / 100)
      .toString()
      .toString();

    return (
      person.name.toLowerCase().includes(queryInLowerCase) &&
      person.sex.includes(peopleSexParam) &&
      (centuriesParam.length > 0
        ? centuriesParam.includes(personCentury)
        : true)
    );
  });
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const peopleSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  const filteredPeople = useMemo(() => {
    return filterPeopleBySearchParams(people, {
      queryParam: query,
      centuriesParam: centuries,
      peopleSexParam: peopleSex,
    });
  }, [centuries, people, peopleSex, query]);

  const handleSorting = (sortParam: SortParams) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort === sortParam) {
      if (currentOrder === 'asc') {
        params.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        params.delete('sort');
        params.delete('order');
      }
    } else {
      params.set('sort', sortParam);
      params.set('order', 'asc');
    }

    return params.toString();
  };

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sorted = [...filteredPeople].sort((a, b) => {
      const aValue = a[sort as keyof Person] ?? '';
      const bValue = b[sort as keyof Person] ?? '';

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return sorted;
  }, [filteredPeople, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={{ search: handleSorting(SortParams.ByName) }}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === 'name' ? (order === 'asc' ? '-up' : '-down') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSorting(SortParams.BySex) }}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === SortParams.BySex ? (order === 'asc' ? '-up' : '-down') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSorting(SortParams.ByBorn) }}>
                <span className="icon">
                  <i
                    id="born"
                    className={`fas fa-sort${sort === SortParams.ByBorn ? (order === 'asc' ? '-up' : '-down') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSorting(SortParams.ByDied) }}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${sort === SortParams.ByDied ? (order === 'asc' ? '-up' : '-down') : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PeopleRow
            personToRender={person}
            people={people}
            slug={slug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
