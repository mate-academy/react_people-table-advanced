import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { People } from '../types/People';
import PersonRow from './PersonRow';

type Props = {
  people: People[],
  onClickHandler: (event: React.MouseEvent<HTMLTableHeaderCellElement>,
    count: number) => void;
  userSort: string | null
};

export const PeopleTable: FC<Props> = ({
  people,
  onClickHandler,
  userSort,
}) => {
  const peopleWithParent = people.map(person => {
    const mother = people
      .find(human => person.motherName === human.name) || person.motherName;
    const father = people
      .find(human => person.fatherName === human.name) || person.fatherName;

    return { ...person, motherName: mother, fatherName: father };
  });
  const [countNameClick, setCountNameClick] = useState(0);
  const [countSexClick, setCountSexClick] = useState(0);
  const [countBornClick, setCountBornClick] = useState(0);
  const [countDiedClick, setCountDiedClick] = useState(0);

  const isActive = (str: string | null) => {
    return str === userSort;
  };

  return (
    <table
      className="PeopleTable table is-narrow is-fullwidth"
      style={{ borderCollapse: 'collapse' }}
    >
      <colgroup>
        <col
          className={classNames({ active: isActive('Name') })}
        />

        <col
          className={classNames({ active: isActive('Sex') })}
        />

        <col
          className={classNames({ active: isActive('Born') })}

        />

        <col
          className={classNames({ active: isActive('Died') })}
        />

        <col />

        <col />
      </colgroup>
      <thead>
        <tr>
          <th
            onClick={(event) => {
              setCountNameClick(prevState => prevState + 1);
              onClickHandler(event, countNameClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Name
            <img src="images/sort_both.png" alt="sort_both" />
          </th>

          <th
            onClick={(event) => {
              setCountSexClick(prevState => prevState + 1);
              onClickHandler(event, countSexClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Sex
          </th>

          <th
            onClick={(event) => {
              setCountBornClick(prevState => prevState + 1);
              onClickHandler(event, countBornClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Born
          </th>

          <th
            onClick={(event) => {
              setCountDiedClick(prevState => prevState + 1);
              onClickHandler(event, countDiedClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Died
          </th>

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {peopleWithParent.map((person) => {
          return (
            <PersonRow
              person={person}
              key={person.born + person.died + Math.random()}
            />
          );
        })}
      </tbody>
    </table>
  );
};
