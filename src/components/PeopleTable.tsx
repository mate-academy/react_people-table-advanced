/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person, SearchFilter, SearchGenders } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[] | null,
};

const DESCENDING = 'desc';

const getBornCentury = (year: number) => {
  if (year % 100) {
    return Math.ceil(year / 100);
  }

  return year / 100 + 1;
};

const sortingByFilter = (
  arr: Person[],
  sortParam: 'name' | 'sex' | 'born' | 'died',
) => {
  if (sortParam === 'born' || sortParam === 'died') {
    return arr.sort((a, b) => {
      return a[sortParam] - b[sortParam];
    });
  }

  if (sortParam === 'name' || sortParam === 'sex') {
    return arr.sort((a, b) => {
      return a[sortParam].localeCompare(b[sortParam]);
    });
  }

  return arr;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { currentSlug } = useParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(people);
  const [searchParams] = useSearchParams();

  const sortingHeader = useCallback((filter: SearchFilter) => {
    if (!searchParams.get(SearchFilter.sort)) {
      return { sort: filter, order: null };
    }

    if (searchParams.get(SearchFilter.sort)
    && !searchParams.get(SearchFilter.order)) {
      return { sort: filter, order: DESCENDING };
    }

    if (searchParams.get(SearchFilter.sort)
    && searchParams.get(SearchFilter.order)) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  }, [searchParams]);

  const getIconClass = useCallback((
    filter: SearchFilter,
  ) => {
    const isSort = filter === searchParams.get(SearchFilter.sort);
    const isDesc = isSort
    && searchParams.get(SearchFilter.order) === DESCENDING;

    return classNames('fas', {
      'fa-sort': !isSort && !isDesc,
      'fa-sort-up': isSort && !isDesc,
      'fa-sort-down': isDesc && isDesc,
    });
  }, [searchParams]);

  useEffect(() => {
    const query = searchParams.get(SearchFilter.query) || '';
    const sex = searchParams.get(SearchFilter.sex) || '';
    const centuries = searchParams.getAll(SearchFilter.century) || [];
    const sort = searchParams.get(SearchFilter.sort) || null;
    const order = searchParams.get(SearchFilter.order) || null;

    if (people) {
      let filteredPeopleList: Person[] = [...people];

      if (query) {
        filteredPeopleList = people.filter(
          (person: Person) => person.name.toLowerCase()
            .includes(query.toLowerCase().trim())
            || person.motherName?.toLowerCase()
              .includes(query.toLowerCase().trim())
            || person.fatherName?.toLowerCase()
              .includes(query.toLowerCase().trim()),
        );
      }

      if (centuries && centuries.length) {
        filteredPeopleList = filteredPeopleList.filter(person => (
          centuries.includes(getBornCentury(person.born).toString())
        ));
      }

      if (sex) {
        switch (sex) {
          case SearchGenders.man: {
            filteredPeopleList = filteredPeopleList
              .filter((person: Person) => person.sex === SearchGenders.man);
            break;
          }

          case SearchGenders.women: {
            filteredPeopleList = filteredPeopleList.filter(
              (person: Person) => person.sex === SearchGenders.women,
            );
            break;
          }

          default:
            break;
        }
      }

      if (sort) {
        switch (sort) {
          case SearchFilter.name:
            filteredPeopleList = sortingByFilter(
              filteredPeopleList,
              SearchFilter.name,
            );
            break;

          case SearchFilter.sex:
            filteredPeopleList = sortingByFilter(
              filteredPeopleList,
              SearchFilter.sex,
            );
            break;

          case SearchFilter.born:
            filteredPeopleList = sortingByFilter(
              filteredPeopleList,
              SearchFilter.born,
            );
            break;

          case SearchFilter.died:
            filteredPeopleList = sortingByFilter(
              filteredPeopleList,
              SearchFilter.died,
            );
            break;

          default:
            break;
        }
      }

      if (order) {
        filteredPeopleList.reverse();
      }

      setFilteredPeople(filteredPeopleList);
    }
  }, [people, searchParams]);

  if (filteredPeople?.length) {
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
                <SearchLink
                  params={sortingHeader(SearchFilter.name)}
                >
                  <span className="icon">
                    <i className={
                      getIconClass(SearchFilter.name)
                    }
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink
                  params={sortingHeader(SearchFilter.sex)}
                >
                  <span className="icon">
                    <i className={
                      getIconClass(SearchFilter.sex)
                    }
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink
                  params={sortingHeader(SearchFilter.born)}
                >
                  <span className="icon">
                    <i className={
                      getIconClass(SearchFilter.born)
                    }
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink
                  params={sortingHeader(SearchFilter.died)}
                >
                  <span className="icon">
                    <i className={
                      getIconClass(SearchFilter.died)
                    }
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {filteredPeople && filteredPeople.map((person: Person) => {
            const {
              slug,
            } = person;

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === currentSlug,
                })}
              >
                <PersonLink
                  person={person}
                  people={filteredPeople}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <p>There are no people matching the current search criteria</p>;
};
