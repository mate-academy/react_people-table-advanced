import cn from "classnames";
import { Person } from "../types";
import { useSearchParams } from "react-router-dom";
import { PersonLink } from "./PersonLink";
import { SearchLink } from "./SearchLink";
import { FilterType } from "../types/FilterType";
import { Params } from '../types/Params';
import { FilterPeople } from '../types/FilterPeople';


type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const searchPeople = (relativeName: string | null) => {
    return people.find(person => person.name === relativeName);
  };

  const [searchParams] = useSearchParams();

  const sort = searchParams.get(Params.sort) || null;
  const order = searchParams.get(Params.order) || null;
  const query = searchParams.get(Params.query) || '';
  const sex = searchParams.get(Params.sex) || FilterPeople.All;
  const centuries = searchParams.getAll(Params.centuries || []);

  const filterPeople = [...people].filter(person => {
    const searchQuery = query?.toLowerCase().trim();

    if (searchQuery) {
      if (
        !person.name.toLowerCase().includes(searchQuery) &&
        !person.fatherName?.toLowerCase().includes(searchQuery) &&
        !person.motherName?.toLowerCase().includes(searchQuery)
      ) {
        return false;
      }
    }

    if (
      centuries.length > 0 &&
      !centuries.includes(Math.ceil(person.born / 100).toString())
    ) {
      return false;
    }

    if (sex && person.sex !== sex) {
      return false;
    }

    return true;
  });

  filterPeople.sort((a, b) => {
    switch (sort) {
      case FilterType.Name:
        return a.name.localeCompare(b.name);
      case FilterType.Sex:
        return a.sex.localeCompare(b.sex);
      case FilterType.Born:
        return a.born - b.born;
      case FilterType.Died:
        return a.died - b.died;
      default:
        return 0;
    }
  });

  if (order) {
    filterPeople.reverse();
  }

  if  (filterPeople.length === 0) {
    return (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <p>There are no people matching the current search criteria</p>
      </table>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(FilterType).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={{
                    sort: value === sort && order ? null : value,
                    order: value === sort && !order ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': value !== sort,
                        'fa-sort-up': value === sort && !order,
                        'fa-sort-down': value === sort && order,
                      })}
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
        {people.length > 0 &&
          filterPeople.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
              searchPeople={searchPeople}
            />
          ))}
      </tbody>
    </table>
  );
};
