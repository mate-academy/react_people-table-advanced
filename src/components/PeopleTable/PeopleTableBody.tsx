import { useSearchParams } from 'react-router-dom';
import { PeopleContext } from '../../contexts/PeopleContext';
import { Person } from '../../types';
import { PersonRow } from './PersonRow';
import {
  CENTURIES_QUERY,
  ORDER_QUERY,
  SEARCH_QUERY,
  SEX_QUERY,
  SORT_QUERY,
} from '../../utils/searchParamConstants';
import { useMemo } from 'react';
import { Sex, SortField, SortOrder } from '../../enums';

type Props = {
  selectedPersonSlug?: Person['slug'];
};

export const PeopleTableBody = ({ selectedPersonSlug }: Props) => {
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

    // sex filter
    if (sexFilter) {
      result = result.filter(({ sex }) => (sex as Sex) === sexFilter);
    }

    // century filter
    if (centuriesFilter.length !== 0) {
      result = result.filter(({ born }) => {
        const bornCentury = Math.floor(born / 100) + 1;

        return centuriesFilter.includes(bornCentury);
      });
    }

    // name search
    if (nameQuery) {
      result = result.filter(({ name, motherName, fatherName }) => {
        return (
          name.includes(nameQuery) ||
          motherName?.includes(nameQuery) ||
          fatherName?.includes(nameQuery)
        );
      });
    }

    // ordering
    switch (sortField) {
      case null:
        break;
      case SortField.Name:
        result = [...people.value].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          return nameA.localeCompare(nameB);
        });
        break;
      case SortField.Sex:
        result = [...people.value].sort((a, b) => {
          return a.sex.localeCompare(b.sex);
        });
        break;
      case SortField.Born:
        result = [...people.value].sort((a, b) => {
          return a.born - b.born;
        });
        break;
      case SortField.Died:
        result = [...people.value].sort((a, b) => {
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
    <tbody>
      {peopleToDisplay.map(person => {
        return (
          <PersonRow
            key={person.slug}
            person={person}
            highlighted={person.slug === selectedPersonSlug}
          />
        );
      })}
    </tbody>
  );
};
