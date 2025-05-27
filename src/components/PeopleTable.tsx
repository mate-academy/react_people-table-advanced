/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  people: Person[];
  handleErrorMessage: (error: ErrorMessage | null) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  handleErrorMessage,
}) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const currentPerson = people.find(person => person.slug === slug);
  const sortType = searchParams.get('sort');
  const orderType = searchParams.get('order');
  const sexType = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const peopleMap = new Map<string, string>();
  let visiblePeople: Person[] = [];

  people.forEach(person => {
    if (person.name && person.slug) {
      peopleMap.set(person.name, person.slug);
    }
  });

  const handleSortType = (type: string): SearchParams => {
    const newParams: SearchParams = {};

    if (sortType === type) {
      // Kliknięto ten sam sort — przełącz sortowanie lub usuń
      if (orderType === 'desc') {
        // Usuń sortowanie całkowicie
        newParams.sort = null;
        newParams.order = null;
      } else {
        // Przejdź na malejąco
        newParams.sort = type;
        newParams.order = 'desc';
      }
    } else {
      // Nowe pole sortowania — ustaw i usuń order
      newParams.sort = type;
      newParams.order = null;
    }

    return newParams;
  };

  switch (sortType) {
    case 'name':
      visiblePeople = [...people].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'sex':
      visiblePeople = [...people].sort((a, b) => a.sex.localeCompare(b.sex));
      break;
    case 'born':
      visiblePeople = [...people].sort((a, b) => a.born - b.born);
      break;
    case 'died':
      visiblePeople = [...people].sort((a, b) => a.died - b.died);
      break;
    default:
      visiblePeople = [...people];
  }

  if (orderType === 'desc') {
    visiblePeople.reverse();
  }

  const handleOrderSort = (type: string) => {
    if (sortType === type) {
      return orderType === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
    }

    return 'fa-sort';
  };

  if (sexType === 'male') {
    visiblePeople = visiblePeople.filter(person => person.sex === 'm');
  } else if (sexType === 'female') {
    visiblePeople = visiblePeople.filter(person => person.sex === 'f');
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const personCentury = Math.floor(person.born / 100 + 1);

      return centuries.includes(personCentury.toString());
    });
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (visiblePeople.length === 0) {
      handleErrorMessage(ErrorMessage.NO_PEOPLE_MATCHING);
    } else {
      handleErrorMessage(null);
    }
  } else {
    handleErrorMessage(null);
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
              <SearchLink params={handleSortType('name')}>
                <span className="icon">
                  <i className={`fas ${handleOrderSort('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSortType('sex')}>
                <span className="icon">
                  <i className={`fas ${handleOrderSort('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSortType('born')}>
                <span className="icon">
                  <i className={`fas ${handleOrderSort('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSortType('died')}>
                <span className="icon">
                  <i className={`fas ${handleOrderSort('died')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={`${currentPerson?.slug === person.slug && 'has-background-warning'}`}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName && peopleMap.has(person.motherName) ? (
                  <Link
                    to={{
                      pathname: `/people/${peopleMap.get(person.motherName)}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  (person.motherName ?? '-')
                )}
              </td>

              <td>
                {person.fatherName && peopleMap.has(person.fatherName) ? (
                  <Link
                    to={{
                      pathname: `/people/${peopleMap.get(person.fatherName)}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
