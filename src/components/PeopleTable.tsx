/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';

type Props = {
  people: Person[]
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuryFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const visiblePeople = useMemo(() => {
    let newPeople = [...people];

    if (sexFilter) {
      newPeople = newPeople.filter(person => person.sex === sexFilter);
    }

    if (centuryFilter.length) {
      newPeople = newPeople.filter(person => {
        const century = Math.ceil(person.died / 100);

        return centuryFilter.includes(String(century));
      });
    }

    if (query) {
      newPeople = newPeople.filter(person => {
        const lowerQuery = query.toLowerCase();

        return person.name.toLowerCase().includes(lowerQuery)
          || person.motherName?.toLowerCase().includes(lowerQuery)
          || person.fatherName?.toLowerCase().includes(lowerQuery);
      });
    }

    return newPeople;
  }, [people, sexFilter, centuryFilter, query]);

  return (
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
        {visiblePeople?.map(person => (
          <PersonInfo key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
