import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { Person } from '../types';
import { getSortFunction } from '../utils/sortFunction';

type Props = {
  getpeople: Person[];
  preparedPeople: Person[];
  sort: string;
  order: string;
  centuries: string[];
};

export const PeopleTable: React.FC<Props> = ({
  preparedPeople,
  sort,
  order,
}) => {
  const handleSortChange = (sortBy: string) => {
    let result: {
      sort: string | null;
      order: string | null;
    } = { sort: sortBy, order: 'desc' };
    const isSortBy = sort === sortBy;
    const isDesc = order === 'desc';

    if (isSortBy && isDesc) {
      result = { sort: null, order: null };
    }

    if (!isSortBy && !isDesc) {
      result = { sort: sortBy, order: null };
    }

    if (!isSortBy && isDesc) {
      result = { sort: sortBy, order: null };
    }

    return result;
  };

  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  useEffect(() => {
    const sortedPeopleCopy = [...preparedPeople];

    setSortedPeople(getSortFunction(sortedPeopleCopy, sort, order));
  }, [preparedPeople, sort, order]);

  const { slug } = useParams();
  const getParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parentName = preparedPeople.find((person) => person.name === name);

    if (parentName) {
      return <PersonLink person={parentName} />;
    }

    return name;
  };

  const paramSort = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {paramSort.map((key) => (
            <>
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={handleSortChange(`${(key.toLowerCase())}`)}>
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort', {
                          'fa-sort-up': !order && sort === key.toLowerCase(),
                          'fa-sort-down': order && sort === key.toLowerCase(),
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            </>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person.motherName)}</td>
            <td>{getParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
