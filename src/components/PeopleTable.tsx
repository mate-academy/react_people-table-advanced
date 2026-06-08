/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const { slug } = useParams();

  //#region sort functions
  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order === null) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcons = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    if (order === null) {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  //#endregion

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
                  <i className={`fas ${getSortIcons('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcons('died')}`} />
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
            className={person.slug === slug ? 'has-background-warning' : ''}
            data-cy="person"
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
