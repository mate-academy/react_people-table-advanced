import { PersonRow } from '../PersonRow';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { ErrorType } from '../../types/ErrorType';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';
import cn from 'classnames';
import { SortField } from '../../pages/SortTypes';

interface Params {
  people: Person[];
  setError: Dispatch<SetStateAction<ErrorType>>;
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

export const PeopleTable: React.FC<Params> = ({ people, setError }) => {
  const { slug } = useParams();
  const normalizedSlug = slug || null;

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.get('centuries') || null;
  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const setSearchWith = (params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  // FILTERING
  const visiblePeople = [...people].filter(person => {
    // check if sex was set and filter people by sex
    if (sex && person.sex !== sex) {
      return false;
    }

    // checks if query was set and filters people by their name, father name and mother name
    if (
      query &&
      !person.name.includes(query) &&
      !person.motherName?.includes(query) &&
      !person.fatherName?.includes(query)
    ) {
      return false;
    }

    // checks if born or death year is within certain century
    if (
      centuries &&
      !centuries.includes((person.born % 100).toString()) &&
      !centuries.includes((person.died % 100).toString())
    ) {
      return false;
    }

    return true;
  });

  // SORTING
  if (sortField) {
    visiblePeople.sort((person1, person2) => {
      switch (sortField) {
        case SortField.Name:
          const name1 = person1.name.toLowerCase();
          const name2 = person2.name.toLowerCase();

          return name1.localeCompare(name2);

        case SortField.Sex:
          const sex1 = person1.sex.toLowerCase();
          const sex2 = person2.sex.toLowerCase();

          return sex1.localeCompare(sex2);

        case SortField.Born:
          return person1.born - person2.born;

        case SortField.Died:
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  if (sortOrder === 'desc') {
    visiblePeople.reverse();
  }

  if (visiblePeople.length === 0) {
    setError(ErrorType.NoPeopleMatching);
  } else {
    setError(ErrorType.NoError);
  }

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
          {visiblePeople.map(person => (
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
