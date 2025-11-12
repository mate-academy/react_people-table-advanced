import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      );
    }

    if (people.length === 0) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PeopleTable people={people} selectedSlug={slug} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns is-desktop is-flex-direction-row-reverse">
        <div className="column is-7-tablet is-narrow-desktop">
          {!loading && !error && <PeopleFilters />}
        </div>
        <div className="column box table-container">{renderContent()}</div>
      </div>
    </>
  );
};
