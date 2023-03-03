import classNames from 'classnames';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SortBy } from '../../types/SortBy';
import { PreparePeople } from '../../utils/preparePeople';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: paramsSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') as SortBy || null;
  const isReversed = searchParams.get('order') === 'desc';

  const preparedPeople = PreparePeople(
    people,
    centuries,
    isReversed,
    currentQuery,
    currentSex,
    sortBy,
  );

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  if (!preparedPeople.length) {
    return (
      <p>
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.keys(SortBy).map(sortby => {
            const sortType = sortby.toLowerCase();
            const sortUp = sortBy === sortType && !isReversed;
            const sortDown = sortBy === sortType && isReversed;

            const params = {
              sort: isReversed
                ? null
                : sortType,
              order: (!isReversed && sortBy)
                ? 'desc'
                : null,
            };

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortby}
                  <SearchLink
                    key={sortby}
                    params={params}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        { 'fa-sort': sortBy !== sortType },
                        { 'fa-sort-up': sortUp },
                        { 'fa-sort-down': sortDown },
                      )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => {
          const personMother = people
            .find(mother => mother.name === person.motherName);
          const personFather = people
            .find(father => father.name === person.fatherName);

          const isPersonSelected = paramsSlug === person.slug;

          return (
            <PersonInfo
              person={person}
              key={person.slug}
              isPersonSelected={isPersonSelected}
              personMother={personMother}
              personFather={personFather}
            />
          );
        })}
      </tbody>
    </table>
  );
};
