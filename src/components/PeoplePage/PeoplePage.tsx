import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';

import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoad, setIsLoad] = useState(true);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [problemServer, setProblemServer] = useState(false);

  const [search] = useSearchParams();

  const prepared = useMemo(() => {
    const sex = search.get('sex');
    const query = search.get('query');
    const currentCenturies = search.getAll('century');
    const curentSort = search.get('sort');
    const curentOrder = search.get('order');

    let filtered = [...people];

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (currentCenturies.length > 0) {
      filtered = filtered.filter(person => {
        if (!person.born || !person.died) {
          return false;
        }

        const centuryBorn = Math.ceil(person.born / 100);
        const centuryDied = Math.ceil(person.died / 100);

        for (let c = centuryBorn; c <= centuryDied; c++) {
          if (currentCenturies.includes(c.toString())) {
            return true;
          }
        }

        return false;
      });
    }




    switch (curentSort) {


      case 'name':

        filtered.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        );

        break;




      case 'sex':
        filtered.sort((a, b) => a.sex.localeCompare(b.sex));

        break;

      case 'born':
        filtered.sort((a, b) => a.born - b.born);

        break;

      case 'died':

        filtered.sort((a, b) => a.died - b.died);

        break;






    }



    if (curentOrder === 'desc') {
      filtered.reverse()
    };



    return filtered;
  }, [people, search]);

  useEffect(() => {
    getPeople()
      .then(resp => {
        setPeople(resp);
        setIsLoad(false);
      })

      .catch(() => {
        setIsLoad(false);
        setProblemServer(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoad ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                {problemServer ? (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                ) : people.length === 0 ? (
                  <>
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  </>
                ) : prepared.length !== 0 ? (
                  <PeopleTable people={prepared} />
                ) : (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
