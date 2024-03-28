import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { PersonLink } from './PersonLInk';
import { SearchParams } from '../types/SearchParams';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  filteredPeople: Person[];
  setFilteredPeople: Dispatch<SetStateAction<Person[]>>;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  filteredPeople,
  setFilteredPeople,
}) => {
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || null;
  const orderParam = searchParams.get('order') || null;
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const century = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const getIconClass = (param: string): string => {
    if (sortParam !== param) {
      return 'fa-sort';
    }

    if (sortParam === param && !orderParam) {
      return 'fa-sort-up';
    }

    if (sortParam === param && orderParam === 'desc') {
      return 'fa-sort-down';
    }

    return '';
  };

  const filterPeople = useCallback(() => {
    let filtered = [...people];

    if (sortParam) {
      filtered.sort((a, b) => {
        switch (sortParam) {
          case 'born':
          case 'died':
            return orderParam !== 'desc'
              ? a[sortParam] - b[sortParam]
              : b[sortParam] - a[sortParam];
          case 'name':
          case 'sex':
            return orderParam !== 'desc'
              ? a[sortParam].localeCompare(b[sortParam])
              : b[sortParam].localeCompare(a[sortParam]);
          default:
            return 0;
        }
      });
    }

    if (query) {
      const query4Filter = query.toLowerCase().trim();

      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query4Filter) ||
          p.motherName?.toLowerCase().includes(query4Filter) ||
          p.fatherName?.toLowerCase().includes(query4Filter),
      );
    }

    if (sex) {
      filtered = filtered.filter(p => p.sex === sex);
    }

    if (century.length) {
      filtered = filtered.filter(p =>
        century.some(cen => {
          const birthYear = Math.floor(p.born);
          const centuryStart = +cen * 100 - 100;
          const centuryEnd = +cen * 100 - 1;

          return birthYear >= centuryStart && birthYear <= centuryEnd;
        }),
      );
    }

    setFilteredPeople(filtered);
  }, [people, sex, query, setFilteredPeople, orderParam, sortParam, century]);

  useEffect(() => {
    filterPeople();
  }, [filterPeople]);

  const getParams = (param: string): SearchParams => {
    if (sortParam !== param) {
      return { sort: param };
    }

    if (sortParam === param && !orderParam) {
      return { sort: param, order: 'desc' };
    }

    if (sortParam === param && orderParam === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: null };
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
              <SearchLink params={getParams('name')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getParams('sex')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getParams('born')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getParams('died')}>
                <span className="icon">
                  <i className={cn('fas', getIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink
            person={person}
            filteredPeople={filteredPeople}
            key={person.name}
            data-cy="person"
          />
        ))}
      </tbody>
    </table>
  );
};
