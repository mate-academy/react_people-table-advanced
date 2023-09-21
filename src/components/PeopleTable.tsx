import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Row } from './Row';
import { SearchLink } from './SearchLink';

type Props = {
  persons: Person[];
  initialPersons: Person[]
};

enum SortOptions {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable: React.FC<Props> = ({
  persons,
  initialPersons,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const handleSort = (type: SortOptions) => {
    if (!sort || sort !== type) {
      return {
        sort: type,
        order: 'asc',
      };
    }

    if (sortOrder === 'asc') {
      return {
        sort: type,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const personNamesFromSlug = useMemo(() => initialPersons
    .map(currPerson => currPerson.slug
      .toLowerCase().split('-').join('').slice(0, -4)), [initialPersons]);

  const getPersonsParentsSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isParentInList = personNamesFromSlug
      .includes(formatedFullName);

    if (!isParentInList) {
      return undefined;
    }

    return initialPersons.find(({ name }) => name === fullName)?.slug;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortOptions).map(option => (
            (
              <th key={option}>
                <span
                  className="is-flex is-flex-wrap-nowrap"
                >
                  {option}
                  <SearchLink params={handleSort(option)}>
                    <span className="icon">
                      <i className={cn('fas',
                        { 'fa-sort': option !== sort },
                        {
                          'fa-sort-up': option === sort
                            && sortOrder === 'asc',
                        },
                        {
                          'fa-sort-down': option === sort
                            && sortOrder === 'desc',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            )
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <Row
            key={person.slug}
            person={person}
            motherSlug={getPersonsParentsSlug(person.motherName)}
            fatherSlug={getPersonsParentsSlug(person.fatherName)}
          />
        ))}
      </tbody>
    </table>
  );
};
