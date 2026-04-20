import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const [selectedPersonName, setSelectedPersonName] = useState<string>('');

  const [loader, setLoader] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const checker = !errorMessage && !loader;

  useEffect(() => {
    async function fetchData() {
      setErrorMessage(null);

      try {
        setLoader(true);
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch {
        setErrorMessage('Something went wrong. Please try again later.');
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!slug || people.length === 0) {
      return;
    }

    const person = people.find(p => p.slug === slug);

    if (person) {
      setSelectedPersonName(person.name);
    } else {
      setSelectedPersonName('');
    }
  }, [slug, people]);

  const centuriesKey = useMemo(() => centuries?.join(',') || '', [centuries]);

  useEffect(() => {
    if (people.length !== 0) {
      let fp = [...people];
      const multiplier = order === 'desc' ? -1 : 1;

      if (sex !== null) {
        fp = fp.filter(person => person.sex === sex);
      }

      if (centuriesKey && centuriesKey.length > 0) {
        fp = fp.filter(person => {
          const cent = Math.floor((person.born - 1) / 100) + 1;

          return centuriesKey.includes(cent.toString());
        });
      }

      if (query !== null) {
        fp = fp.filter(person => {
          if (person.name.toLowerCase().includes(query.toLowerCase())) {
            return person;
          } else if (
            person.fatherName?.toLowerCase().includes(query.toLowerCase())
          ) {
            return person;
          } else if (
            person.motherName?.toLowerCase().includes(query.toLowerCase())
          ) {
            return person;
          } else {
            return false;
          }
        });
      }

      switch (sort) {
        case 'name':
          fp.sort((p1, p2) => p1.name.localeCompare(p2.name) * multiplier);
          break;

        case 'sex':
          fp.sort((p1, p2) => p1.sex.localeCompare(p2.sex) * multiplier);
          break;

        case 'born':
          fp.sort((p1, p2) => (p1.born - p2.born) * multiplier);
          break;

        case 'died':
          fp.sort((p1, p2) => (p1.died - p2.died) * multiplier);
          break;
      }

      setFilteredPeople(fp);
    }
  }, [people, sort, query, order, sex, centuriesKey]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {checker && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && checker && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && filteredPeople.length === 0 && checker && (
                <p>
                  {' '}
                  There are no people matching the current search criteria{' '}
                </p>
              )}

              {filteredPeople.length > 0 && checker && (
                <PeopleTable
                  people={filteredPeople}
                  selected={selectedPersonName}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
