import React from 'react';
import { Person } from '../../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { findFather, findMother } from '../functions/getParents';
import classNames from 'classnames';
import { getPreperedPeople } from '../functions/getPreperedPeople';
import { SearchLink } from '../SearchLink';

export const TABLE_HEADER = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
  mother: 'Mother',
  father: 'Father',
};

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug;

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const handleSortChange = (sortBy: string) => {
    const isNothingSelected = (!sort && !order) || !(sortBy === sort);
    const isAscOrderSelected = sort && !order && sortBy === sort;
    const isDescOrderSelected = sort && order;

    if (isNothingSelected) {
      return { sort: sortBy, order: null };
    }

    if (isAscOrderSelected) {
      return { sort: sortBy, order: 'desc' };
    }

    if (isDescOrderSelected) {
      return { sort: null, order: null };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(TABLE_HEADER).map(([key, value]) => {
            const withSortedArrows =
              value !== TABLE_HEADER.mother && value !== TABLE_HEADER.father;

            return withSortedArrows ? (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value}
                  <SearchLink params={handleSortChange(key)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== key,
                          'fa-sort-up': !order && sort === key,
                          'fa-sort-down': order && sort === key,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            ) : (
              <th key={key}>{value}</th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {getPreperedPeople(people, searchParams).map(person => {
          const { name, sex, born, died, fatherName, motherName, slug } =
            person;

          const personFather = findFather(person, people);
          const personMother = findMother(person, people);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPerson === slug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `${slug}`,
                    search: searchParams.toString(),
                  }}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {personMother ? (
                  <Link className="has-text-danger" to={`${personMother.slug}`}>
                    {personMother.name}
                  </Link>
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <Link to={`${personFather.slug}`}>{personFather.name}</Link>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
