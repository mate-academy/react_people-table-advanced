import { useSearchParams } from "react-router-dom";
import { sort } from "../../function/sort";
import { Person } from "../../types";
import { SORT } from "../../types/sort";
import { SORT_DIRECTION } from "../../types/sortDirection";
import { PersonLink } from "../PersonLink/PersonLink";
import classNames from "classnames";
import { Link } from "react-router-dom"; 

type Props = {
  filteredPeople: Person[];
}

export const PeopleTable: React.FC<Props> = ({ filteredPeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get('sort') as SORT || SORT.DEFAULT;
  const sortDirection = searchParams.get('order') as SORT_DIRECTION || SORT_DIRECTION.ASC;

  const sortedPeople = sort(filteredPeople, sortField, sortDirection);

  const toggleSort = (field: SORT) => {
    if (sortField !== field) {
      searchParams.set('sort', field);
    } else {
      if (sortDirection === SORT_DIRECTION.ASC) {
        searchParams.set('order', SORT_DIRECTION.DESC);
      } else {
        searchParams.delete('sort');
        searchParams.delete('order');
      }
    }
    setSearchParams(searchParams);
  };

  const headers = [
    { title: 'Name', field: SORT.NAME },
    { title: 'Sex', field: SORT.SEX },
    { title: 'Born', field: SORT.BORN },
    { title: 'Died', field: SORT.DIED },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map(({ title, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <Link to="#" onClick={(e) => {
                  e.preventDefault();
                  toggleSort(field);
                }}>
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sortField !== field,
                      'fa-sort-up': sortField === field && sortDirection === SORT_DIRECTION.ASC,
                      'fa-sort-down': sortField === field && sortDirection === SORT_DIRECTION.DESC,
                    })} />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink
            person={person}
            sortedPeople={sortedPeople}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
