import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortTypes } from '../types/sortParams';
import { QueryParams } from '../types/filterParams';

type Props = {
  people: Person[],
  allPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(QueryParams.Sort) || '';
  const order = searchParams.get(QueryParams.Order) || '';

  const { personSlug } = useParams();

  const isPersonInList = (personName: string) => (
    allPeople.find(person => person.name === personName)
  );

  const getParent = (
    personParent: string,
  ) => {
    const parent = isPersonInList(personParent);

    return parent
      ? (
        <PersonLink
          person={parent}
          searchParams={searchParams}
          selectedPerson={personSlug}
        />
      )
      : personParent;
  };

  const getSortedParams = (
    newSortType: string,
  ): Record<string, string | null> => {
    if (sort !== newSortType) {
      return {
        sort: newSortType,
      };
    }

    if (sort === newSortType && !order) {
      return { order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

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
              <SearchLink
                params={getSortedParams(SortTypes.Name)}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Name),
                    'fa-sort-down': (order && sort === SortTypes.Name),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortedParams(SortTypes.Sex)}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Sex),
                    'fa-sort-down': (order && sort === SortTypes.Sex),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortedParams(SortTypes.Born)}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Born),
                    'fa-sort-down': (order && sort === SortTypes.Born),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortedParams(SortTypes.Died)}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': (!order && sort === SortTypes.Died),
                    'fa-sort-down': (order && sort === SortTypes.Died),
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
                searchParams={searchParams}
                selectedPerson={personSlug}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName
                ? getParent(person.motherName)
                : '-'}
            </td>
            <td>
              {person.fatherName
                ? getParent(person.fatherName)
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
