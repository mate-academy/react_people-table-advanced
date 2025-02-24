import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { Sex } from '../types/sex';
import { SearchLink } from './SearchLink';
import { useSort } from './Hooks/useSort';
import { Category } from '../types/category';
import { useFilteredPeople } from './Hooks/useFilteredPeople';
import { Class } from './Hooks/Class';
import { PeopleMessage } from './PeopleMessage';
// import { arowUpDown } from './Hooks/'

/* eslint-disable jsx-a11y/control-has-associated-label */
interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const filteredPeople = useFilteredPeople(people);

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
              <SearchLink params={useSort(Category.name, searchParams)}>
                <span className="icon">
                  <i className={Class(Category.name, searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={useSort(Category.sex, searchParams)}>
                <span className="icon">
                  <i className={Class(Category.sex, searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={useSort(Category.born, searchParams)}>
                <span className="icon">
                  <i className={Class(Category.born, searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={useSort(Category.died, searchParams)}>
                <span className="icon">
                  <i className={Class(Category.died, searchParams)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {!people.length || !filteredPeople.length ? (
          <PeopleMessage />
        ) : (
          filteredPeople.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  state={{ search: searchParams.toString() }}
                  className={classNames({
                    'has-text-danger': person.sex === Sex.FEMALE,
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <Link
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <Link to={`/people/${person.father.slug}`}>
                    {person.father.name}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
