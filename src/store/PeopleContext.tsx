import { createContext, useCallback, useContext, useState } from 'react';
import { Person } from '../types';
import { PeopleContextType, PeopleDictionary, PersonSlug } from '../types';

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<PeopleDictionary>({});
  const [peopleSlugs, setPeopleSlugs] = useState<PersonSlug[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const linkRelatives = useCallback(
    (dict: PeopleDictionary, list: PersonSlug[]) => {
      const peopleByName = new Map(
        list.map(slug => [dict[slug].name, dict[slug]]),
      );

      list.forEach(slug => {
        const person = dict[slug];

        if (person.motherName) {
          person.mother = peopleByName.get(person.motherName);
        }

        if (person.fatherName) {
          person.father = peopleByName.get(person.fatherName);
        }
      });
    },
    [],
  );

  const fetchPeople = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(result => {
        if (!result.ok) {
          throw new Error();
        }

        return result.json() as Promise<Person[]>;
      })
      .then(fetchedPeople => {
        const fetchedPeopleDictionary: PeopleDictionary = {};
        const fetchedPeopleSlugList: PersonSlug[] = [];

        // TODO: Compare to existing entries?

        fetchedPeople.forEach(person => {
          const slug = person.slug;

          fetchedPeopleDictionary[slug] = person;
          fetchedPeopleSlugList.push(slug);
        });

        linkRelatives(fetchedPeopleDictionary, fetchedPeopleSlugList);

        setPeople(fetchedPeopleDictionary);
        setPeopleSlugs(fetchedPeopleSlugList);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [linkRelatives]);

  const contextValue = {
    people,
    peopleSlugs,
    fetchPeople,
    isLoading,
    hasError,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const context = useContext(PeopleContext);

  if (context === undefined) {
    throw new Error('usePeople must be used within the PeopleProvider');
  }

  return context;
}
