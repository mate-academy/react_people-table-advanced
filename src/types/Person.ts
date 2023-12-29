export interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
  mother?: Person,
  father?: Person,
}

export interface TableColumn {
  id: number;
  title: string;
  columnCode: string;
}

export interface Title {
  name: string;
  sex: string;
  born: number;
  died: number;
}
