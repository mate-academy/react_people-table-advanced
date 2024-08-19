import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  setShowFilters: (arg: boolean) => void;
};

export const PeopleTable: React.FC<Props> = ({ setShowFilters }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('century');

  const getSortParams = (value: string) => ({
    sort: sort === value && order === 'desc' ? null : value,
    order: sort === value && order === null ? 'desc' : null,
  });

  const sortFilters = ['Name', 'Sex', 'Born', 'Died'];

  const handleError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    const getPeopleFromServer = async () => {
      try {
        setLoading(true);
        const peopleFromServer = await getPeople();

        const peopleWithParents = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer.find(
            parent => parent.name === person.motherName,
          ),
          father: peopleFromServer.find(
            parent => parent.name === person.fatherName,
          ),
        }));

        setPeople(peopleWithParents);
        setShowFilters(true);
      } catch {
        handleError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    getPeopleFromServer();
  }, []);

  function sortPeople(peopleToSort: Person[]): Person[] {
    const peopleSorted = [...peopleToSort];

    const sorting = (a: Person, b: Person): number => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]);

        case 'born':
        case 'died':
          return +a[sort] - +b[sort];

        default:
          return 0;
      }
    };

    return order === 'desc'
      ? peopleSorted.sort((a, b) => sorting(b, a))
      : peopleSorted.sort((a, b) => sorting(a, b));
  }

  function filterByQuery(person: Person) {
    if (!query) {
      return true;
    }

    const normalizedQuery = query.toLowerCase();

    return (
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery)
    );
  }

  function filterByCentury(person: Person) {
    if (centuries.length === 0) {
      return true;
    }

    return centuries.includes(Math.ceil(person.born / 100).toString());
  }

  function filterBySex(person: Person) {
    if (!sex) {
      return true;
    }

    return person.sex === sex;
  }

  const getPreparedPeople = () => {
    const peopleByQuery = people.filter(filterByQuery);
    const peopleByCentury = peopleByQuery.filter(filterByCentury);
    const peopleBySex = peopleByCentury.filter(filterBySex);

    const sortedPeople = sortPeople(peopleBySex);

    return sortedPeople;
  };

  const preparedPeople = getPreparedPeople();

  return (
    <>
      <div className="column">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!preparedPeople.length && !loading && (
            <p>There are no people matching the current search criteria</p>
          )}

          {preparedPeople.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {sortFilters.map((filter, index) => (
                    <th key={index}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {filter}
                        <SearchLink
                          params={getSortParams(filter.toLowerCase())}
                        >
                          <span className="icon">
                            <i
                              className={
                                'fas ' +
                                (sort === filter.toLowerCase()
                                  ? order === 'desc'
                                    ? 'fa-sort-down'
                                    : 'fa-sort-up'
                                  : 'fa-sort')
                              }
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
                {preparedPeople.map((person: Person) => (
                  <PersonLink key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
