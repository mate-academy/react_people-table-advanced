type Param = string | number;

export interface Params {
  [key: string]: Param[] | Param | null;
}
