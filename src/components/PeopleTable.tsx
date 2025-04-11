import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { PersonTableRow } from './PersonTableRow';
import { TableHeadWithSort } from './PeopleTableSort';
import {
  filteredBySex,
  filteredByCenturies,
  filterByQuery,
  sortByParams,
} from '../utils/filterHelper';

import { Person, SearchParamsType } from '../types';
import { SearchParamsOptions } from '../types/enums';

type Props = {
  peopleList: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [searchParams] = useSearchParams();

  const params = {
    centuries: searchParams.getAll(SearchParamsOptions.centuries) || [],
    sex: searchParams.get(SearchParamsOptions.sex) || '',
    query: searchParams.get(SearchParamsOptions.query) || '',
    order: searchParams.get(SearchParamsOptions.order) || '',
    sort: searchParams.get(SearchParamsOptions.sort) || '',
  };

  const filteredPeople = (filteredParams: SearchParamsType) => {
    let filteredList = peopleList;

    if (filteredParams.centuries.length > 0) {
      filteredList = filteredByCenturies(
        filteredList,
        filteredParams.centuries,
      );
    }

    if (filteredParams.sex) {
      filteredList = filteredBySex(filteredList, filteredParams.sex);
    }

    if (params.query) {
      filteredList = filterByQuery(filteredList, params.query);
    }

    if (filteredParams.sort) {
      filteredList = sortByParams(filteredList, filteredParams.sort);
    }

    if (params.order !== '') {
      filteredList = filteredList.reverse();
    }

    return filteredList;
  };

  const visiblePeople = filteredPeople(params);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <TableHeadWithSort />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonTableRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
