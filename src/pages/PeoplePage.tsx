import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    getPeople()
      .then((data) => setPeople(data))
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const { personId } = useParams<{ personId: string }>();

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (errorMessage) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      );
    }

    if (people.length === 0) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    return <PeopleTable people={people} selectedPersonSlug={personId || ''} />;
  };

  return (
    <div className="section">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
