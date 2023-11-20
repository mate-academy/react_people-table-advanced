import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

const columns = [
  { Name: 'name' },
  { Sex: 'sex' },
  { Born: 'born' },
  { Died: 'died' },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const filterPeople = (p: Person[]) => {
    let peopleCopy = [...p];
    const filterBySex = searchParams.get('sex');
    const filterByQuery = searchParams.get('query');
    const filterByCentury = searchParams.getAll('centuries');

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
          {columns.map((column) => {
            const [name, sortName] = Object.entries(column)[0];
            const newSortName = sortValue === sortName
              && sortOrder === 'desc' ? null : sortName;

            let newOrder = null;

            if (sortValue === sortName) {
              if (sortOrder === 'desc') {
                newOrder = null;
              } else {
                newOrder = 'desc';
              }
            }

            return (
              <th key={sortName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {name}
                  <SearchLink params={{
                    sort: newSortName,
                    order: newOrder,
                  }}
                  >
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': sortValue !== sortName,
                        'fa-sort-up': sortValue === sortName && !sortOrder,
                        'fa-sort-down': sortValue === sortName && sortOrder,
                      })}
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
