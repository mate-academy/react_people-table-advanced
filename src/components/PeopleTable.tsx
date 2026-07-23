/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Sort, SortParams } from '../types/Sort';

interface Props {
  list: Person[];
}

export const PeopleTable = ({ list }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');
  const getNextSortParams = (type: Sort): SortParams => {
    if (!sortBy || sortBy !== type) {
      return { sort: type, order: null };
    }

    if (sortBy && !sortOrder) {
      return { sort: type, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getIconClassName = (type: Sort): string => {
    const isActive = sortBy === type;
    const orderDesc = sortOrder === 'desc';

    return cn('fas', {
      'fa-sort': !isActive,
      'fa-sort-up': isActive && !orderDesc,
      'fa-sort-down': isActive && orderDesc,
    });
  };

  return (
    list.length && (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={getNextSortParams('name')}>
                  <span className="icon">
                    <i className={getIconClassName('name')} />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink params={getNextSortParams('sex')}>
                  <span className="icon">
                    <i className={getIconClassName('sex')} />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={getNextSortParams('born')}>
                  <span className="icon">
                    <i className={getIconClassName('born')} />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={getNextSortParams('died')}>
                  <span className="icon">
                    <i className={getIconClassName('died')} />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {list.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};
