export interface Human {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string ;
  motherName: string;
  slug: string;
}

export interface Child extends Human {
  mother?: Human;
  father?: Human;
}
