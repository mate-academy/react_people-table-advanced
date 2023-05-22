import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { SortCategory } from '../types/SortCategory';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { selectedPerson = '' } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const handleSort = (category: SortCategory | null) => {
    const isSameSort = sort === category;
    const isDescOrder = order === 'desc';

    return isSameSort && isDescOrder
      ? null
      : category;
  };

  const handleOrder = (category: SortCategory | null) => {
    const isSameSort = sort === category;
    const notDescOrder = order !== 'desc';

    return isSameSort && notDescOrder
      ? 'desc'
      : null;
  };

  const handleButtonClass = (category: SortCategory) => {
    if (sort !== category) {
      return 'fas fa-sort';
    }

    return order === 'desc'
      ? 'fas fa-sort-down'
      : 'fas fa-sort-up';
  };

  const sortedPeople = [...people].sort((personA, personB) => {
    switch (sort) {
      case SortCategory.NAME:
      case SortCategory.SEX:
        return order === 'desc'
          ? personB[sort].localeCompare(personA[sort])
          : personA[sort].localeCompare(personB[sort]);
      case SortCategory.BORN:
      case SortCategory.DIED:
        return order === 'desc'
          ? personB[sort] - personA[sort]
          : personA[sort] - personB[sort];
      default: return 0;
    }
  });

  return (
    sortedPeople.length ? (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink
                  params={{
                    sort: handleSort(SortCategory.NAME),
                    order: handleOrder(SortCategory.NAME),
                  }}
                >
                  <span className="icon">
                    <i className={handleButtonClass(SortCategory.NAME)} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink
                  params={{
                    sort: handleSort(SortCategory.SEX),
                    order: handleOrder(SortCategory.SEX),
                  }}
                >
                  <span className="icon">
                    <i className={handleButtonClass(SortCategory.SEX)} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink
                  params={{
                    sort: handleSort(SortCategory.BORN),
                    order: handleOrder(SortCategory.BORN),
                  }}
                >
                  <span className="icon">
                    <i className={handleButtonClass(SortCategory.BORN)} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink
                  params={{
                    sort: handleSort(SortCategory.DIED),
                    order: handleOrder(SortCategory.DIED),
                  }}
                >
                  <span className="icon">
                    <i className={handleButtonClass(SortCategory.DIED)} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortedPeople.map(person => (
            <PersonInfo
              person={person}
              key={person.slug}
              selectedPerson={selectedPerson}
            />
          ))}
        </tbody>
      </table>
    ) : (
      <p>There are no people matching the current search criteria</p>
    )
  );
};
