import {useSearchParams} from "react-router-dom";
import {FC, useMemo} from 'react';
import classNames from "classnames";
import {Person} from "../types";
import {PersonInfo} from "./PersonInfo";
import {filterPeople} from "../utils/filterPeople";
import {SearchLink} from "./SearchLink";
import {getSortingSearch} from "../utils/searchHelper";
import {SortType} from "../types/SortType";

interface Props {
  people: Person[],
  selectedPersonSlug: string,
}

const sortOptions = {
  [SortType.Name]: (a: Person, b: Person) => a.name.localeCompare(b.name),
  [SortType.Sex]: (a: Person, b: Person) => a.sex.localeCompare(b.sex),
  [SortType.Born]: (a: Person, b: Person) => a.born - b.born,
  [SortType.Died]: (a: Person, b: Person) => a.died - b.died,
};

function sortByType(type: SortType, order: string, people: Person[]) {
  const sortedPeople = [...people].sort(sortOptions[type]);

  return order === 'desc'
    ? sortedPeople.reverse()
    : sortedPeople;
}

export const PeopleTable: FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    return filterPeople(people, [sex, query, centuries]);
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortByType(sort as SortType, order, filteredPeople);
  }, [filteredPeople, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortType).map(([key, value]) => (
            <th key={key}>
              <span
                className="is-flex is-flex-wrap-nowrap"
              >
                {key}
                <SearchLink
                  params={getSortingSearch(value, sort, order)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'fas',
                      { 'fa-sort': sort !== value },
                      { 'fa-sort-up': sort === value && !order },
                      {
                        'fa-sort-down': sort === value
                          && order === 'desc',
                      },
                    )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          return (
            <PersonInfo
              key={person.slug}
              person={person}
              selectedPersonSlug={selectedPersonSlug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
