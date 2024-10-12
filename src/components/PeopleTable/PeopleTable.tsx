import { useContext, useMemo } from 'react';
import { PersonItem } from '../PersonItem';
import { FilteredPeopleContext } from '../../peopleContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SortBy, SortOrder, SortQueries } from '../../types/Sort';
import { Person } from '../../types';
import { sortPeople } from '../../utils/sortPeople';

export const PeopleTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const filteredPeople = useContext(FilteredPeopleContext);
  const navigate = useNavigate();

  const sortByField = searchParams.get(SortQueries.sort);
  const sortOrder = searchParams.get(SortQueries.order) || SortOrder.off;

  const sortedPeople = useMemo(
    () => sortPeople(filteredPeople, sortByField as keyof Person, sortOrder),
    [filteredPeople, sortByField, sortOrder],
  );

  const sortHandler = (sortField: SortBy) => {
    let tempSortOrder = SortOrder.off;

    if (sortField === sortByField) {
      switch (sortOrder) {
        case SortOrder.off:
          tempSortOrder = SortOrder.asc;
          break;
        case SortOrder.asc:
          tempSortOrder = SortOrder.decs;
          break;
      }
    } else {
      tempSortOrder = SortOrder.asc;
    }

    const newParams = new URLSearchParams(searchParams);

    newParams.set(SortQueries.sort, sortField);
    newParams.set(SortQueries.order, tempSortOrder);

    navigate({
      search: newParams.toString(),
    });
  };

  const getClasses = (field: SortBy) => {
    let arrowPos = 'fa-sort';

    if (sortByField === field) {
      if (sortOrder === SortOrder.asc) {
        arrowPos = 'fa-sort-up';
      }

      if (sortOrder === SortOrder.decs) {
        arrowPos = 'fa-sort-down';
      }
    }

    return 'fas ' + arrowPos;
  };

  if (!filteredPeople.length) {
    return <></>;
  }

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
              <a onClick={() => sortHandler(SortBy.name)}>
                <span className="icon">
                  <i className={getClasses(SortBy.name)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => sortHandler(SortBy.sex)}>
                <span className="icon">
                  <i className={getClasses(SortBy.sex)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => sortHandler(SortBy.born)}>
                <span className="icon">
                  <i className={getClasses(SortBy.born)} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => sortHandler(SortBy.died)}>
                <span className="icon">
                  <i className={getClasses(SortBy.died)} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
