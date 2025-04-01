import { Person } from '../../types';
import { PeopleStateType } from '../PeoplePage';
import { TableStateType } from './types';

export const getPersonByName = (name: string, list: Person[]) =>
  list.find(per => name === per.name);

export const getPeopleListFromDB = (
  getPeople: () => Promise<Person[]>,
  peopleState: PeopleStateType,
  setPeopleState: React.Dispatch<React.SetStateAction<PeopleStateType>>,
  tableState: TableStateType,
  setTableState: React.Dispatch<React.SetStateAction<TableStateType>>,
) => {
  getPeople()
    .then(list => {
      setTableState({
        ...tableState,
        initialList: list,
        listToShow: list,
      });

      setPeopleState({
        ...peopleState,
        isLoading: false,
        error: list.length ? null : 'empty',
      });
    })
    .catch(() => {
      setPeopleState({
        ...peopleState,
        isLoading: false,
        error: 'unloaded',
      });
    });
};
