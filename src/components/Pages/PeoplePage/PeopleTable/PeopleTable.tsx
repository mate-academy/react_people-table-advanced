import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../../../../types';
import { SearchParamsTypes } from '../../../../types/SearchParamsTypes';
import { TableHeaderItem, PersonBlock } from './index';

import { filterPeople, sortsPeople } from '../../../../utils';

const {
  Query, Centuries, Sex, Order, Sort,
} = SearchParamsTypes;

type Props = {
  peopleList: Person[],
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const TableHeaderList = ['Name', 'Sex', 'Born', 'Died'];
  const [showNoPeople, setShowNoPeople] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get(Sort) || '';
  const order = searchParams.get(Order) || '';
  const query = searchParams.get(Query) || '';
  const centuries = searchParams.getAll(Centuries) || [];
  const sexFilter = searchParams.get(Sex);
  const location = useLocation();

  const filterPeopleList
    = useMemo(() => {
      return filterPeople(peopleList, query, centuries, sexFilter);
    }, [centuries, sexFilter, query]);

  const sortList
    = useMemo(() => sortsPeople(
      [...filterPeopleList], sort, order,
    ), [order, sort, filterPeopleList]);

  useEffect(() => setShowNoPeople(true), [query]);

  return (
    <>
      {showNoPeople && !filterPeopleList.length && location.search
        && (<p>There are no people matching the current search criteria</p>)}
      <TransitionGroup>

        {filterPeopleList.length !== 0 && (
          <CSSTransition
            timeout={500}
            classNames="fade"
          >
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                {TableHeaderList.map(item => <TableHeaderItem item={item} />)}
                <th>Mother</th>
                <th>Father</th>
              </thead>
              <tbody>
                {sortList.map((person) => (
                  <PersonBlock key={person.name} person={person} />
                ))}
              </tbody>
            </table>
          </CSSTransition>
        )}

      </TransitionGroup>
    </>

  );
};
