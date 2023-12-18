import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { MainContentType } from '../types/MainContentType';
import { PeopleContextType } from '../types/PeopleContextType';

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  setPeople: () => { },
  mainContent: MainContentType.NoPeople,
  setMainContent: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [mainContent, setMainContent]
    = useState<MainContentType>(MainContentType.NoPeople);

  useEffect(() => {
    setMainContent(MainContentType.Loader);

    getPeople()
      .then((items) => {
        if (items.length > 0) {
          setPeople(items);
          setMainContent(MainContentType.PeopleTable);
        } else {
          setMainContent(MainContentType.NoPeopleMessage);
        }
      })
      .catch(() => setMainContent(MainContentType.PeopleLoadingError));
  }, [setPeople]);

  const value = useMemo(() => ({
    people,
    setPeople,
    mainContent,
    setMainContent,
  }), [people, mainContent]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};
