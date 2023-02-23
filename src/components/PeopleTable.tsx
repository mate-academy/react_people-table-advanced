import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[] | undefined;
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const [slug, setSlug] = useState<string | null>();
  const selectedPerson = useParams();

  const params = searchParams.toString() !== '' ? `?${searchParams}` : '';

  useEffect(() => {
    setSlug(selectedPerson.slug || null);
  }, [selectedPerson]);

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
        {people?.map((person) => {
          let father = person.fatherName || '-';
          let mother = person.motherName || '-';

          if (person.father) {
            father = person.father.name;
          }

          if (person.mother) {
            mother = person.mother.name;
          }

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <a
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                  href={`#/people/${person.slug}${params}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <a
                    className="has-text-danger"
                    href={`#/people/${person.mother.slug}${params}`}
                  >
                    {person.mother.name}
                  </a>
                ) : (
                  mother
                )}
              </td>
              <td>
                {person.father ? (
                  <a href={`#/people/${person.father.slug}${params}`}>
                    {person.father.name}
                  </a>
                ) : (
                  father
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
