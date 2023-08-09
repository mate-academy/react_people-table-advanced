/* eslint-disable no-else-return */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { PeopleFilters } from './PeopleFilters';
import { Sex } from '../types/Sex';
import { Centuries } from '../types/Centuries';

type Props = {
  people: Person[];
  onError: boolean;
  sex: Sex;
  sexClickHandler: (sex: Sex) => void;
  query: string,
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  centuries: Centuries;
  centuriesClickHandler: (centuries: Centuries) => void;
  deleteFilters: () => void;
};

export const PeopleTable:React.FC<Props> = ({
  people,
  onError,
  sex,
  sexClickHandler,
  query,
  inputHandler,
  centuries,
  centuriesClickHandler,
  deleteFilters,
}) => {
  const { slug } = useParams();
  const [nameClickCount, setNameClickCount] = useState(0);
  const [sexClickCount, setSexClickCount] = useState(0);
  const [bornClickCount, setBornClickCount] = useState(0);
  const [diedClickCount, setDiedClickCount] = useState(0);

  const nameHref = useMemo(() => {
    if (nameClickCount === 1) {
      return '#/people?sort=name';
    } else if (nameClickCount === 2) {
      return '#/people?sort=name&order=desc';
    }

    return '#/people';
  }, [nameClickCount]);

  const sexHref = useMemo(() => {
    if (sexClickCount === 1) {
      return '#/people?sort=sex';
    } else if (sexClickCount === 2) {
      return '#/people?sort=sex&order=desc';
    }

    return '#/people';
  }, [sexClickCount]);

  const bornHref = useMemo(() => {
    if (bornClickCount === 1) {
      return '#/people?sort=born';
    } else if (bornClickCount === 2) {
      return '#/people?sort=born&order=desc';
    }

    return '#/people';
  }, [bornClickCount]);

  const diedHref = useMemo(() => {
    if (diedClickCount === 1) {
      return '#/people?sort=died';
    } else if (diedClickCount === 2) {
      return '#/people?sort=died&order=desc';
    }

    return '#/people';
  }, [diedClickCount]);

  return (
    <>
      <PeopleFilters
        sex={sex}
        sexClickHandler={sexClickHandler}
        query={query}
        inputHandler={inputHandler}
        centuries={centuries}
        centuriesClickHandler={centuriesClickHandler}
        deleteFilters={deleteFilters}
      />
      {!onError && (
        people.length > 0
          ? (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Name
                      <a
                        href={nameHref}
                        onClick={() => {
                          setNameClickCount(prev => {
                            if (prev === 0) {
                              return 1;
                            } else if (prev === 1) {
                              return 2;
                            }

                            return 0;
                          });
                          if (sexClickCount) {
                            setSexClickCount(0);
                          }

                          if (bornClickCount) {
                            setBornClickCount(0);
                          }

                          if (diedClickCount) {
                            setDiedClickCount(0);
                          }
                        }}
                      >
                        <span className="icon">
                          <i className={classNames('fas', {
                            'fa-sort': !nameClickCount,
                            'fa-sort-up': nameClickCount === 1,
                            'fa-sort-down': nameClickCount === 2,
                          })}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <a
                        href={sexHref}
                        onClick={() => {
                          setSexClickCount(prev => {
                            if (prev === 0) {
                              return 1;
                            } else if (prev === 1) {
                              return 2;
                            }

                            return 0;
                          });
                          if (nameClickCount) {
                            setNameClickCount(0);
                          }

                          if (bornClickCount) {
                            setBornClickCount(0);
                          }

                          if (diedClickCount) {
                            setDiedClickCount(0);
                          }
                        }}
                      >
                        <span className="icon">
                          <i className={classNames('fas', {
                            'fa-sort': !sexClickCount,
                            'fa-sort-up': sexClickCount === 1,
                            'fa-sort-down': sexClickCount === 2,
                          })}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <a
                        href={bornHref}
                        onClick={() => {
                          setBornClickCount(prev => {
                            if (prev === 0) {
                              return 1;
                            } else if (prev === 1) {
                              return 2;
                            }

                            return 0;
                          });
                          if (nameClickCount) {
                            setNameClickCount(0);
                          }

                          if (sexClickCount) {
                            setBornClickCount(0);
                          }

                          if (diedClickCount) {
                            setDiedClickCount(0);
                          }
                        }}
                      >
                        <span className="icon">
                          <i className={classNames('fas', {
                            'fa-sort': !bornClickCount,
                            'fa-sort-up': bornClickCount === 1,
                            'fa-sort-down': bornClickCount === 2,
                          })}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <a
                        href={diedHref}
                        onClick={() => {
                          setDiedClickCount(prev => {
                            if (prev === 0) {
                              return 1;
                            } else if (prev === 1) {
                              return 2;
                            }

                            return 0;
                          });
                          if (nameClickCount) {
                            setNameClickCount(0);
                          }

                          if (bornClickCount) {
                            setBornClickCount(0);
                          }

                          if (sexClickCount) {
                            setDiedClickCount(0);
                          }
                        }}
                      >
                        <span className="icon">
                          <i className={classNames('fas', {
                            'fa-sort': !diedClickCount,
                            'fa-sort-up': diedClickCount === 1,
                            'fa-sort-down': diedClickCount === 2,
                          })}
                          />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
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
                      {person.mother
                        ? (
                          <PersonLink person={person.mother} />
                        )
                        : (person.motherName || '-')}
                    </td>

                    <td>
                      {person.father
                        ? (
                          <PersonLink person={person.father} />
                        )
                        : (person.fatherName || '-')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
      )}
    </>
  );
};
