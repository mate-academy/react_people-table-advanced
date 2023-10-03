import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { EMPTY } from '../../utils/consts';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId = '' } = useParams();

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

        <tbody>
          {people.map((person) => (
            <tr
              data-cy="person"
              className={
                classNames({
                  'has-background-warning': personId === person.slug,
                })
              }
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (
                    <PersonLink person={person.mother} />
                  )
                  : (
                    person.motherName || EMPTY
                  )}
              </td>
              <td>
                {person.father
                  ? (
                    <PersonLink person={person.father} />
                  )
                  : (
                    person.fatherName || EMPTY
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </thead>
    </table>
  );
};
