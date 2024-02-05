import { Person } from '../types';
import { Parents } from '../types/Parents';
import { PersonItem } from './PersonItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[]
};

function findParents(people: Person[], person: Person): Parents {
  const father = people.find(item => item.name === person.fatherName) || null;
  const mother = people.find(item => item.name === person.motherName) || null;

  return { father, mother };
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
          const parents = findParents(people, person);

          return (
            <PersonItem
              key={person.slug}
              person={person}
              parents={parents}
            />
          );
        })}
      </tbody>
    </table>
  );
};
