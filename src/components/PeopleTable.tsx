import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sex = searchParams.get('sex');
  const qwery = searchParams.get('qwery');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  const [visiblePeople, serVisiblePeople] = useState<Person[]>(people);

  useEffect(() => {
    // SORT and FILTER visible people:
    const sortedAndFilteredPeople = people.filter(person => {
      if (sex) {
        return person.sex === sex;
      }

      return person;
    }).filter(person => {
      if (centuries.length > 0) {
        return centuries
          .includes(String(Math.floor((person.born - 1) / 100) + 1));
      }

      return person;
    }).filter(person => {
      if (qwery) {
        const mother = person.motherName?.toLowerCase();
        const father = person.fatherName?.toLowerCase();
        const name = person.name.toLowerCase();
        const qweryLowerCase = qwery.toLowerCase();

        return name.match(qweryLowerCase)
          || mother?.match(qweryLowerCase)
          || father?.match(qweryLowerCase);
      }

      return person;
    }).sort((prev, current) => {
      switch (sortBy) {
        case 'sex':
        case 'name':
          return prev[sortBy].localeCompare(current[sortBy]);
        case 'born':
        case 'died':
          return prev[sortBy] - current[sortBy];
        default:
          return 0;
      }
    });

    if (order) {
      sortedAndFilteredPeople.reverse();
    }

    serVisiblePeople(sortedAndFilteredPeople);
  }, [searchParams]);

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
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'name' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'sex' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'born' : null,
                  order: sortBy && !order ? 'desc' : null,
                }} // order=desc
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: !sortBy || !order ? 'died' : null,
                  order: sortBy && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personSlug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  personName={person.name}
                  people={people}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink
                    personName={person.motherName}
                    people={people}
                  />
                ) : '-'}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink
                    personName={person.fatherName}
                    people={people}
                  />
                ) : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
