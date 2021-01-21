export interface ServerIPerson {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
}

export interface Validation {
  name: boolean;
  sex: boolean;
  born: boolean;
  died: boolean;
}

export interface SortOrderI {
  [key: string]: string;
  Name: string;
  Sex: string;
  Born: string;
  Died: string;
}

interface ThTitleI {
  name: string;
  isSortable: boolean;
}

export interface THEADTITLEI {
  [key: string]: ThTitleI;
  Name: ThTitleI;
  Sex: ThTitleI;
  Born: ThTitleI;
  Died: ThTitleI;
  Father: ThTitleI;
  Mother: ThTitleI;
}
