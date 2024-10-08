type Param = string | number;

export type Params = {
  [key: string]: null | Param | Param[];
};
