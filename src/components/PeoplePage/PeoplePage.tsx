import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import './PeoplePage.scss';
import { PeopleFilter } from '../PeopleFilter';
import { PeopleSort } from '../PeopleSort';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [visiblePeople, setVisiblePeople] = useState([...people]);
  const [preparedPeople, setPreparedPeople] = useState<Person[]>(visiblePeople);
  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  const filterPeople = (newPeople: Person[]) => {
    setVisiblePeople(newPeople);
  };

  const sortPeople = (newPeople: Person[]) => {
    if (JSON.stringify(visiblePeople) !== JSON.stringify(newPeople)) {
      setPreparedPeople(newPeople);
    } else {
      setPreparedPeople(visiblePeople);
    }
  };

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const copiedPeople = peopleFromServer
          .map(p => ({ ...p }));

        copiedPeople.forEach(person => {
          Object.assign(person, {
            mother: copiedPeople.find(m => m.name === person.motherName)
              || null,
            father: copiedPeople.find(f => f.name === person.fatherName)
              || null,
          });
        });

        setPeople(copiedPeople);
      });
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      {visiblePeople.length}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-4-desktop">
            <div className="column">
              <PeopleFilter
                setSearchParams={setSearchParams}
                searchParams={searchParams}
                filterPeople={filterPeople}
                people={people}
              />
            </div>
          </div>

          <div className="column">
            <table className="table is-striped is-narrow box">
              <thead>
                <tr>
                  <th>
                    <span>Name</span>
                    <PeopleSort
                      sortPeople={sortPeople}
                      visiblePeople={visiblePeople}
                      searchParams={searchParams}
                      by="name"
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                    />
                  </th>
                  <th>
                    <span>Sex</span>
                    <PeopleSort
                      sortPeople={sortPeople}
                      visiblePeople={visiblePeople}
                      searchParams={searchParams}
                      by="sex"
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                    />
                  </th>
                  <th>
                    <span>Born</span>
                    <PeopleSort
                      sortPeople={sortPeople}
                      visiblePeople={visiblePeople}
                      searchParams={searchParams}
                      by="born"
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                    />
                  </th>
                  <th>
                    <span>Died</span>
                    <PeopleSort
                      sortPeople={sortPeople}
                      visiblePeople={visiblePeople}
                      searchParams={searchParams}
                      by="died"
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                    />
                  </th>
                  <th>
                    <span>Mother</span>
                    <PeopleSort
                      sortPeople={sortPeople}
                      visiblePeople={visiblePeople}
                      searchParams={searchParams}
                      by="motherName"
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                    />
                  </th>
                  <th>
                    <span>Father</span>
                    <PeopleSort
                      sortPeople={sortPeople}
                      visiblePeople={visiblePeople}
                      searchParams={searchParams}
                      by="fatherName"
                      setSearchParams={setSearchParams}
                      sortBy={sortBy}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {preparedPeople.length === 0 ? visiblePeople.map(person => (
                  <tr
                    key={person.slug}
                    className={classNames('person', {
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : person.motherName}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : person.fatherName}
                    </td>
                  </tr>
                )) : preparedPeople.map((person: Person) => (
                  <tr
                    key={person.slug}
                    className={classNames('person', {
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : person.motherName}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : person.fatherName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

  );
};
