import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { Errors } from '../types/Errors';
import { PersonLink } from './PersonLink';
import { SortField } from '../types/SortField';
import { SortOrder } from '../types/SortOrder';
import { SearchParamKey } from '../types/SearchParamKey';
import { sortPeople } from '../services/sortPeople';
import { getSortIconClassName } from '../services/getIconClassName';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [order, setOrder] = useState<SortOrder | null>(null);

  const sex = searchParams.get(SearchParamKey.Sex);
  const query = searchParams.get(SearchParamKey.Query);
  const centuries = searchParams.getAll(SearchParamKey.Centuries);
  const filters = [
    SortField.Name,
    SortField.Sex,
    SortField.Born,
    SortField.Died
  ];

  const handleSort = (
    field: SortField,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    let newSortOrder: SortOrder | null;

    if (sortField === field) {
      newSortOrder = order === SortOrder.ASC ? SortOrder.DESC : null;
    } else {
      newSortOrder = SortOrder.ASC;
    }

    setSortField(field);
    setOrder(newSortOrder);

    if (!newSortOrder) {
      setSortField(null);
    }

    const updatedSearchParams = getSearchWith(searchParams, {
      [SearchParamKey.Sort]: newSortOrder ? field.toLowerCase() : null,
      [SearchParamKey.Order]:
        newSortOrder === SortOrder.DESC ? SortOrder.DESC : null,
    });

    setSearchParams(updatedSearchParams);
  };

  const filterPeople = useMemo(() => {
    let filteredPeople = [...people];

    if (query) {
      const queryToLowerCase = query?.toLocaleLowerCase();

      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLocaleLowerCase().includes(queryToLowerCase) ||
          person.fatherName?.toLocaleLowerCase().includes(queryToLowerCase) ||
          person.motherName?.toLocaleLowerCase().includes(queryToLowerCase),
      );
    }

    if (centuries.length) {
      filteredPeople = filteredPeople.filter(person => {
        const centuryBorn = Math.ceil(person.born / 100);

        return centuries.includes(centuryBorn.toString());
      });
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(person => person.sex === sex);
    }

    return filteredPeople;
  }, [query, people, centuries, sex]);

  const sortedPeople = useMemo(() => {
    return sortPeople(filterPeople, sortField, order);
  }, [sortField, order, filterPeople]);

  if (!sortedPeople.length) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {Errors.NotFound}
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {filters.map(filter => (
            <th key={filter}>
              <span className="is-flex is-flex-wrap-nowrap">
                {filter}
                <Link
                  onClick={e => handleSort(filter, e)}
                  to={`#${searchParams.toString()}`}
                >
                  <span className="icon">
                    <i
                      className={getSortIconClassName(filter, sortField, order)} // Use the utility function here
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople?.map(person => (
          <tr
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person}>{person.name}</PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <PersonLink person={person.mother}>
                  {person.motherName}
                </PersonLink>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father}>
                  {person.fatherName}
                </PersonLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
