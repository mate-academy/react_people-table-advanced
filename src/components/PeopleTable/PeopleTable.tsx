/* eslint-disable no-console */
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { personSlug } = useParams();

  console.log(personSlug);

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
        {people.map(person => {
          const mother = people.find(
            ({ name }) => name === person.motherName,
          );
          const father = people.find(
            ({ name }) => name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn('', {
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  // eslint-disable-next-line no-nested-ternary
                  mother
                    ? <PersonLink person={mother} />
                    : person.motherName
                      ? person.motherName
                      : '-'
                }
              </td>
              <td>
                {
                  // eslint-disable-next-line no-nested-ternary
                  father
                    ? <PersonLink person={father} />
                    : person.fatherName
                      ? person.fatherName
                      : '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
