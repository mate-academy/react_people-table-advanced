import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  allPeople: Person[];
};

export const PeopleTable = ({ people, allPeople }: Props) => {
  const [searchParams] = useSearchParams();
  const { slug: activeSlug } = useParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (order === null) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: string) => {
    return classNames('fas', {
      'fa-sort': sort !== column,
      'fa-sort-up': sort === column && order === null,
      'fa-sort-down': sort === column && order === 'desc',
    });
  };

  const renderPersonCell = (personName: string | null) => {
    if (!personName) {
      return '-';
    }

    const foundPerson = allPeople.find(p => p.name === personName);

    if (!foundPerson) {
      return personName;
    }

    return (
      <Link
        to={{
          pathname: `/people/${foundPerson.slug}`,
          search: searchParams.toString(),
        }}
        className={classNames({
          'has-text-danger': foundPerson.sex === 'f',
        })}
      >
        {foundPerson.name}
      </Link>
    );
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
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
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
              'has-background-warning': person.slug === activeSlug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonCell(person.motherName)}</td>
            <td>{renderPersonCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
