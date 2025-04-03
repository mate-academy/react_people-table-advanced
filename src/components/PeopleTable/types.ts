import { ContextDataType } from '../../utils/context/types';
import { PeoplePageStateType } from '../PeoplePage';

export enum Columns {
  name,
  sex,
  born,
  died,
  mother,
  father,
}

export type SearchParams = {
  key: string;
  value: string;
}[];

export type FetchDBParams = {
  contextData: ContextDataType;
  setPeoplePageState: React.Dispatch<React.SetStateAction<PeoplePageStateType>>;
  peoplePageState: PeoplePageStateType;
};
