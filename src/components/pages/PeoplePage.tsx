import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PeoplePageStatus, SexOption } from '../../types/types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleFilters } from '../peopleFilters/PeopleFilters';
import { PeopleTable } from '../peopleTable/PeopleTable';
import React from 'react';

const convertYearToCentury = (year: number): number => {
  if (year > 0) {
    return Math.ceil(year / 100);
  }

  if (year < 0) {
    return Math.floor(year / 100);
  }

  throw new Error('Year cannot be equal to 0!!!');
};

const personSexMeetsCriterion = (person: Person, sex: SexOption): boolean =>
  sex === SexOption.All || person.sex === sex;

const nameMeetsCriterion = (name: string | null, criterion: string): boolean =>
  !!name && name.toLowerCase().includes(criterion.toLowerCase());

const personNamesMeetCriterion = (person: Person, name: string): boolean =>
  nameMeetsCriterion(person.name, name) ||
  nameMeetsCriterion(person.motherName, name) ||
  nameMeetsCriterion(person.fatherName, name);

const personBornMeetsCriterion = (
  person: Person,
  centuries: number[],
): boolean =>
  !centuries.length || centuries.includes(convertYearToCentury(person.born));

const getFilterCallback = (
  sex: SexOption,
  centuries: number[],
  name: string,
): ((person: Person) => boolean) => {
  return (person: Person) =>
    personSexMeetsCriterion(person, sex) &&
    personBornMeetsCriterion(person, centuries) &&
    personNamesMeetCriterion(person, name);
};

export const PeoplePage = React.memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState(PeoplePageStatus.Loading);
  const [searchParams] = useSearchParams();
  const sex = (searchParams.get('sex') as SexOption | null) || SexOption.All;
  const name = searchParams.get('query') || '';
  const centuries = searchParams
    .getAll('centuries')
    .map(century => parseInt(century));
  const filteredPeople = people.filter(getFilterCallback(sex, centuries, name));

  const loadPeople = async () => {
    setStatus(PeoplePageStatus.Loading);

    try {
      const loadedPeople = await getPeople();

      setPeople(
        loadedPeople.map((personToMap, _index, peopleToMap) =>
          peopleToMap.reduce(
            (person, parent) => ({
              ...person,
              mother:
                parent.name === person.motherName ? parent : person.mother,
              father:
                parent.name === person.fatherName ? parent : person.father,
            }),
            personToMap,
          ),
        ),
      );

      if (loadedPeople.length) {
        setStatus(PeoplePageStatus.Success);
      } else {
        setStatus(PeoplePageStatus.Idle);
      }
    } catch {
      setStatus(PeoplePageStatus.Error);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  let content: React.JSX.Element;

  switch (status) {
    case PeoplePageStatus.Success:
      content = filteredPeople.length ? (
        <PeopleTable people={filteredPeople} />
      ) : (
        <p>There are no people matching the current search criteria</p>
      );
      break;
    case PeoplePageStatus.Idle:
      content = (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      );
      break;
    case PeoplePageStatus.Loading:
      content = <Loader />;
      break;
    case PeoplePageStatus.Error:
      content = (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
      break;
    default:
      throw new Error('People page status is not valid!!!');
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {status === PeoplePageStatus.Success && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
});

PeoplePage.displayName = 'PeoplePage';
