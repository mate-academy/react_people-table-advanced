import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const { personId } = useParams();
  const selectedPersonId = personId;

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function getPeopleWithParents(peopleResponce: Person[]) {
    return peopleResponce.map(pers => ({
      ...pers,
      mother:
        peopleResponce.find(parent => parent.name === pers.motherName) ||
        pers.motherName,
      father:
        peopleResponce.find(parent => parent.name === pers.fatherName) ||
        pers.fatherName,
    }));
  }

  function getCellWithMothername(person: Person) {
    if (!person.motherName) {
      return '-';
    }

    if (typeof person.mother === 'string') {
      return person.motherName;
    }

    return (
      <Link to={person.mother?.slug || ''} className="has-text-danger">
        {person.motherName}
      </Link>
    );
  }

  function getCellWithFathername(person: Person) {
    if (!person.fatherName) {
      return '-';
    }

    if (typeof person.father === 'string') {
      return person.fatherName;
    }

    return <Link to={person.father?.slug || ''}>{person.fatherName}</Link>;
  }

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(response => setPeople(getPeopleWithParents(response)))
      .catch(() => setHasError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const preparedPeople = getFilteredPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return (
    <>
      {' '}
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <PeopleTable
            people={preparedPeople}
            isPeopleLoading={isPeopleLoading}
            hasError={hasError}
            selectedPersonId={selectedPersonId}
            getCellWithMothername={getCellWithMothername}
            getCellWithFathername={getCellWithFathername}
          />
        </div>
      </div>
    </>
  );
};
