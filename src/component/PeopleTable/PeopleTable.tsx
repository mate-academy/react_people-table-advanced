import React from 'react';

import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

type Props = {
  visiblePeople: Person[],
  handleSortChang: (event: React.MouseEvent<HTMLElement>) => void,
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople, handleSortChang }) => {
  return (
    <>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th
              className="PeopleTable__title"
              onClick={handleSortChang}
            >
              Name
            </th>
            <th
              className="PeopleTable__title"
              onClick={handleSortChang}
            >
              Sex
            </th>
            <th
              className="PeopleTable__title"
              onClick={handleSortChang}
            >
              Born
            </th>
            <th
              className="PeopleTable__title"
              onClick={handleSortChang}
            >
              Died
            </th>
            <th className="pl-6">
              Father
            </th>
            <th className="pl-6">
              Mather
            </th>
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map(person => (
            <PersonRow person={person} key={person.slug} visiblePeople={visiblePeople} />
          ))}
        </tbody>
      </table>
    </>
  );
};
