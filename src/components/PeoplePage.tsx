import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { WarningType } from '../types/WarningType';
import { WarningMessage } from './WarningMessage';

const filterBySex = (
  peopleList: Person[],
  sex: string,
) => (
  peopleList.filter(person => person.sex === sex)
);

const filterByQuery = (
  peopleList: Person[],
  query: string,
) => (
  peopleList.filter(person => (
    person.name.toLowerCase().includes(query.trim().toLowerCase())
  ))
);

const filterByCenturies = (
  peopleList: Person[],
  centuries: string[],
) => (
  peopleList.filter(person => {
    const centuryOfBorn = String(Math.ceil(person.born / 100));

    return centuries.includes(centuryOfBorn);
  })
);

const preparePeopleList = (
  peopleList: Person[] | null,
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  if (!peopleList) {
    return null;
  }

  let preparedList = [...peopleList];

  if (sex) {
    preparedList = filterBySex(preparedList, sex);
  }

  if (query) {
    preparedList = filterByQuery(preparedList, query);
  }

  if (centuries.length > 0) {
    preparedList = filterByCenturies(preparedList, centuries);
  }

  if (sort) {
    preparedList.sort((person1, person2) => {
      const desc = order === 'desc' ? -1 : 1;

      switch (sort) {
        case 'name':
          return person1.name.localeCompare(person2.name) * desc;
        case 'sex':
          return person1.sex.localeCompare(person2.sex) * desc;
        case 'born':
          return (person1.born - person2.born) * desc;
        case 'died':
          return (person1.born - person2.born) * desc;
        default:
          return 0;
      }
    });
  }

  return preparedList;
};

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);
  const [warningMessage, setWarningMessage] = useState(WarningType.NONE);
  const [searchParams] = useSearchParams();

  const fetchPeopleList = async () => {
    setWarningMessage(WarningType.NONE);
    try {
      const peopleFromServer = await getPeople();

      const peopleListWithParents = peopleFromServer.map(person => {
        const { motherName, fatherName } = person;
        const mother = peopleFromServer.find(({ name }) => name === motherName);
        const father = peopleFromServer.find(({ name }) => name === fatherName);

        return { ...person, mother, father };
      });

      setPeopleList(peopleListWithParents);
    } catch {
      setWarningMessage(WarningType.SERVER);
    }
  };

  useEffect(() => {
    fetchPeopleList();
  }, []);

  useEffect(() => {
    if (peopleList && peopleList.length === 0) {
      setWarningMessage(WarningType.NOPEOPLE);
    }
  }, [peopleList]);

  const preparedPeopleList = useMemo(() => {
    setWarningMessage(WarningType.NONE);

    const preparedList = preparePeopleList(peopleList, searchParams);

    if (preparedList && preparedList.length === 0) {
      setWarningMessage(WarningType.NOMATCHES);

      return [];
    }

    return preparedList;
  }, [peopleList, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {preparedPeopleList || warningMessage
                ? (
                  <>
                    {preparedPeopleList && !warningMessage
                      ? <PeopleTable peopleList={preparedPeopleList} />
                      : <WarningMessage message={warningMessage} />}
                  </>
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
