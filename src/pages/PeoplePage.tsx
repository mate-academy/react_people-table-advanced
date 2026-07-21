import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const selectedSex = searchParams.get('sex');
  let filteredPeople = people;

  if (selectedSex) {
    filteredPeople = people.filter(person => person.sex === selectedSex);
  }

  const query = searchParams.get('query');

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  const selectedCenturies = searchParams.getAll('centuries');

  if (selectedCenturies.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return selectedCenturies.includes(String(century));
    });
  }

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  if (sort === 'name') {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      const result = a.name.localeCompare(b.name);

      return order === 'desc' ? -result : result;
    });
  }

  if (sort === 'sex') {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      const result = a.sex.localeCompare(b.sex);

      return order === 'desc' ? -result : result;
    });
  }

  if (sort === 'born') {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      const result = a.born - b.born;

      return order === 'desc' ? -result : result;
    });
  }

  if (sort === 'died') {
    filteredPeople = [...filteredPeople].sort((a, b) => {
      const result = a.died - b.died;

      return order === 'desc' ? -result : result;
    });
  }

  const content = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (people.length === 0) {
      return (
        <p data-cy="noPeopleMessage"> There are no people on the server</p>
      );
    }

    return <PeopleTable people={filteredPeople} selectedSlug={slug} />;
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
        {content()}
      </div>
    </div>
  );
};
