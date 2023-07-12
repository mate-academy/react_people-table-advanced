import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';

  const getNewSearchParams = (text: string) => {
    if (sort !== text && order === '') {
      return { sort: text, order: null };
    }

    if (sort === text && order === '') {
      return { sort: text, order: 'desc' };
    }

    if (sort !== text && 'desc') {
      return { sort: text, order: null };
    }

    return { sort: null, order: null };
  };

  const sortInfo = ['Name', 'Sex', 'Born', 'Died'];

  const getPreparedPeople = (loadedPeople: Person[]) => {
    return loadedPeople.map(person => {
      return {
        ...person,
        mother: people
          .find(person1 => person1.name === person.motherName),
        father: people
          .find(person1 => person1.name === person.fatherName),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setLoadingError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const getSortedPeople = (startPeople: Person[]) => {
    let updatedPeople = startPeople;

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          updatedPeople = updatedPeople.sort((person1, person2) => (
            person1[sort].toLowerCase()
              .localeCompare(person2[sort].toLowerCase())
          ));
          break;

        case 'born':
        case 'died':
          updatedPeople = updatedPeople.sort((person1, person2) => (
            person1[sort] - person2[sort]
          ));
          break;

        default:
          break;
      }
    }

    if (order) {
      return updatedPeople.reverse();
    }

    return updatedPeople;
  };

  const getFilteredPeople = (sortedPeople: Person[]) => {
    let updatedPeople = sortedPeople;

    if (query) {
      updatedPeople = updatedPeople.filter(person => person.name.toLowerCase()
        .includes(query.toLowerCase()));
    }

    if (centuries.length > 0) {
      updatedPeople = updatedPeople.filter(person => centuries
        .includes(`${Math.ceil(person.born / 100)}`));
    }

    if (sex) {
      updatedPeople = updatedPeople.filter(person => person.sex === sex);
    }

    return updatedPeople;
  };

  const preparedPeople = getPreparedPeople(people);
  const sortedPeople = getSortedPeople(preparedPeople);
  const visiblePeople = getFilteredPeople(sortedPeople);

  const emptyData = isLoaded && people.length < 1 && !loadingError;
  const failedFetch = loadingError;

  return (
    <div className="block">
      <div className="box table-container">

        {failedFetch && (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        )}

        {emptyData && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {(isLoaded && visiblePeople.length < 1) && (
          <p>There are no people matching the current search criteria</p>
        )}
        {!isLoaded ? <Loader /> : visiblePeople.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {sortInfo.map(element => (
                  <th key={element}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {element}
                      <SearchLink
                        params={
                          getNewSearchParams(element.toLowerCase())
                        }
                      >
                        <span className="icon">
                          <i className={cn('fas', {
                            'fa-sort': sort !== element.toLowerCase(),
                            'fa-sort-up': sort === element.toLowerCase()
                            && !order,
                            'fa-sort-down': sort === element.toLowerCase()
                            && order,
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
              {visiblePeople.map(person => (
                <PersonRow
                  key={person.slug}
                  person={person}
                />
              ))}

            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};
