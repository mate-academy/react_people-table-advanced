import { Person } from '../types';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
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
              <a href="#/people?sort=born&order=desc">
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
      {people.map((person) => {
        const isSelected = person.slug === selectedSlug;

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={isSelected ? 'has-background-warning' : ''}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
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
                  href={`#/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.mother.name}
                </a>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <a href={`#/people/${person.father.slug}`}>
                  {person.father.name}
                </a>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};
