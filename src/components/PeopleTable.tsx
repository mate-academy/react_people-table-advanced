import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getPreparedPeople } from '../utils/peopleFilter';
import { TableHeaderLink } from './TableHeaderLink';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = getPreparedPeople(people, {
    query, sex, centuries, sortField, order,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <TableHeaderLink fieldName="name" />
          </th>

          <th>
            <TableHeaderLink fieldName="sex" />
          </th>

          <th>
            <TableHeaderLink fieldName="born" />
          </th>

          <th>
            <TableHeaderLink fieldName="died" />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? (<PersonLink person={person.mother} />)
                : (person.motherName || '-')}
            </td>

            <td>
              {person.father
                ? (<PersonLink person={person.father} />)
                : (person.fatherName || '-')}
            </td>
          </tr>
        ))}

        {visiblePeople.length === 0 && (
          <tr>
            <td>
              <p className="my-3">No people found for the selected filters</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
