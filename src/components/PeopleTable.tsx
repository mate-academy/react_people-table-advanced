import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { Row } from './Row';
import { SearchLink } from './SearchLink';

type Props = {
  persons: Person[]
};

enum SortOptions {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

export const PeopleTable: React.FC<Props> = ({
  persons,
}) => {
  // const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>();

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

  const personNamesFromSlug = useMemo(() => persons
    .map(currPerson => currPerson.slug
      .toLowerCase().split('-').join('').slice(0, -4)), [persons]);

  const getPersonsMotherSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isMotherInList = personNamesFromSlug.includes(formatedFullName);

    if (!isMotherInList) {
      return undefined;
    }

    return persons.find(({ name }) => name === fullName)?.slug;
  };

  const getPersonsFatherSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isFatherInList = personNamesFromSlug.includes(formatedFullName);

    if (!isFatherInList) {
      return undefined;
    }

    return persons.find(({ name }) => name === fullName)?.slug;
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
            // isSelected={person.slug === selectedPersonSlug}
            motherSlug={getPersonsMotherSlug(person.motherName)}
            fatherSlug={getPersonsFatherSlug(person.fatherName)}
            // onSelectPerson={setSelectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
