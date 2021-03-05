export type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug?: string,
}

export type PeopleFilterProps = {
  handleQueryChange: (query: string) => void,
  query: string,
};

export type PeopleFormProps = {
  people: Person[],
  setIsFormRequired: (bool: boolean) => void;
  setPeople: (people: Person[]) => void
};

export type PeopleTableProps = {
  people: Person[];
};

export type PersonNameProps = {
  person: Person | undefined,
};

export type PersonRowProps = {
  person: Person,
  people: Person[];
  slug: string,
};

export type TableHeaderProps = {
  header: string,
  filteredPeople: Person[],
};