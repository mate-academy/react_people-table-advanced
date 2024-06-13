import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const { tabId } = useParams();

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
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    sort: 'name',
                  }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
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
        {people.map(person => {
          const { name, sex, born, died, fatherName, motherName, slug } =
            person;

          const getParentLink = (parentName: string) => {
            return people.find(item => item.name === parentName);
          };

          const mother = motherName ? getParentLink(motherName) : null;
          const father = fatherName ? getParentLink(fatherName) : null;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': tabId === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother ? (
                <td>
                  <Link
                    to={`/people/${mother.slug}`}
                    className="has-text-danger"
                  >
                    {motherName}
                  </Link>
                </td>
              ) : (
                <td>{motherName ? motherName : '-'}</td>
              )}
              {father ? (
                <td>
                  <Link to={`/people/${father.slug}`}>{fatherName}</Link>
                </td>
              ) : (
                <td>{fatherName ? fatherName : '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
