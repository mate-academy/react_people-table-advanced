import classNames from 'classnames';
import { useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonTableRow } from './PersonTableRow';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { TABLE_HEADERS } from '../constants';
import { SearchParamsValue } from '../types/SearchParamsValue';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const searchSort = searchParams.get(SearchParamsValue.SORT) || '';
  const searchOrder = searchParams.get(SearchParamsValue.ORDER) || '';

  const handleSort = useCallback(
    (sortBy: string): SearchParams => {
      if (searchOrder) {
        searchParams.delete(SearchParamsValue.SORT);
        searchParams.delete(SearchParamsValue.ORDER);

        return { order: null };
      }

      switch (searchSort) {
        case sortBy:
          return { order: 'desc' };
        default:
          return { sort: sortBy };
      }
    },
    [searchOrder, searchParams, searchSort],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(({ id, title, isSorted }) => (
            <th key={id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                {isSorted && (
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        handleSort(title.toLowerCase()),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': searchSort !== title.toLowerCase(),
                          'fa-sort-up':
                            searchSort === title.toLowerCase() && !searchOrder,
                          'fa-sort-down':
                            searchSort === title.toLowerCase() && searchOrder,
                        })}
                      />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const personMother = people.find(
            item => item.name === person.motherName,
          );
          const personFather = people.find(
            item => item.name === person.fatherName,
          );

          return (
            <PersonTableRow
              key={person.name}
              person={person}
              personMother={personMother}
              personFather={personFather}
              slug={slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
