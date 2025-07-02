/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  onSelect,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const handleSort = (field: string) => {
    if (sort !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else if (order === 'asc') {
      searchParams.set('sort', field);
      searchParams.set('order', 'desc');
    } else if (order === 'desc') {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    if (order === 'asc') {
      return <i className="fas fa-sort-up" />;
    }

    if (order === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort" />;
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
              <button
                type="button"
                className="button is-white is-small ml-1"
                onClick={() => handleSort('name')}
                style={{ boxShadow: 'none' }}
              >
                <span className="icon">{getSortIcon('name')}</span>
              </button>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-white is-small ml-1"
                onClick={() => handleSort('sex')}
                style={{ boxShadow: 'none' }}
              >
                <span className="icon">{getSortIcon('sex')}</span>
              </button>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-white is-small ml-1"
                onClick={() => handleSort('born')}
                style={{ boxShadow: 'none' }}
              >
                <span className="icon">{getSortIcon('born')}</span>
              </button>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-white is-small ml-1"
                onClick={() => handleSort('died')}
                style={{ boxShadow: 'none' }}
              >
                <span className="icon">{getSortIcon('died')}</span>
              </button>
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
            className={classNames({
              'has-background-warning': selectedSlug === String(person.slug),
            })}
            onClick={() => onSelect(person.slug)}
            style={{ cursor: 'pointer' }}
          >
            <td>
              <PersonLink person={person} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink name={person.motherName} people={people} />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink name={person.fatherName} people={people} />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
