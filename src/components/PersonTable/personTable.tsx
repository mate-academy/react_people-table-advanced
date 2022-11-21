import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../Search/SearchLink';

type Props = {
  selectedPerson: string,
  peopleFromServer: Person[] | null,
};

export const PersonTable: React.FC<Props> = ({
  selectedPerson = '', peopleFromServer,
}) => {
  const [visiblePeople, setVisiblePeople] = useState<Person[] | null>(null);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sex = searchParams.get('sex') || '';

  const titles = ['Name', 'Sex', 'Born', 'Died'];

  const isSelected = (person: Person) => selectedPerson === person.slug;

  const switchPeopleSort = (sortParam: string, a: Person, b: Person) => {
    switch (sortParam) {
      case 'name':
      case 'sex':
        return a.name.localeCompare(b.name);

      case 'born':
      case 'died':
        return +a.born - +b.born;

      default:
        return 0;
    }
  };

  const isTheSameCentury = (person: Person) => {
    return centuries.includes(Math.ceil(person.born / 100).toString());
  };

  const filteringPeople = (
    callback: (person: Person) => boolean | undefined,
    people: Person[] | null,
  ) => {
    const filteredPeople = people?.filter(callback);

    return filteredPeople || null;
  };

  const getVisiblePeople = (sortParam: string) => {
    let people: Person[] | null = null;

    if (peopleFromServer) {
      people = [...peopleFromServer];
    }

    if (sort) {
      people?.sort((a, b) => (order
        ? switchPeopleSort(sortParam, b, a)
        : switchPeopleSort(sortParam, a, b)));
    }

    if (query) {
      const callback = (person: Person) => {
        const fatherName = person.fatherName && person.fatherName.toLowerCase();
        const motherName = person.motherName && person.motherName.toLowerCase();
        const normalizedQuery = query.toLowerCase();
        const name = person.name.toLowerCase();

        return (
          name.includes(normalizedQuery)
          || fatherName?.includes(normalizedQuery)
          || motherName?.includes(normalizedQuery)
        );
      };

      people = filteringPeople(callback, people);
    }

    if (sex) {
      const callback = (person: Person) => person.sex === sex;

      people = filteringPeople(callback, people);
    }

    if (centuries.length) {
      const callback = (person: Person) => isTheSameCentury(person);

      people = filteringPeople(callback, people);
    }

    return people;
  };

  const onSort = (title: string) => {
    const normalizedTitle = title.toLowerCase();

    if (!sort) {
      return { sort: normalizedTitle, order: null };
    }

    if (sort === normalizedTitle && !order) {
      return { sort: normalizedTitle, order: 'desc' };
    }

    if (sort !== normalizedTitle) {
      return { sort: normalizedTitle, order: null };
    }

    return { sort: null, order: null };
  };

  const table = visiblePeople?.length ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titles.map(title => {
            const normalizedTitle = title.toLowerCase();

            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  { title }
                  <SearchLink
                    params={onSort(title)}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        {
                          'fa-sort': sort !== normalizedTitle,
                          'fa-sort-up': sort === normalizedTitle && !order,
                          'fa-sort-down': sort === normalizedTitle && order,
                        },
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
        {visiblePeople?.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames(
              {
                'has-background-warning': isSelected(person),
              },
            )}
          >
            <PersonInfo
              name={person.name}
              slug={person.slug}
              died={person.died}
              born={person.born}
              mother={person.mother}
              father={person.father}
              motherName={person.motherName}
              fatherName={person.fatherName}
              sex={person.sex}
              isSelected={isSelected(person)}
            />
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p data-cy="noPeopleMessage">
      {peopleFromServer?.length ? (
        'There are no people matching the current search criteria'
      ) : (
        'There are no people on the server'
      )}
    </p>
  );

  useEffect(() => {
    setVisiblePeople(peopleFromServer);
  }, [peopleFromServer]);

  useEffect(() => {
    setVisiblePeople(getVisiblePeople(sort));
  }, [sex, query, order, sort, centuries.length, peopleFromServer]);

  return (
    <div className="column">
      <div className="box table-container">
        { table }
      </div>
    </div>
  );
};
