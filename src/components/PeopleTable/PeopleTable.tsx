import { PersonRow } from '../PersonRow';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';
import cn from 'classnames';
import { SortField } from '../../pages/SortTypes';

interface Params {
  people: Person[];
}

function getIconClasses(
  sortField: SortField,
  currentSortField: SortField,
  sortOrder: string | null,
) {
  return cn('fas', {
    'fa-sort': currentSortField !== sortField,
    'fa-sort-up': currentSortField === sortField && sortOrder === null,
    'fa-sort-down': currentSortField === sortField && sortOrder === 'desc',
  });
}

export const PeopleTable: React.FC<Params> = ({ people }) => {
  const { slug } = useParams();
  const normalizedSlug = slug || null;

  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') || null;

  const setSearchWith = (params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  const setSort = (value: SortField) => {
    if (sortField !== value) {
      setSearchWith({ sort: value });
    } else {
      if (sortOrder !== 'desc') {
        setSearchWith({ order: 'desc' });
      } else {
        setSearchWith({ sort: null, order: null });
      }
    }
  };

  return (
    <div className="table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <a onClick={() => setSort(SortField.Name)}>
                  <span className="icon">
                    <i
                      className={getIconClasses(
                        SortField.Name,
                        sortField as SortField,
                        sortOrder,
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <a onClick={() => setSort(SortField.Sex)}>
                  <span className="icon">
                    <i
                      className={getIconClasses(
                        SortField.Sex,
                        sortField as SortField,
                        sortOrder,
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <a onClick={() => setSort(SortField.Born)}>
                  <span className="icon">
                    <i
                      className={getIconClasses(
                        SortField.Born,
                        sortField as SortField,
                        sortOrder,
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <a onClick={() => setSort(SortField.Died)}>
                  <span className="icon">
                    <i
                      className={getIconClasses(
                        SortField.Died,
                        sortField as SortField,
                        sortOrder,
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <PersonRow
              people={people}
              person={person}
              slug={normalizedSlug}
              key={person.slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
