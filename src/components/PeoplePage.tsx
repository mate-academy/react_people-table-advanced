import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const peopleWithParents = people.reduce((newPeople: Person[], person) => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    const updatedPerson = {
      ...person,
      mother,
      father,
    };

    newPeople.push(updatedPerson);

    return newPeople;
  }, []);

  const filteredAndSortedPeople = getFilteredPeople(peopleWithParents, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);
    setVisible(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
        setVisible(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {visible && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !errorMessage && people && (
                <PeopleTable people={filteredAndSortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
