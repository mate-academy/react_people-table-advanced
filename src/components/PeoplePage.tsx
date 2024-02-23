import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [selectedCenturies, setSelectedCenturies] = useState<number[]>([]);
  const [sortArrows, setSortArrows] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const [sexOption, setSexOption] = useState('All');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const includesQuery = (personName: string | null, input: string) => {
    return personName
      ?.trim()
      .toLowerCase()
      .includes(input.trim().toLowerCase());
  };

  const getPreparedPeople = (initPeople: Person[], params: any) => {
    let preparedPeople = [...initPeople];

    if (params.sex) {
      preparedPeople = preparedPeople.filter(person => {
        if (params.sex === 'f') {
          return person.sex === 'f';
        }

        if (params.sex === 'm') {
          return person.sex === 'm';
        }

        return person;
      });
    }

    if (params.centuries) {
      preparedPeople = preparedPeople.filter(person => {
        const birthYear = person.born || 0;
        const century = Math.ceil(birthYear / 100);

        return selectedCenturies.includes(century);
      });
    }

    if (params.query) {
      preparedPeople = preparedPeople.filter(person => {
        const nameMatch = includesQuery(person.name, params.query);
        const motherMatch = includesQuery(person?.motherName, params.query);
        const fatherMatch = includesQuery(person?.fatherName, params.query);

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    if (params.sort) {
      return preparedPeople.sort((a, b) => {
        switch (params.sort) {
          case 'name':
            return params.order === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name);
          case 'sex':
            return params.order === 'desc'
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex);
          case 'born':
            return params.order === 'desc' ? b.born - a.born : a.born - b.born;
          case 'died':
            return params.order === 'desc' ? b.died - a.died : a.died - b.died;
          default:
            return 0;
        }
      });
    }

    return preparedPeople;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const handleSexChange = (chosenSex: string) => {
    setSexOption(chosenSex);
    const params = new URLSearchParams(searchParams);

    params.delete('sex');

    if (chosenSex === 'Female') {
      params.set('sex', 'f');
    } else if (chosenSex === 'Male') {
      params.set('sex', 'm');
    }

    setSearchParams(params);
  };

  const toggleCentury = (num: string) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(num)
      ? centuries.filter(century => century !== num)
      : [...centuries, num];

    setSelectedCenturies(
      newCenturies.map(newCentury => parseInt(newCentury, 10)),
    );

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', century));
    setSearchParams(params);
  };

  const toggleAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const handleDeleteParams = () => {
    setSearchParams({
      centuries: [],
      sex: '',
      query: '',
    });
  };

  const handleSorting = (
    event: React.MouseEvent<HTMLAnchorElement>,
    category: string,
  ) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);

    if (sort === '' && order === '') {
      params.set('sort', category);
      setSortArrows('up');
    } else if (sort === category && order !== 'desc') {
      params.delete('sort');
      params.set('sort', category);
      params.set('order', 'desc');
      setSortArrows('down');
    } else if (order === 'desc') {
      params.delete('sort');
      params.delete('order');
      setSortArrows('');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setErrorMessage(false);
    setloader(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setloader(false));
  }, []);

  const visiblePeople = getPreparedPeople(
    people,
    Object.fromEntries(searchParams),
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && !errorMessage && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                query={query}
                centuries={centuries}
                sexOption={sexOption}
                handleQueryChange={handleQueryChange}
                handleSexChange={handleSexChange}
                toggleCentury={toggleCentury}
                toggleAllCenturies={toggleAllCenturies}
                handleDeleteParams={handleDeleteParams}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorMessage && !loader && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !loader && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!loader && !errorMessage && people.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  handleSorting={handleSorting}
                  sortArrows={sortArrows}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
