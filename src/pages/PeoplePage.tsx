import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [userData, setUserData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || null;
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleQueryChange = (stringQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (stringQuery.trim()) {
      params.set('query', stringQuery);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        const aggregatedPeopleData = data.map((person: Person) => {
          let mother = null;
          let father = null;

          if (person.motherName) {
            mother =
              data.find(
                (personMother: Person) =>
                  personMother.name === person.motherName,
              ) || null;
          }

          if (person.fatherName) {
            father =
              data.find(
                (personFather: Person) =>
                  personFather.name === person.fatherName,
              ) || null;
          }

          return {
            ...person,
            father,
            mother,
          } as Person;
        });

        setUserData(aggregatedPeopleData);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCenturyToggle = (century: string) => {
    const params = new URLSearchParams(searchParams);

    const selectedCenturies = params.getAll('centuries');

    params.delete('centuries');

    if (selectedCenturies.includes(century)) {
      selectedCenturies
        .filter(item => item !== century)
        .forEach(item => params.append('centuries', item));
    } else {
      [...selectedCenturies, century].forEach(item =>
        params.append('centuries', item),
      );
    }

    setSearchParams(params);
  };

  const handleAllCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  const handleSexChange = (selectedSex: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (selectedSex) {
      params.set('sex', selectedSex);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  let preparedPeopleData = [...userData];

  if (query) {
    preparedPeopleData = preparedPeopleData.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (sex) {
    preparedPeopleData = preparedPeopleData.filter(
      person => person.sex === sex,
    );
  }

  if (centuries.length) {
    preparedPeopleData = preparedPeopleData.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    preparedPeopleData.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);

        case 'sex':
          return a.sex.localeCompare(b.sex);

        case 'born':
          return a.born - b.born;

        case 'died':
          return a.died - b.died;

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      preparedPeopleData.reverse();
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !!userData.length && (
              <PeopleFilters
                handleQueryChange={handleQueryChange}
                handleCenturyToggle={handleCenturyToggle}
                handleAllCenturies={handleAllCenturies}
                handleSexChange={handleSexChange}
                selectedCenturies={centuries}
                selectedSex={sex}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !userData.length && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && !preparedPeopleData.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!userData.length && (
                <PeopleTable
                  preparedPeopleData={preparedPeopleData}
                  sort={sort}
                  order={order}
                  handleSort={handleSort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
