/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { TableHeader } from './components/TableHeader';
import { PeopleList } from './components/PeopleList';
import { Context } from '../../context/PeoplePageContext';
import { useSearchParams } from 'react-router-dom';
import { loadPeopleListFromDB, updatePeopleList } from './utils/service';

export const PeopleTable: React.FC = () => {
  const contextData = useContext(Context);
  const [searchParams] = useSearchParams();

  useEffect(() => loadPeopleListFromDB(contextData), []);
  useEffect(() => {
    if (contextData.context.fullList.length) {
      updatePeopleList(contextData, searchParams);
    }
  }, [searchParams]);

  const {
    context: { listToShow, error },
  } = contextData;

  const isTableVisible = !listToShow.length || error;

  return !isTableVisible ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader />
      <PeopleList list={listToShow} />
    </table>
  ) : null;
};
