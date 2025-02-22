type Centuries = '16' | '17' | '18' | '19' | '20';

export enum Gender {
  All = '',
  Male = 'm',
  Female = 'f',
}

export type Filter = {
  centuries: Centuries[];
  sex: Gender.Male | Gender.Female | null;
  query: string;
};

export const CENTURIES_LINK: Centuries[] = ['16', '17', '18', '19', '20'];
