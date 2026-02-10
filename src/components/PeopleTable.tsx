import React from 'react';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { Errors } from '../types/Errors';

const getFilteredPeople = (
  people: Person[],
  sortBySex: string | null,
  query: string,
  centuries: string[],
) => {
  let newPeople = [...people];
  const normalizedQuery = query.trim();

  if (centuries.length > 0) {
    const normilizedCenturies = centuries.map(century => +century);

    newPeople = newPeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return normilizedCenturies.includes(bornCentury);
    });
  }

  if (normalizedQuery !== '') {
    newPeople = newPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sortBySex) {
    newPeople = newPeople.filter(person => person.sex === sortBySex);
  }

  return newPeople;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortBySex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = getFilteredPeople(people, sortBySex, query, centuries);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {(filteredPeople.length !== 0 && (
        <>
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
            {filteredPeople.map(person => (
              <PeopleLink
                key={person.slug}
                person={person}
                personSlug={personSlug}
              />
            ))}
          </tbody>
        </>
      )) || <p>{Errors.FiltersNoMatch}</p>}
    </table>
  );
};
