import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { OrderControl } from './OrderControl';
import { PersonItem } from './PersonItem';

type TableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<TableProps> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const displayedPeople = () => {
    let filteredPeople = [...people];

    const gender = searchParams.get('sex');
    const query = searchParams.get('query');
    const centuries = searchParams.getAll('centuries');

    filteredPeople = gender
      ? filteredPeople.filter(person => person.sex === gender)
      : filteredPeople;

    filteredPeople = query
      ? filteredPeople.filter(person => person
        .name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      || person.motherName?.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase())
      || person.fatherName?.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()))
      : filteredPeople;

    filteredPeople = centuries.length > 0
      ? filteredPeople.filter(person => centuries
        .includes((Math.ceil(Number(person.born) / 100)).toString()))
      : filteredPeople;

    const sort = searchParams.get('sort');

    if (sort) {
      if (sort === 'born' || sort === 'died') {
        filteredPeople.sort((a, b) => {
          return a[sort] - b[sort];
        });
      }

      if (sort === 'name' || sort === 'sex') {
        filteredPeople.sort((a, b) => {
          return a[sort].localeCompare(b[sort]);
        });
      }
    }

    const order = searchParams.get('order');

    if (order) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

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
              <OrderControl sort="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <OrderControl sort="sex" />

            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <OrderControl sort="born" />

            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <OrderControl sort="died" />

            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {displayedPeople().map(person => (
          <PersonItem
            key={person.slug}
            person={person}
          />
        ))}

      </tbody>
    </table>
  );
};
