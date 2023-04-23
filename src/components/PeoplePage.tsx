import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import {PeopleTable} from "./PeopleTable";
import {getPeople} from "../api";
import {Person} from "../types";

function getParentByName(name: string | null, peopleArray: Person[]) {
  const parent = peopleArray.find(person => person.name === name);

  return parent || null;
}

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasServerError, setHasServerError] = useState(false);
  const { personSlug = '' } = useParams();

  const getPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => {
        const personWithParents = {...person};
        const mother = getParentByName(person.motherName, peopleFromServer);
        const father = getParentByName(person.fatherName, peopleFromServer);

        if (mother) {
          personWithParents.mother = mother;
        }

        if (father) {
          personWithParents.father = father;
        }

        return personWithParents;
      });

      setPeople(peopleWithParents);
    } catch {
      setHasServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const peopleExist = people.length > 0;

  return (
    <div className="container">
      <h1 className="title is-1">People Page</h1>
      <div className="block">

        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleExist && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasServerError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong!
                </p>
              )}

              {!peopleExist && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleExist && (
                <PeopleTable people={people} selectedPersonSlug={personSlug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
