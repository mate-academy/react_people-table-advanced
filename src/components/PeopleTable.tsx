import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonalLink } from './PersonalLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

export const PeopleTable: FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || null;
  const tableHeaders = ['Name', 'Sex', 'Born', 'Died'];

  const findPerson = (personName: string | null) => {
    const foundPerson = people.find(person => person.name === personName);

    if (foundPerson) {
      return <PersonalLink person={foundPerson} />;
    }

    if (personName) {
      return personName;
    }

    return '-';
  };

  const isSelected = (person: Person) => {
    return person.slug === slug;
  };

  const getSearchParamsForSorting = (sortBy: string) => {
    if (sort === sortBy && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === sortBy) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy, order: null };
  };

  const getClassesForSearchIcon = (sortBy: string) => {
    if (sortBy === sort && order === 'desc') {
      return 'fas fa-sort-down';
    }

    if (sortBy === sort) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  };

  const getSortedPeople = (): Person[] => {
    const sortedPeople = [...people];

    switch (sort) {
      case 'name':
        sortedPeople.sort(
          (
            firstPerson,
            secondPerson,
          ) => firstPerson[sort].localeCompare(secondPerson[sort]),
        );
        break;

      case 'sex':
        sortedPeople.sort(
          (
            firstPerson,
            secondPerson,
          ) => firstPerson[sort].localeCompare(secondPerson[sort]),
        );
        break;

      case 'born':
        sortedPeople.sort(
          (
            firstPerson,
            secondPerson,
          ) => firstPerson[sort] - secondPerson[sort],
        );
        break;

      case 'died':
        sortedPeople.sort(
          (
            firstPerson,
            secondPerson,
          ) => firstPerson[sort] - secondPerson[sort],
        );
        break;

      default:
        break;
    }

    if (order) {
      sortedPeople.reverse();
    }

    return sortedPeople;
  };

  const sortedPeople = getSortedPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeaders.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  params={getSearchParamsForSorting(title.toLowerCase())}
                >
                  <span className="icon">
                    <i
                      className={getClassesForSearchIcon(title.toLowerCase())}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <PersonalLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findPerson(person.motherName)}</td>
            <td>{findPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
