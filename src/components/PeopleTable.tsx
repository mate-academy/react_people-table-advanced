import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import PersonItem from './PersonItem';

type Props = {
  people: Person[];
  setVisible: (type: boolean) => void;
  onVisible: boolean;
};

const preperadPeople = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(current => current.name === person.motherName),
    father: people.find(current => current.name === person.fatherName),
  }));
};

const tableList = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

const PeopleTable: React.FC<Props> = ({ people, setVisible, onVisible }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let visiblePeople: Person[] = preperadPeople(people);

  if (query) {
    const optimizedQuery = query.toLowerCase().trim();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.includes(optimizedQuery) ||
        person.motherName?.includes(optimizedQuery) ||
        person.fatherName?.includes(optimizedQuery),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  const sortPeople = (persons: Person[], sortBy: keyof Person) => {
    return [...persons].sort((personA, personB) => {
      const valueA = personA[sortBy];
      const valueB = personB[sortBy];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }

      return 0;
    });
  };

  if (sort) {
    visiblePeople = sortPeople(visiblePeople, sort as keyof Person);
  }

  if (order) {
    visiblePeople = visiblePeople.reverse();
  }

  const handleIcon = (sortBy: string) => {
    let classIcon = 'fa-sort';

    if (sortBy.toLowerCase() === sort) {
      if (order !== 'desc') {
        classIcon = 'fa-sort-up';
      } else {
        classIcon = 'fa-sort-down';
      }
    }

    return (
      <span className="icon">
        <i className={`fas ${classIcon}`} />
      </span>
    );
  };

  const handleOrder = () => {
    if (sort && !order) {
      return 'desc';
    }

    return null;
  };

  const handleSort = (sortBy: string) => {
    if (sort && order) {
      return null;
    }

    return sortBy.toLowerCase();
  };

  useEffect(() => {
    if (visiblePeople.length === 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [visiblePeople, setVisible]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {!onVisible && (
          <tr>
            {tableList.map(item => (
              <th key={item}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {item !== 'Mother' && item !== 'Father' ? (
                    <>
                      {item}
                      <SearchLink
                        params={{
                          sort: handleSort(item),
                          order: handleOrder(),
                        }}
                      >
                        {handleIcon(item)}
                      </SearchLink>
                    </>
                  ) : (
                    <>{item}</>
                  )}
                </span>
              </th>
            ))}
          </tr>
        )}
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonItem person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
