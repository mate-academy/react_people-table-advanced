import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../../types';
import { getSortIconClass } from '../../utils/getSortIconClass';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { PersonItem } from '../PersonItem/PersonItem';
import { PERSON_TABLE_COLUMNS } from '../../constants/constants';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSearchWith = (newParam: SearchParams): void | string => {
    const newSearch = getSearchWith(searchParams, newParam);

    setSearchParams(newSearch);
  };

  const handleSort = (sortField: string) => {
    if (sort === sortField) {
      if (order) {
        setSearchWith({ sort: null, order: null });

        return;
      }

      setSearchWith({ order: 'desc' });

      return;
    }

    setSearchWith({ sort: sortField });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {PERSON_TABLE_COLUMNS.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                {['Name', 'Sex', 'Born', 'Died'].includes(column) && (
                  <NavLink
                    to={`${pathname}?${getSearchWith(searchParams, { sort: column.toLowerCase() })}`}
                    onClick={event => {
                      event.preventDefault();
                    handleSort(column.toLowerCase());
                  }}
                >
                  <span className="icon">
                    <i
                      className={`fas ${getSortIconClass(column.toLowerCase(), sort, order)}`}
                    />
                  </span>
                </NavLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            people={people}
            selected={person.slug === personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
