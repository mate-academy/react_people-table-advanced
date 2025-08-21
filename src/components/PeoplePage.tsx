import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const handlePeopleLoading = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        if (!response.ok) {
          await new Promise(resolve => setTimeout(resolve, 50));
          throw new Error('Failed to fetch');
        }

        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        setPeople(
          data.map((person: Person) => ({
            ...person,
            mother: data.find((p: Person) => p.name === person.motherName),
            father: data.find((p: Person) => p.name === person.fatherName),
          })),
        );
      } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setHasErrorMessage(true);
      } finally {
        setIsLoading(false);
      }
    };

    handlePeopleLoading();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && hasErrorMessage && (
          <p data-cy="peopleLoadingError">Something went wrong</p>
        )}

        {!isLoading && !hasErrorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !hasErrorMessage && people.length > 0 && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable people={people} selectedSlug={slug} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
