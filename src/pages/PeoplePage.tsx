import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/Search/PeopleFilters';
import { PersonTable } from '../components/PersonTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const { personSlug = '' } = useParams();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [peopleFromServer, setPeopleFromServer]
    = useState<Person[] | null>(null);

  const getParents = (people: Person[]) => {
    return people.map(child => {
      const childFather = people.find(
        father => father.name === child.fatherName,
      );

      const childMother = people.find(
        mother => mother.name === child.motherName,
      );

      const fatherName = child.fatherName ? child.fatherName : '-';
      const motherName = child.motherName ? child.motherName : '-';

      return {
        ...child,
        father: childFather,
        mother: childMother,
        fatherName,
        motherName,
      };
    });
  };

  const loadPeople = async () => {
    setIsError(false);

    const loadedPeole = await getPeople();

    try {
      if ('Error' in loadedPeole) {
        throw new Error();
      }

      setPeopleFromServer(getParents(loadedPeole));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const content = (
    <>
      <div className="column is-7-tablet is-narrow-desktop">
        <PeopleFilters />
      </div>

      <PersonTable
        selectedPerson={personSlug}
        peopleFromServer={peopleFromServer}
      />
    </>
  );

  const errorMessage = (
    <p data-cy="peopleLoadingError" className="has-text-danger column">
      Something went wrong
    </p>
  );

  const errorOrContent = isError ? errorMessage : content;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          { isLoading ? <Loader /> : errorOrContent }
        </div>
      </div>
    </>
  );
};
