/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { useContext } from 'react';
import { PeopleContext } from '../../context/PeopleContext';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SortableColumn } from '../SortableColumn';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const { personName } = useParams();
  const [searchParams] = useSearchParams();

  const query = (searchParams.get('query') || '').toLowerCase().trim();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const peopleByName: Record<string, Person> = {};

  people.forEach(person => {
    peopleByName[person.name] = person;
  });

  const visiblePeople = people
    .filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        (p.motherName || '').toLowerCase().includes(query) ||
        (p.fatherName || '').toLowerCase().includes(query),
    )
    .filter(
      p =>
        !centuries.length ||
        centuries.includes(String(Math.ceil(p.born / 100))),
    )
    .filter(p => sex === null || p.sex === sex);

  const sortedPeople = [...visiblePeople];

  if (sort) {
    sortedPeople.sort((a, b) => {
      let comparison = 0;

      if (sort === 'name' || sort === 'sex') {
        comparison = a[sort].localeCompare(b[sort]);
      } else if (sort === 'born' || sort === 'died') {
        comparison = a[sort] - b[sort];
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }

  return (
    <>
      {visiblePeople.length === 0 && (
        <p>There are no people matching the current search criteria</p>
      )}
      {visiblePeople.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <SortableColumn label="Name" field="name" />
              <SortableColumn label="Sex" field="sex" />
              <SortableColumn label="Born" field="born" />
              <SortableColumn label="Died" field="died" />
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {sortedPeople.map(p => {
              const motherPerson = peopleByName[p.motherName ?? ''];
              const fatherPerson = peopleByName[p.fatherName ?? ''];

              return (
                <tr
                  data-cy="person"
                  key={p.name}
                  className={classNames({
                    'has-background-warning': p.slug === personName,
                  })}
                >
                  <td>
                    <PersonLink person={p} />
                  </td>

                  <td>{p.sex}</td>
                  <td>{p.born}</td>
                  <td>{p.died}</td>
                  <td>
                    {motherPerson ? (
                      <PersonLink person={motherPerson} />
                    ) : (
                      p.motherName || '-'
                    )}
                  </td>
                  <td>
                    {fatherPerson ? (
                      <PersonLink person={fatherPerson} />
                    ) : (
                      p.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
