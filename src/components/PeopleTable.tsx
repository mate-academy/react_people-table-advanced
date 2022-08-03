import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { People } from '../types/People';
import PersonRow from './PersonRow';

type Props = {
  people: People[],
  onClickHandler: (event: React.MouseEvent<HTMLTableHeaderCellElement>,
    toggle: boolean) => void;
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
  const [toggleNameClick, setToggleNameClick] = useState(false);
  const [toggleSexClick, setToggleSexClick] = useState(false);
  const [toggleBornClick, setToggleBornClick] = useState(false);
  const [toggleDiedClick, setToggleDiedClick] = useState(false);

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
              setToggleNameClick(prevState => !prevState);
              onClickHandler(event, toggleNameClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Name
            <img src="images/sort_both.png" alt="sort_both" />
          </th>

          <th
            onClick={(event) => {
              setToggleSexClick(prevState => !prevState);
              onClickHandler(event, toggleSexClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Sex
            <img src="images/sort_both.png" alt="sort_both" />
          </th>

          <th
            onClick={(event) => {
              setToggleBornClick(prevState => !prevState);
              onClickHandler(event, toggleBornClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Born
            <img src="images/sort_both.png" alt="sort_both" />
          </th>

          <th
            onClick={(event) => {
              setToggleDiedClick(prevState => !prevState);
              onClickHandler(event, toggleDiedClick);
            }}
            style={{ cursor: 'pointer' }}
          >
            Died
            <img src="images/sort_both.png" alt="sort_both" />
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
