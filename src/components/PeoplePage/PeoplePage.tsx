import React, { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../../api';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import PersonName from './PersonName';
import TableHeader from './TableHeader';
import { Search} from '../Search/Search';

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  father: string;
  mother: string;
  motherName: string;
  fatherName: string;
}

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const sortByOrder = searchParams.get('sortByOrder');
  const selectors = ['name', 'sex', 'born', 'died'];
  const tableHeaders = ['Name', 'Sex', 'Born', 'Died'];
  const query = searchParams.get('query') || '';

  const params: { person: string } = useParams();

  let getfiltredPeople = () => {
    let filtredPeople = query
      ? people.filter(
          (person) =>
            person.name.toLowerCase().includes(query) ||
            (person.fatherName &&
              person.fatherName.toLowerCase().includes(query)) ||
            (person.motherName &&
              person.motherName.toLowerCase().includes(query))
        )
      : people;

    if (sortBy && selectors.some((item) => item === sortBy)) {
      filtredPeople = filtredPeople.sort((personA, personB): number => {
        if (sortBy === 'name' || sortBy === 'sex') {
          return sortByOrder === 'asc' || !sortByOrder
            ? personA[sortBy].localeCompare(personB[sortBy])
            : personB[sortBy].localeCompare(personA[sortBy]);
        }

        if (sortBy === 'born' || sortBy === 'died') {
          return sortByOrder === 'asc' || !sortByOrder
            ? personA[sortBy] - personB[sortBy]
            : personB[sortBy] - personA[sortBy];
        }

        return 0;
      });
    }

    return filtredPeople;
  };

  useEffect(() => {
    getPeople().then((people) => {
      const peopleWithParents = people.map((person: Person) => {
        person.mother = person.motherName;
        person.father = person.fatherName;
        return person;
      });
      setPeople(peopleWithParents);
    });
  }, [people]);

  const filtredPeople = useMemo(() => getfiltredPeople(), [
    query,
    sortByOrder,
    sortBy,
    people,
  ]);

  const parsParamsName = () => {
    if (params.person) {
      const arrFromName = params.person.split('-');
      const paramsName = arrFromName.slice(0, arrFromName.length - 1).join(' ');

      return paramsName;
    }

    return '';
  };

  const paramsName = parsParamsName();

  return (
    <div>
      <Search searchParams={searchParams} />
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item) => (
              <TableHeader
                sortBy={sortBy}
                title={item}
                searchParams={searchParams}
                key={item}
              />
            ))}
            <td>Mother</td>
            <td>Father</td>
          </tr>
        </thead>
        <tbody>
          {filtredPeople.map((person) => (
                <tr className={classNames({ row: paramsName === person.name.toLowerCase() })}>
                <td className="person-name">
                  <PersonName
                    person={person}
                    name={person.name}
                    paramsName={paramsName}
                    people={people}
                  />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  <PersonName
                    person={person}
                    name={person.mother}
                    paramsName={paramsName}
                    people={people}
                  />
                </td>
                <td>
                  <PersonName
                    person={person}
                    name={person.father}
                    paramsName={paramsName}
                    people={people}
                  />
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeoplePage;
