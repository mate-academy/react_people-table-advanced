import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortTypeLink } from './SortTypeLink';

type Props = {
  sortedPeople: Person[],
  slug: string,
};

export const PeopleTable: React. FC<Props> = ({ slug, sortedPeople }) => {
  const isSelected = (person: Person) => person.slug === slug;
  const fieldName = ['Name', 'Sex', 'Born', 'Died'];

  if (!sortedPeople.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fieldName.map(field => (
            <SortTypeLink key={field} title={field} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = sortedPeople
            .find(parent => parent.name === person.motherName);
          const father = sortedPeople
            .find(parent => parent.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} slug={person.slug} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={person} slug={mother.slug} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={person} slug={father.slug} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
