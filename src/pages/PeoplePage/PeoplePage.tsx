import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from '../../components/PeopleFilter/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [noPeopleOnServer, setNoPeopleOnServer] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(res => {
        if (!res.length) {
          return setNoPeopleOnServer(true);
        }

        setFilteredPeople(res);

        return setPeople(res);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  useEffect(() => {
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const query = searchParams.get('query');
    const sex = searchParams.get('sex');
    const centuries = searchParams.getAll('century').map(century => +century);

    if (people) {
      let newPeopleList = [...people];

      if (sex) {
        newPeopleList = newPeopleList.filter(person => person.sex === sex);
      }

      if (query) {
        newPeopleList = newPeopleList.filter(person => person.name
          .toLowerCase().includes(query));
      }

      if (centuries.length) {
        newPeopleList = newPeopleList.filter(
          person => centuries.includes(Math.ceil(person.born / 100)),
        );
      }

      if (!sort) {
        setFilteredPeople(newPeopleList);
      }

      if (sort) {
        switch (sort) {
          case 'name':
            newPeopleList = newPeopleList.sort((a, b) => a.name.toLowerCase()
              .localeCompare(b.name.toLowerCase()));
            break;

          case 'sex':
            newPeopleList = newPeopleList.sort(
              (a, b) => a.sex.localeCompare(b.sex),
            );
            break;

          case 'born':
            newPeopleList = newPeopleList.sort((a, b) => a.born - b.born);
            break;

          case 'died':
            newPeopleList = newPeopleList.sort((a, b) => a.died - b.died);
            break;

          default:
            break;
        }

        if (order) {
          newPeopleList = [...newPeopleList].reverse();
        }
      }

      setFilteredPeople(newPeopleList);
    }
  }, [searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoader && <Loader />}

              {people && people.length > 0 && (
                <PeopleTable
                  people={people}
                  filteredPeople={filteredPeople}
                />
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {filteredPeople && people && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
