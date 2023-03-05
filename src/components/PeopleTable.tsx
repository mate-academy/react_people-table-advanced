import React, {
} from 'react';
import {
  useParams,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { Sort } from '../types/Sort';

import { PersonLink } from './PersonLink';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { SearchLinkChildren } from './SearchLinkChildren';
import { Search } from '../types/Search';

type Props = {
  orderedPeople: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  orderedPeople,
}) => {
  const { slug = '' } = useParams();
  const isSelected = (person: Person) => slug === `${person.slug}`;
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(Search.sort) || null;
  const order = searchParams.get(Search.order) || null;

  const foundParent = (name: string) => {
    return orderedPeople?.find(person => person.name === name);
  };

  const sortedParamsUpdate = (sortType: Sort): SearchParams => {
    const isSortedBy = sort === sortType;
    const isDescOrder = !!order;

    if (isSortedBy && isDescOrder) {
      return { sort: null, order: null };
    }

    if (!isSortedBy && isDescOrder) {
      return { sort: sortType, order: null };
    }

    return isSortedBy ? { order: Sort.desc } : { sort: sortType };
  };

  const capitalize = (name: string): string => {
    return name[0].toUpperCase() + name.slice(1);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Sort).slice(1).map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {capitalize(column)}
                <SearchLink
                  params={sortedParamsUpdate(column)}
                >
                  <SearchLinkChildren
                    sortType={column}
                    sort={sort}
                    order={order}
                  />
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {orderedPeople.map(person => (
          <tr
            data-cy="person"
            className={classNames(
              { 'has-background-warning': isSelected(person) },
            )}
            key={person.name}
          >
            <PersonLink hasParent={person} />
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.motherName ? (
              <PersonLink
                name={person.motherName}
                hasParent={foundParent(person.motherName)}
              />
            ) : (
              <td>-</td>
            )}
            {person.fatherName ? (
              <PersonLink
                name={person.fatherName}
                hasParent={foundParent(person.fatherName)}
              />
            ) : (
              <td>-</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
