import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Error } from './Error';
import { NoPeople } from './NoPeople';
import { NoFilteredPeople } from './NoFilteredPeople';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const peopleFromServer = await getPeople().then(response => response);

        const preparedPeople = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            someone => someone.name === person.motherName,
          );
          const father = peopleFromServer.find(
            someone => someone.name === person.fatherName,
          );

          return { ...person, mother: mother, father: father };
        });

        setPeople(preparedPeople);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const filteredPeople = people.filter(person => {
    const isSexMatch = !sex || person.sex === sex;
    const isCenturyMatch =
      !centuries.length ||
      centuries.includes(Math.ceil(person.born / 100).toString());
    const trimmedQuery = query?.trim().toLowerCase();

    if (trimmedQuery) {
      const motherName = person.mother?.name || person.motherName || '';
      const fatherName = person.father?.name || person.fatherName || '';

      const isNameMatch =
        person.name.toLowerCase().includes(trimmedQuery) ||
        motherName.toLowerCase().includes(trimmedQuery) ||
        fatherName.toLowerCase().includes(trimmedQuery);

      return isSexMatch && isCenturyMatch && isNameMatch;
    }

    return isSexMatch && isCenturyMatch;
  });

  const hasNoPeople = !isLoading && !people.length && !error;
  const hasFilterMessage = !filteredPeople.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && <Error />}

              {hasNoPeople && <NoPeople />}

              {hasFilterMessage && <NoFilteredPeople />}

              {!isLoading && !hasFilterMessage && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
