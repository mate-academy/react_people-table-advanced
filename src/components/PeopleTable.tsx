import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from '../PersonLink';
import { Icon } from './icon';

type Props = {
  activePerson: Person | null,
  setActivePerson(person: Person): void,
  filteredPeople: Person[],
  people: Person[],
  updateSearch(params: {
    [key: string]: number[] | string | null
  }):void,
  sort: string | null,
  order: string | null,
};

export const PeopleTable: React.FC<Props> = ({
  activePerson,
  setActivePerson,
  filteredPeople,
  people,
  updateSearch,
  sort,
  order,
}) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        <th>
          <Icon
            sortKey="name"
            text="Name"
            updateSearch={updateSearch}
            sort={sort}
            order={order}
          />
        </th>

        <th>
          <Icon
            sortKey="sex"
            text="Sex"
            updateSearch={updateSearch}
            sort={sort}
            order={order}
          />
        </th>

        <th>
          <Icon
            sortKey="born"
            text="Born"
            updateSearch={updateSearch}
            sort={sort}
            order={order}
          />
        </th>

        <th>
          <Icon
            sortKey="died"
            text="Died"
            updateSearch={updateSearch}
            sort={sort}
            order={order}
          />
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
          className={classNames(
            '',
            {
              'has-background-warning':
              person.slug === activePerson?.slug,
            },
          )}
        >
          <td>
            <PersonLink
              person={person}
              name={person.name}
              sex={person.sex}
              setActivePerson={setActivePerson}
            />
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>
          <td>
            {person.motherName
              && people.find(woman => woman.name === person.motherName) && (
              <PersonLink
                person={people.find(
                  woman => woman.name === person.motherName,
                )}
                name={person.motherName}
                sex="f"
                setActivePerson={setActivePerson}
              />
            )}

            {person.motherName
              && !people.find(
                woman => woman.name === person.motherName,
              ) && (
              `${person.motherName}`
            )}
            {!person.motherName
              && !people.find(
                woman => woman.name === person.motherName,
              ) && (
              '-'
            )}
          </td>
          <td>
            {person.fatherName
              && people.find(man => man.name === person.fatherName) && (
              <PersonLink
                person={people.find(man => man.name === person.fatherName)}
                name={person.fatherName}
                sex="m"
                setActivePerson={setActivePerson}
              />
            )}

            {person.fatherName
              && !people.find(man => man.name === person.fatherName) && (
              `${person.fatherName}`
            )}

            {!person.fatherName
              && !people.find(man => man.name === person.fatherName) && (
              '-'
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
