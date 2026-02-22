/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
  allPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const [checkedSlug, setCheckedSlug] = useState<string>('');

  const navigate = useNavigate();

  const { slug } = useParams();
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);

  useEffect(() => {
    if (slug) {
      setCheckedSlug(slug);
    }
  }, [slug]);

  return (
    <>
      {people && people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a href="#/people?sort=name">
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
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
              const motherInList = allPeople.find(
                per => per.name === person.motherName,
              );
              const fatherInList = allPeople.find(
                per => per.name === person.fatherName,
              );

              const handleOnclick = (personSlug: string) => {
                console.log(search);
                navigate(`${personSlug}${search}`, { replace: true });
                setCheckedSlug(personSlug);
              };

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': checkedSlug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      to={{
                        pathname: `/people/${person.slug}`,
                        search: params.toString(),
                      }}
                      onClick={() => handleOnclick(person.slug)}
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
                    {motherInList ? (
                      <PersonLink
                        parent={motherInList}
                        handleOnClick={handleOnclick}
                      />
                    ) : (
                      <span>{person.motherName ? person.motherName : '-'}</span>
                    )}
                  </td>
                  <td>
                    {fatherInList ? (
                      <PersonLink
                        parent={fatherInList}
                        handleOnClick={handleOnclick}
                      />
                    ) : (
                      <span>{person.fatherName ? person.fatherName : '-'}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
