import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ErrorOption, Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { SearchLink } from './SearchLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOption, setErrorOption] = useState(ErrorOption.noError);
  const PEOPLE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const resetAll = () => {
    return {
      centuries: null,
      query: null,
      sex: null,
      sort: null,
      order: null,
    };
  };

  const getCentury = (bornYear: number) => Math.ceil(bornYear / 100);

  const generateClass = (sortBy: string) => {
    return cn('fas fa-sort', {
      'fa-sort-up': sort === sortBy && !order,
      'fa-sort-down': sort === sortBy && order,
    });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturiesChange = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter((c) => c !== century)
      : [...centuries, century];
  };

  const handleSortChange = (sortBy: string) => {
    let result;

    if (sort === sortBy && order === 'desc') {
      result = { sort: null, order: null };
    } else if (sort !== sortBy && order !== 'desc') {
      result = { sort: sortBy, order: null };
    } else if (sort !== sortBy && order === 'desc') {
      result = { sort: sortBy, order: null };
    } else {
      result = { sort: sortBy, order: 'desc' };
    }

    return result;
  };

  const filteredPeople = useMemo(() => {
    const filteredByQuery = query
      ? people.filter((person) => {
        const { name, motherName, fatherName } = person;

        return (
          name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          || motherName?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          || fatherName?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      })
      : people;

    const filteredBySex = sex
      ? filteredByQuery.filter((person) => person.sex === sex)
      : filteredByQuery;

    const filteredByCenturies = centuries.length
      ? filteredBySex.filter((person) => centuries
        .includes(String(getCentury(person.born))))
      : filteredBySex;

    return filteredByCenturies;
  }, [query, people, sex, centuries]);

  const filteredAndSortedPeople = useMemo(() => {
    const sortedPeople = sort
      ? [...filteredPeople].sort((a, b) => {
        switch (sort) {
          case 'name':
            return !order
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          case 'sex':
            return !order
              ? a.sex.localeCompare(b.sex)
              : b.sex.localeCompare(a.sex);
          case 'born':
            return !order ? a.born - b.born : b.born - a.born;
          case 'died':
            return !order ? a.died - b.died : b.died - a.died;
          default:
            return 0;
        }
      })
      : filteredPeople;

    return sortedPeople;
  }, [sort, order, filteredPeople]);

  useEffect(() => {
    setIsLoading(true);
    fetch(PEOPLE_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data.length) {
          setErrorOption(ErrorOption.Empty);
        }

        setPeople(data);
      })
      .catch(() => setErrorOption(ErrorOption.Wrong))
      .finally(() => setIsLoading(false));
  }, []);

  const getParentLink = (parentName: string) => {
    return people.find((person) => person.name === parentName);
  };

  return (
    <>
      {people.map((person) => (
        <p key={person.slug}>{person.mother?.slug}</p>
      ))}
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {!isLoading && errorOption === ErrorOption.noError && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                handleQueryChange={handleQueryChange}
                sex={sex}
                centuries={centuries}
                handleCenturiesChange={handleCenturiesChange}
                resetAll={resetAll}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                {isLoading && errorOption === ErrorOption.noError && <Loader />}
                {!isLoading && errorOption === ErrorOption.noError && (
                  <table
                    data-cy="peopleTable"
                    className="table is-striped
                   is-hoverable is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Name
                            <SearchLink params={handleSortChange('name')}>
                              <span className="icon">
                                <i className={generateClass('name')} />
                              </span>
                            </SearchLink>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Sex
                            <SearchLink params={handleSortChange('sex')}>
                              <span className="icon">
                                <i className={generateClass('sex')} />
                              </span>
                            </SearchLink>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Born
                            <SearchLink params={handleSortChange('born')}>
                              <span className="icon">
                                <i className={generateClass('born')} />
                              </span>
                            </SearchLink>
                          </span>
                        </th>

                        <th>
                          <span className="is-flex is-flex-wrap-nowrap">
                            Died
                            <SearchLink params={handleSortChange('died')}>
                              <span className="icon">
                                <i className={generateClass('died')} />
                              </span>
                            </SearchLink>
                          </span>
                        </th>
                        <th>Mother</th>
                        <th>Father</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPeople.length && filteredAndSortedPeople
                        .map((person: Person) => (
                          <PeopleTable
                            key={person.slug}
                            person={person}
                            getParentLink={getParentLink}
                          />
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {errorOption === ErrorOption.Empty && !isLoading && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {errorOption === ErrorOption.Wrong && !isLoading && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </>
  );
};
