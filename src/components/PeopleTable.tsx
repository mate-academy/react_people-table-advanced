import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { Sex } from '../types/sex';
import { SearchLink } from './SearchLink';
import { useSort } from './Hooks/useSort';
import { Category } from '../types/categoty';
import { useFilteredPeople } from './Hooks/useFilteredPeople';

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
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
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
        ))}
      </tbody>
    </table>
  );
};
