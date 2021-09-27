/// <reference types="react-scripts" />

interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

interface PersonWithParents extends Person {
  father: Person,
  mother: Person,
  id: string,
}

interface MatchParams {
  personSlug?: string,
}

type MatchProps = RouteComponentProps<MatchParams>;
