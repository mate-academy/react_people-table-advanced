import { useLocation, useSearchParams, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type SortingTypeProps = {
  sortType: string | null;
};

export const SortingType = ({ sortType: sortBy }: SortingTypeProps) => {
  const [searchParams] = useSearchParams();
  const currentSortType = searchParams.get('sort');
  const sortOrder = searchParams.get('sortOrder');

  const getSearchParams = () => {
    let nextSortOrder: string | null = 'ASC';

    if (currentSortType === sortBy) {
      nextSortOrder = sortOrder === 'ASC'
        ? 'DESC'
        : null;
    }

    return {
      sort: nextSortOrder === null ? null : sortBy,
      sortOrder: nextSortOrder,
    };
  };

  return (
    <SearchLink params={getSearchParams()}>
      <span className="icon">
        <i
          className={cn('fas fa-sort', {
            'fa-sort-up': currentSortType === sortBy && sortOrder === 'ASC',
            'fa-sort-down': currentSortType === sortBy && sortOrder === 'DESC',
          })}
        />
      </span>
    </SearchLink>
  );
};

type PersonInfoProps = {
  person: Person;
  people: Person[] | undefined;
};

const PersonInfo = ({ person, people }: PersonInfoProps) => {
  const location = useLocation();
  const personFather = people?.find(p => p.name === person.fatherName);
  const personMother = people?.find(p => p.name === person.motherName);
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': location.pathname === `/people/${person.slug}`,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}?${searchParams.toString()}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {personMother
          ? (
            <NavLink
              className="has-text-danger"
              to={`/people/${personMother.slug}?${searchParams.toString()}`}
            >
              {personMother.name}
            </NavLink>
          ) : person.motherName || '-'}

      </td>
      <td>
        {personFather
          ? (
            <NavLink
              to={`/people/${personFather.slug}?${searchParams.toString()}`}
            >
              {personFather.name}
            </NavLink>
          ) : person.fatherName || '-'}

      </td>
    </tr>
  );
};

type PeopleTableProps = {
  people: Person[] | undefined;
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genderFilter = queryParams.get('sex');
  const centuryFilter = queryParams.getAll('centuries').map(Number);
  const queryFilter = queryParams.get('query');
  const [searchParams] = useSearchParams();

  const filteredPeopleBySex = genderFilter
    ? people?.filter(person => person.sex === genderFilter)
    : people;

  const filteredPeopleByQuery = queryFilter
    ? filteredPeopleBySex?.filter(person => {
      return (
        person.name.toLowerCase().includes(queryFilter.toLowerCase())
          // eslint-disable-next-line max-len
          || person.motherName?.toLowerCase().includes(queryFilter.toLowerCase())
          // eslint-disable-next-line max-len
          || person.fatherName?.toLowerCase().includes(queryFilter.toLowerCase())
      );
    })
    : filteredPeopleBySex;

  const filteredPeopleByCentury = centuryFilter.length > 0
    ? filteredPeopleByQuery?.filter(person => {
      return centuryFilter.includes(
        Math.floor((Number(person.born) / 100) + 1),
      );
    })
    : filteredPeopleByQuery;

  const currentSortBy = searchParams.get('sort');
  const currentSortOrder = searchParams.get('sortOrder');
  const displayPeople = filteredPeopleByCentury;

  if (currentSortBy) {
    const sortFunction = (a: Person, b: Person) => {
      const comparisonValue = currentSortOrder === 'ASC' ? 1 : -1;

      if (currentSortBy === 'name') {
        return comparisonValue * a.name.localeCompare(b.name);
      }

      if (currentSortBy === 'sex') {
        return comparisonValue * a.sex.localeCompare(b.sex);
      }

      if (currentSortBy === 'born') {
        return comparisonValue * (a.born - b.born);
      }

      if (currentSortBy === 'died') {
        return comparisonValue * (a.died - b.died);
      }

      return 0;
    };

    displayPeople?.sort(sortFunction);
  }

  return (
    <>
      {displayPeople?.length !== 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SortingType sortType="name" />
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SortingType sortType="sex" />
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SortingType sortType="born" />
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SortingType sortType="died" />
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {displayPeople?.map((person) => {
              return (
                <PersonInfo
                  key={person.slug}
                  person={person}
                  people={people}
                />
              );
            })}
          </tbody>
        </table>
      )}
      {displayPeople?.length === 0 && (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
