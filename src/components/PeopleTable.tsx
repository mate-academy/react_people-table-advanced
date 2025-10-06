import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type SortField = 'name' | 'sex' | 'born' | 'died' | null;
type SortOrder = 'asc' | 'desc';

type Props = {
  people: Person[];
  sortField: SortField;
  setSortField: React.Dispatch<React.SetStateAction<SortField>>;
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}) => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const handleSortClick = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder('asc');

      return;
    }

    if (sortField === field && sortOrder === 'asc') {
      setSortOrder('desc');

      return;
    }

    setSortField(null);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return 'fas fa-sort';
    }

    if (sortOrder === 'asc') {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort-down';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th
            onClick={() => handleSortClick('name')}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <span className="icon">
                <i className={getSortIcon('name')} />
              </span>
            </span>
          </th>

          <th
            onClick={() => handleSortClick('sex')}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span className="icon">
                <i className={getSortIcon('sex')} />
              </span>
            </span>
          </th>

          <th
            onClick={() => handleSortClick('born')}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span className="icon">
                <i className={getSortIcon('born')} />
              </span>
            </span>
          </th>

          <th
            onClick={() => handleSortClick('died')}
            style={{ cursor: 'pointer' }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span className="icon">
                <i className={getSortIcon('died')} />
              </span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            onClick={() => navigate(`/people/${person.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
