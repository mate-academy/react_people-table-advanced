import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  selectedPersonSlug?: string;
  sort?: SortField | null;
  order?: string | null;
};

export const PeopleTable = ({
  people,
  selectedPersonSlug,
  sort,
  order,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getArrow = (field: SortField) => {
    if (sort !== field) {
      return <i className="fas fa-sort people-table__sort-icon" />;
    }

    return (
      <i
        className={`fas ${
          order === 'desc' ? 'fa-sort-down' : 'fa-sort-up'
        } people-table__sort-icon`}
      />
    );
  };

  return (
    <div className="people-table-wrapper">
      <table
        className="table is-striped is-hoverable is-fullwidth people-table"
        data-cy="peopleTable"
      >
        <thead>
          <tr>
            <th
              className="people-table__sortable"
              onClick={() => handleSort('name')}
            >
              <span>
                Name
                {getArrow('name')}
              </span>
            </th>

            <th
              className="people-table__sortable"
              onClick={() => handleSort('sex')}
            >
              <span>
                Sex
                {getArrow('sex')}
              </span>
            </th>

            <th
              className="people-table__sortable"
              onClick={() => handleSort('born')}
            >
              <span>
                Born
                {getArrow('born')}
              </span>
            </th>

            <th
              className="people-table__sortable"
              onClick={() => handleSort('died')}
            >
              <span>
                Died
                {getArrow('died')}
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedPersonSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {people.length === 0 && (
        <p className="people-table__empty">
          There are no people matching the filters
        </p>
      )}
    </div>
  );
};
