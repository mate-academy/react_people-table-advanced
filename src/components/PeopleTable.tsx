import { useMemo } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchParams } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';
import { SortTitle } from './SortTitle';
import { Sort } from '../types/Sort';

const sortTitles = ['Name', 'Sex', 'Born', 'Died'];

const getlowerCase = (str: string | null) => {
  return str ? str.toLowerCase() : '';
};

type Props = {
  people: Person[];
};

const getBornCentury = (num: number) => Math.ceil(num / 100).toString();

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const [query, sex, centuries, sort, order] = useMemo(() => (
    getSearchParams(searchParams)
  ), [searchParams]);

  const isSelected = (person: Person) => person.slug === personSlug;
  const getPerson = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const findPerson = people.find(pers => (
      pers.name === name
    ));

    return findPerson
      ? <PersonLink person={findPerson} />
      : name;
  };

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    return [...people].sort((a, b) => {
      switch (sort) {
        case Sort.Name:
        case Sort.Sex:
          return (order)
            ? b[sort].localeCompare(a[sort])
            : a[sort].localeCompare(b[sort]);

        case Sort.Born:
        case Sort.Died:
          return (order)
            ? b[sort] - a[sort]
            : a[sort] - b[sort];

        default:
          return 0;
      }
    });
  }, [order, sort, people]);

  const filterPeople = () => {
    const lowQuery = getlowerCase(query);

    const filterByQuery = (query)
      ? sortedPeople.filter(pers => (
        getlowerCase(pers.name).includes(lowQuery)
        || getlowerCase(pers.motherName).includes(lowQuery)
        || getlowerCase(pers.fatherName).includes(lowQuery)
      ))
      : sortedPeople;

    return filterByQuery.filter(pers => (
      (centuries.includes(getBornCentury(pers.born)) || centuries.length === 0)
      && (pers.sex === sex || sex === '')
    ));
  };

  const visiblePoeple = useMemo(filterPeople,
    [query, sex, centuries, people]);

  return (
    <>
      {visiblePoeple.length === 0
        ? <p>There are no people matching the current search criteria</p>
        : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {sortTitles.map(title => (
                  <SortTitle
                    key={title}
                    sortTitle={title}
                  />
                ))}

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {visiblePoeple.map(person => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames(
                    { 'has-background-warning': isSelected(person) },
                  )}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {getPerson(person.motherName)}
                  </td>

                  <td>
                    {getPerson(person.fatherName)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
