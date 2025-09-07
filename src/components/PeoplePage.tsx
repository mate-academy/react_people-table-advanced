import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import ErrorMessage from './ErrorMessage';
import PeopleFilters from './PeopleFilters';
import PeopleTable from './PeopleTable';

export function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch('/api/people.json')
      .then(res => res.json())
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!people.length) {
    return <p>No people found</p>;
  }

  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <PeopleFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <div className="column">
        <PeopleTable
          people={people}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
}
