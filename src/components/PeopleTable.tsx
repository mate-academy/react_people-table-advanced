import classNames from 'classnames';
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { Sort } from './Sort';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slugName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genderFilter = queryParams.get('sex');
  const queryFilter = queryParams.get('query');
  const centuryFilter = queryParams.getAll('centuries').map(Number);
  const [searchParams] = useSearchParams();
  const currentSortBy = searchParams.get('sort');
  const currentSortOrder = searchParams.get('sortOrder');

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

  const visiblepeople = filteredPeopleByCentury;

  if (currentSortBy && filteredPeopleByCentury) {
    const sortFunction = (a: Person, b: Person) => {
      const sortValue = currentSortOrder === 'ASC' ? 1 : -1;

      switch (currentSortBy) {
        case 'name':
          return sortValue * a.name.localeCompare(b.name);
        case 'sex':
          return sortValue * a.sex.localeCompare(b.sex);
        case 'born':
          return sortValue * (a.born - b.born);
        case 'died':
          return sortValue * (a.died - b.died);
        default:
          return 0;
      }
    };

    visiblepeople?.sort(sortFunction);
  }

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <Sort sortBy="name" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <Sort sortBy="sex" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <Sort sortBy="born" />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <Sort sortBy="died" />
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblepeople?.map(person => {
            const {
              name,
              slug,
              sex,
              born,
              died,
              motherName,
              fatherName,
            } = person;
            const mother = visiblepeople?.find(possibleMother => possibleMother
              .name === motherName);
            const father = visiblepeople?.find(possibleFather => possibleFather
              .name === fatherName);

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames({
                  'has-background-warning': slug === slugName,
                })}
              >
                <td>
                  <NavLink
                    to={`/people/${slug}?${searchParams.toString()}`}
                    className={classNames({
                      'has-text-danger': sex === 'f',
                    })}
                  >
                    {name}
                  </NavLink>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>

                {mother ? (
                  <td>
                    <NavLink to={`/people/${mother.slug}?${searchParams.toString()}`} className="has-text-danger">
                      {mother.name}
                    </NavLink>
                  </td>
                ) : (
                  <td>{motherName || '-'}</td>
                )}

                {father ? (
                  <td>
                    <NavLink to={`/people/${father.slug}?${searchParams.toString()}`}>
                      {father.name}
                    </NavLink>
                  </td>
                ) : (
                  <td>{fatherName || '-'}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      { visiblepeople?.length === 0
        && <p>There are no people matching the current search criteria</p>}
    </>
  );
};
