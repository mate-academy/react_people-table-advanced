/* eslint-disable @typescript-eslint/indent */
import { Person } from '../../types';

export interface Lists {
  fullList: Person[] | [];
  listToShow: Person[] | [];
}

export interface ContextDataType {
  context: Lists;
  setContextData: React.Dispatch<React.SetStateAction<Lists>>;
}
