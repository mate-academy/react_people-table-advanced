import React, { useContext } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';
import { PeopleContext } from '../context/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { people, loading, error } = useContext(PeopleContext);
  const { slug } = useParams<{ slug?: string }>();

  const selectedPerson = people.find(p => p.slug === slug);

  const selectedPersonSlug = selectedPerson ? selectedPerson.slug : undefined;
  const peopleMap = new Map(people.map(p => [p.name, p]));

  if (loading) {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        </div>
      </main>
    );
  }

  if (!people.length) {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <PeopleTable
          people={people}
          highlightedSlug={selectedPersonSlug}
          peopleMap={peopleMap}
        />
      </div>
    </main>
  );
};
