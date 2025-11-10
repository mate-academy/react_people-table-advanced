import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { useEffect, useState } from 'react';
import {
  filterByCentury,
  filterByQuery,
  filterBySex,
  sortByUrl,
} from '../utils/peopleFilters';
import { SortByLink } from './SortsLinks';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [currentPeople, setCurrentPeople] = useState<Person[]>(people);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const currentSlug = people.find(p => p.slug === slug);
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    const sex = searchParams.get('sex');
    const centuries = searchParams
      .getAll('centuries')
      .map(el => Number(el))
      .sort((a, b) => a - b);
    const query = searchParams.get('query');
    let filtered = [...people];

    filtered = filterBySex(filtered, sex);
    filtered = filterByCentury(filtered, centuries);
    filtered = filterByQuery(filtered, query);
    filtered = sortByUrl(filtered, sortBy, sortOrder);

    setCurrentPeople(filtered);
  }, [people, sortBy, searchParams, sortOrder]);

  if (slug && !currentSlug) {
    return (
      <Navigate
        to={{
          pathname: '/people',
          search: searchParams.toString(),
        }}
        replace
      />
    );
  }

  if (currentPeople.length <= 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortByLink linkName={'name'} sortBy={sortBy} order={sortOrder} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortByLink linkName={'sex'} sortBy={sortBy} order={sortOrder} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortByLink linkName={'born'} sortBy={sortBy} order={sortOrder} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SortByLink linkName={'died'} sortBy={sortBy} order={sortOrder} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {currentPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <PersonLink person={person} people={people} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
