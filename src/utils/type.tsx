export type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
};

export type Identity = {
  human: string | null;
  slug: string;
  people: Person[];
};

export type PeoplefromComp < T, P > = {
  people: T[];
  onAddPerson: P;
};

export type People < T, P> = {
  people: T[];
  personId: P;
};

export type PersonData <T, P, F> = {
  person: T;
  index: P;
  personId?: F;
  people: T[];
};

export interface MatchParams {
  slug?: string;
  formRoute?: string;
}

export type Header = string[];

export type HeaderProp = {
  header: string;
};

export interface FormField {
  name: string;
  sex: string;
  born: string;
  died: string;
  mother?: string;
  father?: string;
  slug?: string;
  submit?: string;
}

export type FieldError = {
  [key: string]: string;
};

export type ValidateOnSubmit = (values: FormField) => FieldError;

export type ValidatOnChange = (event: React.ChangeEvent<HTMLSelectElement>
| React.ChangeEvent<HTMLInputElement>) => string;

export type Sumbit = (message: string) => void;

export type EventInput = React.ChangeEvent<HTMLSelectElement>
| React.ChangeEvent<HTMLInputElement>;

export type EventForm = React.FormEvent<HTMLFormElement>;

export type CheckPerson = (form: FormField, people: Person[]) => boolean;
export type AddPerson = (form: FormField) => void;

export type CreateSlug = (name: string, bornYear: string) => string;
