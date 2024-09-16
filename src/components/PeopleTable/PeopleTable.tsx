import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleContext } from '../../contexts/PeopleContext';

import { PeopleTableBody } from './PeopleTableBody';
import { PeopleTableHead } from './PeopleTableHead';

import { SortField, SortOrder, Sex } from '../../enums';
import { Person } from '../../types';
import {
  CENTURIES_QUERY,
  ORDER_QUERY,
  SEARCH_QUERY,
  SEX_QUERY,
  SORT_QUERY,
} from '../../utils/searchParamConstants';

type Props = {
  selectedPersonSlug?: Person['slug'];
};

export const PeopleTable = ({ selectedPersonSlug }: Props) => {
  const { people } = PeopleContext.useState();
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get(SORT_QUERY) as SortField | null;
  const sortOrder = searchParams.get(ORDER_QUERY) as SortOrder | null;
  const sexFilter = searchParams.get(SEX_QUERY) as Sex | null;
  const centuriesFilter = searchParams
    .getAll(CENTURIES_QUERY)
    .map(str => Number(str));
  const nameQuery = searchParams.get(SEARCH_QUERY);

  const peopleToDisplay = useMemo(() => {
    let result = people.value;

    if (sexFilter) {
      result = result.filter(({ sex }) => (sex as Sex) === sexFilter);
    }

    if (centuriesFilter.length !== 0) {
      result = result.filter(({ born }) => {
        const bornCentury = Math.floor(born / 100) + 1;

        return centuriesFilter.includes(bornCentury);
      });
    }

    if (nameQuery) {
      result = result.filter(({ name, motherName, fatherName }) => {
        return (
          name.toLocaleLowerCase().includes(nameQuery) ||
          motherName?.toLocaleLowerCase().includes(nameQuery) ||
          fatherName?.toLocaleLowerCase().includes(nameQuery)
        );
      });
    }

    switch (sortField) {
      case null:
        break;
      case SortField.Name:
        result = [...result].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          return nameA.localeCompare(nameB);
        });
        break;
      case SortField.Sex:
        result = [...result].sort((a, b) => {
          return a.sex.localeCompare(b.sex);
        });
        break;
      case SortField.Born:
        result = [...result].sort((a, b) => {
          return a.born - b.born;
        });
        break;
      case SortField.Died:
        result = [...result].sort((a, b) => {
          return a.died - b.died;
        });
        break;
    }

    if (sortOrder === SortOrder.Descending) {
      result = result.reverse();
    }

    return result;
  }, [
    centuriesFilter,
    nameQuery,
    people.value,
    sexFilter,
    sortField,
    sortOrder,
  ]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {peopleToDisplay.length ? (
        <>
          <PeopleTableHead />
          <PeopleTableBody
            people={peopleToDisplay}
            selectedPersonSlug={selectedPersonSlug}
          />
        </>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </table>
  );
};
