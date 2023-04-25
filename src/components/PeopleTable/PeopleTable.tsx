import {
  FC, useMemo,
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { HeaderTables } from '../PartsTable/HeaderTables';
import { Person } from '../../types/Person';
import { BodyTables } from '../PartsTable/BodyTables';
import { filterAndSortPeople } from '../../utils/filterAndSortPeople';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get('query');
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const visiblePeople = useMemo(() => filterAndSortPeople(
    people,
    currentQuery,
    currentSex,
    currentCenturies,
    currentSort,
    currentOrder,
  ), [searchParams]);

  if (!visiblePeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <HeaderTables />

      <BodyTables visiblePeople={visiblePeople} selectedSlug={slug} />
    </table>
  );
};
