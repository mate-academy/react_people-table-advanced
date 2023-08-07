import React from 'react';
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
                      <a href="#/people?sort=name">
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Sex
                      <a href="#/people?sort=sex">
                        <span className="icon">
                          <i className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Born
                      <a href="#/people?sort=born&amp;order=desc">
                        <span className="icon">
                          <i className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Died
                      <a href="#/people?sort=died">
                        <span className="icon">
                          <i className="fas fa-sort" />
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
