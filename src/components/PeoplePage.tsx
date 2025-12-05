import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Loader } from '../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [searchParams] = useSearchParams();

  function applyFilters(peopleList: Person[]) {
    let filteredPeople = [...peopleList];

    const query = searchParams.get('query') || '';
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      filteredPeople.sort((a, b) => {
        let compare = 0;

        if (a[sort as keyof Person] < b[sort as keyof Person]) {
          compare = -1;
        } else if (a[sort as keyof Person] > b[sort as keyof Person]) {
          compare = 1;
        }

        return order === 'desc' ? compare * -1 : compare;
      });
    }

    if (query) {
      filteredPeople = filteredPeople.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const birthCentury = Math.ceil(person.born / 100).toString();

        return centuries.includes(birthCentury);
      });
    }

    return filteredPeople;
  }

  const visiblePeople = applyFilters(people);

  function loadPeople() {
    setLoading(true);
    setErrorMessage('');
    setIsErrorVisible(false);
    getPeople()
      .then(data => {
        setPeople(data);

        if (data.length === 0) {
          setErrorMessage('There are no people on the server');
          setIsErrorVisible(true);
          setTimeout(() => setIsErrorVisible(false), 4000);
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setIsErrorVisible(true);
        setTimeout(() => setIsErrorVisible(false), 4000);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable people={visiblePeople} loading={loading} />
            </div>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && isErrorVisible && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isErrorVisible && people.length === 0 && (
            <p data-cy="noPeopleMessage">{errorMessage}</p>
          )}

          {isErrorVisible && people.length > 0 && <p>{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};
