import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PersonType } from '../types';
import { getPeople } from '../api';

const peopleOnServer = (people: PersonType[]) => {
  return people.map(person => {
    const mother = people.find(pers => pers.name === person.motherName);
    const father = people.find(pers => pers.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleOnServer)
      .then(preparedPeople => setPeople(preparedPeople))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = () => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.trim().toLocaleLowerCase();
    const centuries = searchParams.getAll('centuries');
    let prepared = [...people];

    if (query) {
      prepared = prepared.filter(elem => elem.name.toLowerCase()
        .includes(query)
        || elem.motherName?.toLowerCase().includes(query)
        || elem.fatherName?.toLowerCase().includes(query));
    }

    if (sex) {
      prepared = prepared.filter(elem => elem.sex === sex);
    }

    if (centuries && centuries.length > 0) {
      prepared = prepared.filter(elem => (
        centuries?.includes(Math.ceil(elem.born / 100).toString())));
    }

    if (sort) {
      switch (sort) {
        case 'name':
        {
          prepared.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }

        case 'sex':
        {
          prepared.sort((a, b) => a.sex.localeCompare(b.sex));
          break;
        }

        case 'born': {
          prepared.sort((a, b) => a.born - b.born);
          break;
        }

        case 'died': {
          prepared.sort((a, b) => a.died - b.died);
          break;
        }

        default:
      }
    }

    if (order) {
      prepared.reverse();
    }

    return prepared;
  };

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
              {loading && (
                <Loader />
              )}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!preparedPeople().length && !loading) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && (
                <PeopleTable people={preparedPeople()} Slug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
