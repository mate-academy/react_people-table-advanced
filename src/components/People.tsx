import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonInfo } from './PersonInfo';
import { PeopleFilters } from './PeopleFilters';
import { SortTypes } from '../types/SortTypes';

function sortAndFilter(
  people: Person[],
  sortColumn: SortTypes,
  sortIsReverse: boolean,
  filterSex: string,
  filterCentury: string[],
  filterQuery: string,
) {
  const newPeople = people
    .filter((p) => (p.sex === filterSex || filterSex === 'All')
    && (filterCentury
      .includes(Math.ceil(p.born / 100).toString())
      || filterCentury.length === 0)
    && (p.name.toLowerCase().includes(filterQuery.toLowerCase())
    || p.motherName?.toLowerCase().includes(filterQuery.toLowerCase())
    || p.fatherName?.toLowerCase().includes(filterQuery.toLowerCase())));

  switch (sortColumn) {
    case 'Name':
      newPeople.sort((p1, p2) => p1.name.localeCompare(p2.name));
      break;
    case 'Sex':
      newPeople.sort((p1, p2) => p1.sex.localeCompare(p2.sex));
      break;
    case 'Born':
      newPeople.sort((p1, p2) => p1.born - p2.born);
      break;
    case 'Died':
      newPeople.sort((p1, p2) => p1.died - p2.died);
      break;
    default:
      break;
  }

  if (sortIsReverse === true) {
    newPeople.reverse();
  }

  return newPeople;
}

export const People = () => {
  const [loadingDone, setLoadingDone] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<SortTypes>('None');
  const [sortIsReverse, setSortIsReverse] = useState(false);
  const [filterSex, setFilterSex] = useState<'All' | 'Male' | 'Female'>('All');
  const [filterCentury, setFilterCentury]
  = useState<'16' | '17' | '18' | '19' | '20'[]>([]);
  const [filterQuery, setFilterQuery] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const newPeople = peopleFromServer.map(person => {
          const newPerson = { ...person };

          newPerson.mother = peopleFromServer
            .find(p => p.name === person.motherName);

          newPerson.father = peopleFromServer
            .find(p => p.name === person.fatherName);

          return newPerson;
        });

        setPeople(newPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoadingDone(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loadingDone && <Loader />}
          <div className="column is-7-tablet is-narrow-desktop">
            {loadingDone && <PeopleFilters />}
          </div>
          <div className="box table-container">
            {errorMessage
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}
            {loadingDone && (people.length === 0 ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ) : (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Name
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Sex
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Born
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </span>
                    </th>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Died
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </span>
                    </th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map(person => {
                    return (
                      <PersonInfo
                        person={person}
                        key={person.slug}
                      />
                    );
                  })}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
