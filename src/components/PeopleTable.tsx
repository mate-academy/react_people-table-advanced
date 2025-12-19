/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

const sortOptions: { [key: string]: string } = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedUser = slug ? slug : '';

  const [searchParams, setSearchParams] = useSearchParams();
  const oldSort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  function sortHandler(event: React.MouseEvent<HTMLElement>, key: string) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    const currentSort = searchParams.get('sort') || '';
    const currentOrder = (searchParams.get('order') as 'asc' | 'desc') || 'asc';

    if (currentSort !== key) {
      // start sorting the new column ascending (default)
      params.set('sort', key);
      params.delete('order'); // 'asc' is default -> omit order param
    } else {
      // same column: cycle asc -> desc -> no-sort
      if (currentOrder === 'asc') {
        params.set('order', 'desc');
      } else {
        // currentOrder === 'desc' -> clear sorting
        params.delete('sort');
        params.delete('order');
      }
    }

    setSearchParams(params);
    // Sorting is handled by the People component via URL params
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(sortOptions).map(([key, value]) => (
            <th key={key}>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={e => sortHandler(e, key)}
              >
                {value}
                <a href={`#/people?sort=${key}`}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        { 'fa-sort': oldSort !== key },
                        { 'fa-sort-up': oldSort === key && order === 'asc' },
                        { 'fa-sort-down': oldSort === key && order === 'desc' },
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedUser,
            })}
            key={person.slug}
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
  );
};
