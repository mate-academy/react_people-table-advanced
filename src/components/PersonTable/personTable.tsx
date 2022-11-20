import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../Search/SearchLink';

type Props = {
  selectedPerson: string;
};

export const PersonTable: React.FC<Props> = ({ selectedPerson = '' }) => {
  const [peopleFromServer, setPeopleFromServer]
    = useState<Person[] | undefined>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sex = searchParams.get('sex') || '';

  const titles = ['Name', 'Sex', 'Born', 'Died'];

  const isSelected = (person: Person) => selectedPerson === person.slug;

  const getParents = (people: Person[]) => {
    return people.map(child => {
      const childFather = people.find(
        father => father.name === child.fatherName,
      );

      const childMother = people.find(
        mother => mother.name === child.motherName,
      );

      const fatherName = child.fatherName ? child.fatherName : '-';
      const motherName = child.motherName ? child.motherName : '-';

      return {
        ...child,
        father: childFather,
        mother: childMother,
        fatherName,
        motherName,
      };
    });
  };

  const loadPeople = async () => {
    setIsError(false);
    setIsLoading(true);
    const loadedPeole = await getPeople();

    try {
      if ('Error' in loadedPeole) {
        throw new Error();
      }

      setPeopleFromServer(getParents(loadedPeole));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

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

  const getVisiblePeople = (sortParam: string) => {
    let people: Person[] | undefined;

    if (peopleFromServer) {
      people = [...peopleFromServer];
    }

    if (sort) {
      people?.sort((a, b) => (order
        ? switchPeopleSort(sortParam, b, a)
        : switchPeopleSort(sortParam, a, b)));
    }

    if (query) {
      people = people?.filter(person => {
        const fatherName = person.fatherName && person.fatherName.toLowerCase();
        const motherName = person.motherName && person.motherName.toLowerCase();
        const normalizedQuery = query.toLowerCase();
        const name = person.name.toLowerCase();

        return (
          name.includes(normalizedQuery)
          || fatherName?.includes(normalizedQuery)
          || motherName?.includes(normalizedQuery)
        );
      });
    }

    if (sex) {
      people = people?.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      people = people?.filter(person => isTheSameCentury(person));
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

  const errorOrTable = isError ? (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  ) : (
    table
  );

  useEffect(() => {
    loadPeople();
  }, []);

  useEffect(() => {
    setVisiblePeople(getVisiblePeople(sort));
  }, [sex, query, order, sort, centuries.length, peopleFromServer]);

  return (
    <div className="column">
      <div className="box table-container">
        { isLoading ? <Loader /> : errorOrTable }
      </div>
    </div>
  );
};
