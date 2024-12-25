/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { COLUMNS } from '../constans/personConstants';
import { PersonTableRow } from '../components/PersonTableRow';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const { slug: currentSlug } = useParams();

  const findParent = (parentName: string | null): Person | null => {
    return people.find(person => person.name === parentName) || null;
  };

  const preparedPeople = people.map(person => {
    return {
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map((column, index) => (
            <th key={index}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <a href="#/people?sort=name">
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          return (
            <PersonTableRow
              key={person.slug}
              person={person}
              currentSlug={currentSlug || ''}
            />
          );
        })}
      </tbody>
    </table>
  );
};
