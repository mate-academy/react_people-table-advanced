import classNames from 'classnames';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { sortPeople } from '../../utils/sortPeople';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../SearchLink';

type Props = {
  persons: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  persons,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const preparedPersons = useMemo(() => (
    sortPeople(persons, sort)
  ), [persons, sort]);

  if (order) {
    preparedPersons.reverse();
  }

  return (persons.length
    ? (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {['name', 'sex', 'born', 'died'].map(sortName => {
              const visibleSort = sortName[0].toUpperCase() + sortName.slice(1);

              return (
                <th key={sortName}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {visibleSort}
                    <SearchLink
                      params={{
                        sort: !order
                          ? sortName
                          : null,
                        order: sort === sortName && !order
                          ? 'desc'
                          : null,
                      }}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'fas fa-sort',
                          { 'fa-sort-up': sort === sortName && !order },
                          { 'fa-sort-down': sort === sortName && !!order },
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
          {preparedPersons.map(person => {
            const { motherName, fatherName, slug } = person;
            const personsMother = persons.find(pers => pers.name === motherName)
           || null;
            const personsFather = persons.find(pers => pers.name === fatherName)
           || null;

            return (
              <PersonInfo
                key={slug}
                person={person}
                personsMother={personsMother}
                personsFather={personsFather}
                selectedSlug={selectedSlug}
              />
            );
          })}
        </tbody>
      </table>
    )
    : (
      <p>
        There are no people matching the current search criteria
      </p>
    )
  );
};
