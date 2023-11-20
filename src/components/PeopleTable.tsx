import { useEffect, useState } from 'react';
// import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

// const columns = ['Name', 'Sex', 'Born', 'Died'];

// const columns = [
//   { name: 'Name' },
//   { sex: 'Sex' },
//   { born: 'Born' },
//   { died: 'Died' },
// ];

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  const filterPeople = (p: Person[]) => {
    let peopleCopy = [...p];
    const filterBySex = searchParams.get('sex');
    const filterByQuery = searchParams.get('query');
    const filterByCentury = searchParams.getAll('centuries');
    const sortValue = searchParams.get('sort') || null;
    const sortOrder = searchParams.get('order') || null;

    if (filterBySex) {
      peopleCopy = peopleCopy.filter((person => (person.sex === filterBySex)));
    }

    if (filterByQuery) {
      peopleCopy = peopleCopy.filter(
        input => input.name.toLowerCase().includes(filterByQuery)
        || input.motherName?.toLowerCase().includes(filterByQuery)
        || input.fatherName?.toLowerCase().includes(filterByQuery),
      );
    }

    if (filterByCentury && filterByCentury.length > 0) {
      peopleCopy = peopleCopy.filter(person => {
        return (
          filterByCentury?.includes(Math.ceil(person.born / 100).toString())
        );
      });
    }

    if (sortValue) {
      peopleCopy.sort((a, b) => {
        switch (sortValue) {
          case ('name'):
            return a.name.localeCompare(b.name);
          case ('sex'):
            return a.sex.localeCompare(b.sex);
          case ('born'):
            return (a.born - b.born);
          case ('died'):
            return (a.died - b.died);
          default: return 0;
        }
      });
    }

    if (sortOrder === 'desc') {
      peopleCopy.reverse();
    }

    return peopleCopy;
  };

  const visiblePeople = filterPeople(people);

  const getSlug = (name: string | null) => {
    return people.find(person => person.name === name)?.slug;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {/* {columns.map(column => {
            const initialCol = column.toLowerCase();

            const sortedCol = sortValue === initialCol
              && sortOrder === 'desc' ? null : initialCol;

                <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={{
                  sortValue: sort,
                  sortOrder: order,
                }}>
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': sortValue !== value,
                      'fa-sort-up': sortValue === value && !sortOrder,
                      'fa-sort-down': sortValue === value && sortOrder,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          })} */}
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
        { visiblePeople.map(person => {
          return (
            <PersonLink
              person={person}
              motherNameLink={getSlug(person.motherName)}
              fatherNameLink={getSlug(person.fatherName)}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
