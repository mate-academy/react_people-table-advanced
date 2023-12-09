import { Param } from "./Param";

export type Params = {
  [key: string]: Param[] | Param | null;
};