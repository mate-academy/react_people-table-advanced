import React from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[] | null;
};

export const PersonDetails: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  if (people === null) {
    return <p data-cy="personLoading">Loading person...</p>;
  }

  const person = people.find(p => p.slug === slug);

  if (!person) {
    return <p data-cy="personNotFound">Person not found</p>;
  }

  const bornCentury = Math.floor(person.born / 100) + 1;

  // Interpret missing order as 'asc' when a sort field is present
  const sortParam = searchParams.get('sort') ?? null;
  const rawOrder = searchParams.get('order');
  const orderParam = sortParam && !rawOrder ? 'asc' : (rawOrder ?? null);

  const preservedParams = {
    query: searchParams.get('query') ?? null,
    sex: searchParams.get('sex') ?? null,
    centuries: searchParams.getAll('centuries'),
    sort: sortParam,
    order: orderParam,
  };

  const linkToPersonSlug = (name: string | null) => {
    if (!name) {
      return null;
    }

    const found = people.find(p => p.name === name);

    return found ? `/people/${found.slug}` : null;
  };

  return (
    <div className="box" data-cy="personDetails">
      <h2 className="title is-4" data-cy="personName">
        {person.name}
      </h2>

      <div className="content">
        <p>
          <strong>Sex:</strong> {person.sex}
        </p>
        <p>
          <strong>Born:</strong> {person.born} — {bornCentury}th century
        </p>
        <p>
          <strong>Died:</strong> {person.died}
        </p>

        <p>
          <strong>Mother:</strong>{' '}
          {person.motherName ? (
            linkToPersonSlug(person.motherName) ? (
              <SearchLink
                to={linkToPersonSlug(person.motherName)!}
                params={preservedParams}
              >
                {person.motherName}
              </SearchLink>
            ) : (
              person.motherName
            )
          ) : (
            '-'
          )}
        </p>

        <p>
          <strong>Father:</strong>{' '}
          {person.fatherName ? (
            linkToPersonSlug(person.fatherName) ? (
              <SearchLink
                to={linkToPersonSlug(person.fatherName)!}
                params={preservedParams}
              >
                {person.fatherName}
              </SearchLink>
            ) : (
              person.fatherName
            )
          ) : (
            '-'
          )}
        </p>
      </div>

      <div className="buttons">
        <SearchLink
          to="/people"
          params={preservedParams}
          className="button is-link is-light"
          data-cy="backToList"
        >
          Back to list
        </SearchLink>
      </div>
    </div>
  );
};
