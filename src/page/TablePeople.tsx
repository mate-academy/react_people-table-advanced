import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { convertToSlug } from '../components/function/convertToSlug';
import { usePeopleContext } from '../components/PeopleContext/PeopleContext';

export const TablePeople = () => {
  const {
    loading,
    people,
    errorMessage,
    isMotherInArray,
    isFatherInArray,
    filteredPeople,
    searchByName,
  } = usePeopleContext();

  const { slug } = useParams();

  function getPersonByName(name: string, peopleArray: Person[]): Person {
    const person = peopleArray.find(p => p.name === name) || {
      name: '',
      sex: '',
      born: 0,
      died: 0,
      fatherName: null,
      motherName: null,
      slug: '',
    };

    return person;
  }

  function getRowClassName(
    person: Person,
    slugTag: string | undefined,
  ) {
    const { name, born } = person;

    const checkSelectedChild = convertToSlug(name, born) === slugTag?.slice(1);

    return classNames({
      'has-background-warning': checkSelectedChild,
    });
  }

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!loading && !errorMessage && (
          <>
            { }
          </>
        )}

        {!loading && !errorMessage && (
          filteredPeople.length === 0 && searchByName.length > 0 ? (
            <p>There are no people matching the current search criteria</p>
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
                      <Link to="#/people?sort=name">
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </Link>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <Link to="#/people?sort=sex">
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </Link>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <Link to="#/people?sort=born&amp;order=desc">
                        <span className="icon">
                          <i className="fas fa-sort-up" />
                        </span>
                      </Link>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <Link to="#/people?sort=died">
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </Link>
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>
              <tbody>

                {(filteredPeople.length > 0 || searchByName ? filteredPeople
                  : people).map(person => {
                  const {
                    name, sex, born, died, motherName, fatherName,
                  } = person;

                  return (
                    <tr
                      key={name}
                      data-cy="person"
                      className={getRowClassName(person, slug)}
                    >
                      <td aria-label="CHOOSE">
                        <PersonLink person={person} />
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {isMotherInArray(motherName) ? (
                          <PersonLink person={
                            getPersonByName(motherName!, people)
                          }
                          />
                        ) : (
                          motherName ?? '-'
                        )}
                      </td>
                      <td>
                        {isFatherInArray(fatherName) ? (
                          <PersonLink person={
                            getPersonByName(fatherName!, people)
                          }
                          />
                        ) : (
                          fatherName ?? '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>

  );
};
