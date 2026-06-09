import { useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findPerson = (name?: string | null) =>
    people.find(person => person.name === name);

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return (
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      );
    }

    return (
      <span className="icon">
        <i
          className={`fas ${order === 'desc' ? 'fa-sort-down' : 'fa-sort-up'}`}
        />
      </span>
    );
  };

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
              <a onClick={() => handleSort('name')}>{getSortIcon('name')}</a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>{getSortIcon('sex')}</a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>{getSortIcon('born')}</a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>{getSortIcon('died')}</a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                selectedSlug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
