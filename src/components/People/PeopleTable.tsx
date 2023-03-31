import { Person } from '../../types';

import { Loader } from '../Loader';
import PersonInfo from '../Person/PersonInfo';
import Sort from '../Sort/Sort';

type Props = {
  people: Person[];
  visiblePeople: Person[];
  isLoading: boolean;
  isError: boolean;
  isHaveNotPeople: boolean;
  isNotFoundPeople: boolean;
  personSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  visiblePeople,
  isLoading,
  isError,
  isHaveNotPeople,
  isNotFoundPeople,
  personSlug,
}) => {
  const findParent = (parent: string | null) => {
    return people.find(person => person.name === parent) || null;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError">Something went wrong</p>
    );
  }

  if (isHaveNotPeople) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  if (isNotFoundPeople) {
    return (
      <p>
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <Sort />
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const parents = {
            father: findParent(person.fatherName),
            mother: findParent(person.motherName),
          };

          return (
            <PersonInfo
              key={person.slug}
              person={person}
              personSlug={personSlug}
              parents={parents}
            />
          );
        })}
      </tbody>
    </table>
  );
};
