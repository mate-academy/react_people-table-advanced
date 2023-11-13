import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { OrderControl } from '../utils/Order';
import { filterPeople } from '../utils/filterPeople';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const filteredPeople = filterPeople(people, {
    query: '', // Pass your filter criteria here
    sex: '',
    centuries: [],
    sort: '',
    order: '',
  });

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
        {filteredPeople.map((person) => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <PersonLink
              key={person.slug}
              person={person}
            />
          </tr>
        ))}
      </tbody>

    </table>
  );
};
