import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (!currentOrder) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getSortIconClass = (field: string) => {
    const isSelected = currentSort === field;

    if (!isSelected) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger':
                      person.sex === 'f' || person.sex === 'female',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
