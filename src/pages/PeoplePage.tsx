import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const personsFromServer = await getPeople();

      const findParent = (parentName: string | null) => (
        personsFromServer.find(parent => parent.name === parentName)
      );

      setPersons(personsFromServer.map(person => ({
        ...person,
        mother: findParent(person.motherName),
        father: findParent(person.fatherName),
      })));
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPersons = persons
    .filter(({
      name, fatherName, motherName, sex: personSex, born,
    }) => {
      const isIncludeQuery = (value: string | null) => {
        return value?.toLowerCase().includes(query.toLowerCase());
      };

      const hasQuery = isIncludeQuery(name)
        || isIncludeQuery(fatherName)
        || isIncludeQuery(motherName);

      const hasSex = sex ? sex === personSex : personSex;

      const hasCentury = centuries.length
        ? centuries.includes(Math.ceil(born / 100).toString())
        : born;

      return hasQuery && hasSex && hasCentury;
    });

  const sortedPersons = [...filteredPersons].sort((p1, p2) => {
    switch (sort) {
      case 'name':
        return p1.name.localeCompare(p2.name);

      case 'sex':
        return p1.sex.localeCompare(p2.sex);

      case 'born':
        return p1.born - p2.born;

      case 'died':
        return p1.died - p2.died;

      default:
        return 0;
    }
  });

  const personsOnTable = order ? sortedPersons.reverse() : sortedPersons;

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {persons.length > 0 && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {filteredPersons.length > 0
                && !isLoading
                && <PeopleTable people={personsOnTable} />}

              {persons.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPersons.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
