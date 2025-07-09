import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const slugParam = useParams<{ slug?: string }>();

  function createSlug(person: Person, who: string) {
    const parentPerson = people.find(p => {
      if (who === 'mother') {
        return p.name === person.motherName;
      } else {
        return p.name === person.fatherName;
      }
    });

    return parentPerson;
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
              <SearchLink params={{ sort: 'name' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: 'sex' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sort: 'born' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ sort: 'died' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
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
          return (
            <tr
              data-cy="person"
              key={person.name}
              className={
                slugParam.slug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
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
              <td>
                {!person.motherName && <p>-</p>}
                {createSlug(person, 'mother')?.slug === undefined &&
                  person.motherName}

                {createSlug(person, 'mother')?.slug !== undefined && (
                  <Link
                    className="has-text-danger"
                    to={`/people/${createSlug(person, 'mother')?.slug}`}
                  >
                    {person.motherName}
                  </Link>
                )}
              </td>
              <td>
                {!person.fatherName && <p>-</p>}
                {createSlug(person, 'father')?.slug === undefined &&
                  person.fatherName}
                {createSlug(person, 'father')?.slug !== undefined && (
                  <Link to={`/people/${createSlug(person, 'father')?.slug}`}>
                    {person.fatherName}
                  </Link>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
