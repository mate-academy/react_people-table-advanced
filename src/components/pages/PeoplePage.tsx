import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';

import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centryParams = searchParams.getAll('centry') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { personId } = useParams();
  const selectedPerson = personId;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(res => {
        setPeople(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const prepPeople = people.map(person => {
    const mother = people.find(
      somePerson => somePerson.name === person.motherName,
    );
    const father = people.find(
      somePerson => somePerson.name === person.fatherName,
    );

    return { ...person, mother, father };
  });

  const amountCentry = (born: number) => {
    const centryOfBorn = Math.ceil(born / 100);

    return centryOfBorn.toString();
  };

  const sortedPeople = useMemo(() => {
    return prepPeople.sort((onePerson, secondPerson) => {
      if (order === 'desc') {
        switch (sort) {
          case 'name':
            return secondPerson.name.localeCompare(onePerson.name);
          case 'sex':
            return secondPerson.sex.localeCompare(onePerson.sex);
          case 'born':
            return secondPerson.born - onePerson.born;
          case 'died':
            return secondPerson.died - onePerson.died;
          default:
            return 0;
        }
      } else if (sort) {
        switch (sort) {
          case 'name':
            return onePerson.name.localeCompare(secondPerson.name);
          case 'sex':
            return onePerson.sex.localeCompare(secondPerson.sex);
          case 'born':
            return onePerson.born - secondPerson.born;
          case 'died':
            return onePerson.died - secondPerson.died;
          default:
            return 0;
        }
      } else {
        return 0;
      }
    });
  }, [prepPeople, sort, order]);

  const filteredPeople = useMemo(() => {
    return sortedPeople.filter(
      person =>
        (person.name.toLocaleLowerCase().includes(query.toLowerCase().trim()) ||
          person.fatherName
            ?.toLowerCase()
            .includes(query.toLowerCase().trim()) ||
          person.motherName
            ?.toLowerCase()
            .includes(query.toLowerCase().trim())) &&
        (!sex || person.sex === sex) &&
        (centryParams.length === 0 ||
          centryParams.includes(amountCentry(person.born))),
    );
  }, [sortedPeople, query, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                query={query}
                sex={sex}
                centryParams={centryParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length === 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && filteredPeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && filteredPeople.length > 0 && (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  selectedPerson={selectedPerson}
                  order={order}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
