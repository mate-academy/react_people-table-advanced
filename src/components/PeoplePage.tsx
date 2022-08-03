import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(p => ({ ...p }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother: preparedPeople.find(m => m.name === person.motherName)
              || null,
            father: preparedPeople.find(f => f.name === person.fatherName)
              || null,
          });
        });

        setPeople(preparedPeople);
      });
  }, []);

  const visiblePeople = people;

  return (
    <>
      <h1 className="title">People page</h1>
      {visiblePeople.length}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-4-desktop">
            <nav className="panel">
              <p className="panel-heading">
                Filters
              </p>

              <p className="panel-tabs">
                <a className="is-active" href="#/people">All</a>
                <a className="" href="#/people?sex=m">Male</a>
                <a className="" href="#/people?sex=f">Female</a>
              </p>

              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search"
                  />
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                </p>
              </div>

              <div className="panel-block is-flex-direction-column">
                <div className="buttons is-justify-content-center">
                  <button type="button" className="button">16</button>
                  <button type="button" className="button">17</button>
                  <button type="button" className="button">18</button>
                  <button type="button" className="button">19</button>
                  <button type="button" className="button">20</button>
                  <button type="button" className="button is-success">
                    Show All
                  </button>
                </div>
              </div>

              <div className="panel-block">
                <button
                  type="button"
                  className="button is-link is-outlined is-fullwidth"
                >
                  Reset all filters
                </button>
              </div>
            </nav>
          </div>

          <div className="column">
            <table className="table is-striped is-narrow box">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>
                {visiblePeople.map(person => (
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
