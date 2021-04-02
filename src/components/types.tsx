export type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

export type People = {
  people: Person[];
};

export type personDetails = {
  person: Person | undefined;
};

export type Header = {
  header: string;
};

type ParamsObj = {
  personId: string;
};

export type Params = {
  params: ParamsObj;
};
