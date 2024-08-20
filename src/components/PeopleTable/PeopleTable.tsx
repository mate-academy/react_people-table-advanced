import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonItem } from '../PersonItem';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';
import {
  filterByCentury,
  filterByQuery,
  filterBySex,
  sortPeople,
} from '../../utils/filterFunctions';

type Props = {
  setShowFilters: (arg: boolean) => void;
};

const sortFilters = ['Name', 'Sex', 'Born', 'Died'];

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

  const preparedPeople = useMemo(() => {
    const peopleByQuery = people.filter(person => filterByQuery(person, query));
    const peopleByCentury = peopleByQuery.filter(person =>
      filterByCentury(person, centuries),
    );
    const peopleBySex = peopleByCentury.filter(person =>
      filterBySex(person, sex),
    );

    const sortedPeople = sortPeople(peopleBySex, sort, order);

    return sortedPeople;
  }, [query, sex, centuries, sort, order, people]);

  return (
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
                      <SearchLink params={getSortParams(filter.toLowerCase())}>
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
                <PersonItem key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
