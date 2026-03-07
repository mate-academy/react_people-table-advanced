// import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from '../Pages/PeopleTable';
import { Loader } from '../components/Loader';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setErrorMessage('');

    getPeople()
      .then(people => {
        const modifyPersons = people.map(person => {
          const motherPerson = people.find(
            peop => peop.name === person.motherName,
          );
          const fatherPerson = people.find(
            peop => peop.name === person.fatherName,
          );

          const copyPerson = { ...person };

          if (motherPerson) {
            copyPerson.mother = { ...motherPerson };
          }

          if (fatherPerson) {
            copyPerson.father = { ...fatherPerson };
          }

          return copyPerson;
        });

        setPersons(modifyPersons);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoader(false));
  }, []);

  const preparePersons = useMemo(() => {
    const order = searchParams.get('order');
    const sort = searchParams.get('sort') as keyof Person;
    const sex = searchParams.get('sex');
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries') || [];
    let newListPersons = [...persons];

    function callbackSort(a: Person, b: Person) {
      const elA = a[sort];
      const elB = b[sort];

      if (typeof elA === 'string' && typeof elB === 'string') {
        return order ? elB.localeCompare(elA) : elA.localeCompare(elB);
      } else {
        return order
          ? (elB as number) - (elA as number)
          : (elA as number) - (elB as number);
      }
    }

    if (sort) {
      newListPersons.sort(callbackSort);
    }

    if (sex) {
      newListPersons = newListPersons.filter(person => person.sex === sex);
    }

    if (query) {
      newListPersons = newListPersons.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query.toLowerCase())) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query.toLowerCase())),
      );
    }

    if (centuries.length !== 0) {
      const filteredByCenturies: Person[] = [];

      centuries.forEach(century => {
        filteredByCenturies.push(
          ...newListPersons.filter(
            person => Math.ceil(person.born / 100) === +century,
          ),
        );
      });

      newListPersons = [...filteredByCenturies];
    }

    return newListPersons;
  }, [persons, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {persons.length !== 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {persons.length === 0 && !errorMessage && !loader && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {persons.length > 0 && preparePersons.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {persons.length > 0 && preparePersons.length > 0 && (
                <PeopleTable persons={preparePersons} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
