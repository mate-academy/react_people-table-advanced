/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortType = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const findParentPerson = (parentName: string) => {
    return people.find(person => {
      return person.name === parentName;
    });
  };

  const getSortParam = (sortParam: string) => {
    if (sortType === sortParam && sortOrder) {
      return { sort: null, order: null };
    }

    if (sortType === sortParam) {
      return { sort: sortParam, order: 'desc' };
    }

    return { sort: sortParam, order: null };
  };

  const filterOptions = [
    { label: 'Name', sortParam: 'name' },
    { label: 'Sex', sortParam: 'sex' },
    { label: 'Born', sortParam: 'born' },
    { label: 'Died', sortParam: 'died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {filterOptions.map(option => (
            <th key={option.label}>
              <span className="is-flex is-flex-wrap-nowrap">
                {option.label}
                <SearchLink params={getSortParam(option.sortParam)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sortType !== option.sortParam,
                        'fa-sort-up':
                          !sortOrder && sortType === option.sortParam,
                        'fa-sort-down': sortOrder,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            findParentPerson={findParentPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
