import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  peoples: Person[];
  searchParams: URLSearchParams;
  setSearchWith: (params: any) => void;
};

enum SortType {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeopleTable: React.FC<Props> = ({
  peoples,
  searchParams,
  setSearchWith,
}) => {
  const [filteredPeoples, setFilteredPeoples] = useState<Person[]>(peoples);

  useEffect(() => {
    // Apply sorting when searchParams change
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort === SortType.name || sort === SortType.sex) {
      const sortedPeoples = [...peoples].sort((a, b) => {
        const compare = (
          a[sort as keyof Person]?.toString() ?? ''
        ).localeCompare(b[sort as keyof Person]?.toString() ?? '');

        return order === 'desc' ? -compare : compare;
      });

      setFilteredPeoples(sortedPeoples);
    } else if (sort === SortType.born || sort === SortType.died) {
      const sortedPeoples = [...peoples].sort((a, b) => {
        const numA = a[sort as keyof Person] as unknown as number;
        const numB = b[sort as keyof Person] as unknown as number;
        const filtNumb = numA - numB;

        return order === 'desc' ? -filtNumb : filtNumb;
      });

      setFilteredPeoples(sortedPeoples);
    } else {
      setFilteredPeoples(peoples);
    }
  }, [searchParams, peoples]);

  function handleSortClick(field: SortType) {
    const isSortedByField = searchParams.get('sort') === field;
    const isDescOrder = searchParams.get('order') === 'desc';

    if (isSortedByField && isDescOrder) {
      // If already sorted by field and in descending order, clear sort
      setSearchWith({ sort: null, order: null });
    } else if (isSortedByField) {
      // If already sorted by field, set to descending order
      setSearchWith({ order: 'desc' });
    } else {
      // If not sorted by field, set to ascending order
      setSearchWith({ sort: field, order: null });
    }
  }

  function getSortIcon(field: SortType) {
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order');

    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    if (sortOrder === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  }

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
              <a
                onClick={e => {
                  e.preventDefault();
                  handleSortClick(SortType.name);
                }}
              >
                <span className="icon">{getSortIcon(SortType.name)}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={e => {
                  e.preventDefault();
                  handleSortClick(SortType.sex);
                }}
              >
                <span className="icon">{getSortIcon(SortType.sex)}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={e => {
                  e.preventDefault();
                  handleSortClick(SortType.born);
                }}
              >
                <span className="icon">{getSortIcon(SortType.born)}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={e => {
                  e.preventDefault();
                  handleSortClick(SortType.died);
                }}
              >
                <span className="icon">{getSortIcon(SortType.died)}</span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeoples.map(people => (
          <PersonLink person={people} peoples={peoples} key={people.slug} />
        ))}
      </tbody>
    </table>
  );
};
