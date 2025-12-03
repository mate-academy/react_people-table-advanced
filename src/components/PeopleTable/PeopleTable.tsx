import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchParams } from '../PeopleFilter/PeopleFilter';
import { Sort, OrderType } from '../PeoplePage/PeoplePage';
import React from 'react';

interface Props {
  people: Person[];
  highlightedPersonSlug: string | null;
}

const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = ({
  people,
  highlightedPersonSlug,
}) => {
  const [urlSearchParams] = useSearchParams();
  const order = urlSearchParams.get('order') as OrderType;
  const sort = urlSearchParams.get('sort') as Sort;

  const getDirection = (sortParam: Sort) => {
    if (sortParam) {
      return 'desc';
    } else {
      return null;
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map((header, i) => (
            <th key={header}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                {i < 4 ? (
                  <Link
                    to={{
                      search: getSearchParams(
                        {
                          sort: getDirection(sort)
                            ? header.toLowerCase()
                            : null,
                        },
                        urlSearchParams.toString(),
                      ),
                    }}
                    key={header}
                    className="icon"
                  >
                    <i
                      className={cn('fas', {
                        'fa-sort-up': sort === header.toLowerCase(),
                        'fa-sort-down':
                          order === 'desc' && sort === header.toLowerCase(),
                        'fa-sort': sort !== header.toLowerCase(),
                      })}
                    />
                  </Link>
                ) : (
                  ''
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.length === 0 && (
          <tr>
            <td data-cy="noPeopleMessage" colSpan={6}>
              There are no people on the server
            </td>
          </tr>
        )}
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': highlightedPersonSlug === person.slug,
              })}
              key={person?.slug}
            >
              <PersonLink personData={person} people={people} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <PersonLink
                personData={person.motherName ? person.motherName : '-'}
                people={people}
              />
              <PersonLink
                personData={person.fatherName ? person.fatherName : '-'}
                people={people}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
