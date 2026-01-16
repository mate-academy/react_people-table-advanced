import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(data => {
        setPeople(data);
        setFilteredPeople(data);
      })
      .catch(() => setError('Failed to load people'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="block">
        <div className="box table-container">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="block">
        <div className="box table-container">
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          {!loading && !error && people.length > 0 && (
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters people={people} onFiltered={setFilteredPeople} />
              </div>

              <div className="column">
                <PeopleTable
                  people={filteredPeople}
                  allPeople={people}
                  selectedSlug={slug}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
