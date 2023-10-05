import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { OrderControl } from './OrderControl';

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
      return person.name.toLowerCase().includes(queryFilter.toLowerCase())
        || person.motherName?.toLowerCase().includes(queryFilter.toLowerCase())
        || person.fatherName?.toLowerCase().includes(queryFilter.toLowerCase());
    })
    : filteredPeopleBySex;

  const filteredPeopleByCentury = centuryFilter.length > 0
    ? filteredPeopleByQuery?.filter(person => (
      (centuryFilter).includes(
        Math.floor((Number(person.born) / 100) + 1),
      )))
    : filteredPeopleByQuery;

  const currentSortBy = searchParams.get('sort');
  const currentSortOrder = searchParams.get('sortOrder');
  const displayPeople = filteredPeopleByCentury;

  if (currentSortBy) {
    const sortFunction = (a: Person, b: Person) => {
      const comparisonValue = currentSortOrder === 'ASC' ? 1 : -1;

      switch (currentSortBy) {
        case 'name':
          return comparisonValue * a.name.localeCompare(b.name);
        case 'sex':
          return comparisonValue * a.sex.localeCompare(b.sex);
        case 'born':
          return comparisonValue * (a.born - b.born);
        case 'died':
          return comparisonValue * (a.died - b.died);
        default:
          return 0;
      }
    };

    displayPeople?.sort(sortFunction);
  }

  return (
    <>
      {displayPeople?.length !== 0
      && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <OrderControl sortBy="name" />
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <OrderControl sortBy="sex" />
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <OrderControl sortBy="born" />
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <OrderControl sortBy="died" />
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
      {displayPeople?.length === 0
        && <p>There are no people matching the current search criteria</p>}
    </>
  );
};
