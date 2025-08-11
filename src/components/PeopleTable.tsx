import classNames from 'classnames';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

interface Props {
  people: Person[];
}

const headerData = [
  { label: 'Name', sortKey: 'name' },
  { label: 'Sex', sortKey: 'sex' },
  { label: 'Born', sortKey: 'born' },
  { label: 'Died', sortKey: 'died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      result = people.filter(
        person =>
          person.name.toLowerCase().includes(lowerCaseQuery) ||
          person.motherName?.toLowerCase().includes(lowerCaseQuery) ||
          person.fatherName?.toLowerCase().includes(lowerCaseQuery),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return result;
  }, [people, query, sex, centuries]);

  const selectedPerson = people.find(person => person.slug === slug);

  const findPersonByName = (name: string | null) => {
    return name ? people.find(person => person.name === name) : null;
  };

  const renderPersonLink = (name: string | null) => {
    const person = findPersonByName(name);

    return person ? <PersonLink person={person} /> : name || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headerData.map((header, index) => (
            <th key={index}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header.label}
                <SortLink sortKey={header.sortKey} />
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filteredPeople.map((person, index) => (
          <tr
            className={classNames({
              'has-background-warning':
                selectedPerson && selectedPerson.slug === person.slug,
            })}
            key={index}
            data-cy="person"
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonLink(person.motherName)}</td>
            <td>{renderPersonLink(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
