/* eslint-disable max-len */
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getParent } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();

  const currentCenturies = searchParams.getAll('centuries') || [];
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      getPeople()
        .then((data) => {
          setPersons(data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }, 300);
  }, []);

  const preparedPeople: Person[] = persons.map(person => {
    const mother = person.motherName
      ? getParent(person.motherName, persons) : undefined;
    const father = person.fatherName
      ? getParent(person.fatherName, persons) : undefined;

    return {
      ...person,
      mother,
      father,
    };
  });

  const sortPersons = preparedPeople.sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return order === 'desc'
          ? b[sort].localeCompare(a[sort])
          : a[sort].localeCompare(b[sort]);
      case 'born':
      case 'died':
        return order === 'desc'
          ? b[sort] - a[sort]
          : a[sort] - b[sort];
      default:
        return 0;
    }
  });

  const filteredAndSortedPersons = (preparingFilterPersons: Person[]) => {
    let includedPersons = preparingFilterPersons;

    if (currentQuery) {
      const someQuery = currentQuery.toLowerCase();

      includedPersons = includedPersons.filter(person => {
        const { name, fatherName, motherName } = person;

        return [name, fatherName, motherName].some(words => {
          return words && words.toLowerCase().includes(someQuery);
        });
      });
    }

    if (currentSex) {
      includedPersons = includedPersons.filter(person => {
        return person.sex === currentSex;
      });
    }

    if (currentCenturies.length > 0) {
      includedPersons = includedPersons.filter(person => {
        const century = Math.ceil(person.born / 100);

        return currentCenturies.includes(century.toString());
      });
    }

    return includedPersons;
  };

  const filteredPersons = filteredAndSortedPersons(sortPersons);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loader ? (
                <Loader />
              ) : (
                <>
                  {persons.length === 0 ? (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  ) : (
                    <>
                      {filteredPersons.length === 0 ? (
                        <p>There are no people matching the current search criteria</p>
                      ) : (
                        <PeopleTable
                          personSlug={personSlug}
                          persons={filteredPersons}
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
