import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

type SortConfig = {
  field: string;
  order: string;
};

type Props = {
  people: Person[];
  onSortChange: (field: string) => void;
  sortConfig: SortConfig;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  onSortChange,
  sortConfig,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  const handleSort = (field: string) => {
    onSortChange(field);
  };

  const getSortLink = (field: string) => {
    const newSortOrder =
      sortConfig.field === field && sortConfig.order === 'asc' ? 'desc' : 'asc';

    const newParams = new URLSearchParams(location.search);

    newParams.set('sort', field);
    newParams.set('order', newSortOrder);

    return newParams.toString();
  };

  const handleSortClick = (field: string) => {
    if (sortConfig.field === field) {
      const newSortOrder =
        sortConfig.order === 'asc'
          ? 'desc'
          : sortConfig.order === 'desc'
            ? ''
            : 'asc';

      const newParams = new URLSearchParams(location.search);

      if (newSortOrder === '') {
        newParams.delete('sort');
        newParams.delete('order');
        handleSort('');
      } else {
        newParams.set('sort', field);
        newParams.set('order', newSortOrder);
        handleSort(field);
      }

      navigate({ search: newParams.toString() });
    } else {
      const newParams = getSortLink(field);

      navigate({ search: newParams });
      handleSort(field);
    }
  };

  const getSortIconClass = (field: string) => {
    if (sortConfig.field !== field) {
      return 'fas fa-sort';
    }

    if (sortConfig.order === 'asc') {
      return 'fas fa-sort-up';
    }

    if (sortConfig.order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
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
              <Link to="#" onClick={() => handleSortClick('name')}>
                <span className="icon">
                  <i className={getSortIconClass('name')} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="#" onClick={() => handleSortClick('sex')}>
                <span className="icon">
                  <i className={getSortIconClass('sex')} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="#" onClick={() => handleSortClick('born')}>
                <span className="icon">
                  <i className={getSortIconClass('born')} />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="#" onClick={() => handleSortClick('died')}>
                <span className="icon">
                  <i className={getSortIconClass('died')} />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonInfo
            person={person}
            findPersonByName={findPersonByName}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
