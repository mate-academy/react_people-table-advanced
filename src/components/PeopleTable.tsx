// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

type Props = {
  getpeople: Person[];
  preparedPeople: Person[];
  setPreparedPeople: React.Dispatch<React.SetStateAction<Person[]>>
  sort: string;
  order: string;
  centuries: string[]
};

export const PeopleTable: React.FC<Props> = ({
  getpeople,
  preparedPeople,
  setPreparedPeople,
  sort,
  order,
  centuries,
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

  useEffect(() => {
    let sortedPeople = [...getpeople];

    if (centuries.length > 0) {
      sortedPeople = [...preparedPeople];
    }

    if (sort) {
      sortedPeople.sort((a, b) => {
        let comparison = 0;

        switch (sort) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'sex':
            comparison = a.sex.localeCompare(b.sex);
            break;
          case 'born':
            comparison = a.born - b.born;
            break;
          case 'died':
            comparison = a.died - b.died;
            break;
          default:
            break;
        }

        return order === 'desc' ? comparison * -1 : comparison;
      });
    }

    setPreparedPeople(sortedPeople);
  }, [sort, order, preparedPeople]);

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
        {preparedPeople.map((person) => (
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
