/*eslint-disable*/
import React, { createContext, useEffect, useMemo, useState } from "react";
import { getPeople } from "../api";
import { Person } from "../types";
import { ERRORS } from "../types/ErrorsEnum";
import { findPeopleFamily } from "../utils/findPeopleFamily";
import { useSearchParams } from "react-router-dom";
import { SEX } from "../types/SexEnum";
import { filterPeople } from "../utils/filterPeople";
import { SORT } from "../types/SortEnum";

interface IContext {
  peoples: Person[];
  peopleLoading: boolean;
  peopleError: ERRORS;
  query: string;
  sex: SEX;
  centuries: string[];
  sort: SORT;
  order: string;
}

export const PeopleContext = createContext<IContext>({
  peoples: [],
  peopleLoading: false,
  peopleError: ERRORS.NONE,
  query: "",
  sex: SEX.ALL,
  centuries: [],
  sort: SORT.ALL,
  order: "",
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleError, setPeopleError] = useState<ERRORS>(ERRORS.NONE);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const sex = searchParams.get("sex" || SEX.ALL) as SEX;
  const centuries = searchParams.getAll("centuries") || [];

  const sort = (searchParams.get("sort") || SORT.ALL) as SORT;
  const order = searchParams.get("order") || "";

  useEffect(() => {
    setPeopleLoading(true);
    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setPeopleError(ERRORS.EMPTY);
          throw Error();
        }

        setPeoples(findPeopleFamily(peopleFromServer));
      })
      .catch(() => setPeopleError(ERRORS.SERVER))
      .finally(() => setPeopleLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    return filterPeople(peoples, {
      gender: sex,
      query,
      centuries,
      sort,
      order,
    });
  }, [peoples, query, sex, centuries]);

  const value = {
    peoples: visiblePeople,
    peopleLoading,
    peopleError,
    sex,
    query,
    centuries,
    sort,
    order,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
