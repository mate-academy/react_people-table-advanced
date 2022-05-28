import React from 'react';
import shortid from 'shortid';
import { HumanWithParents } from '../../types/Human';

import '../../styles/Title.scss';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Array<HumanWithParents>
}

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  return (
    <div className="PeopleTable">
      <h1 className="title">
        PeopleTable
      </h1>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Sex</th>
            <th scope="col">Born</th>
            <th scope="col">Died</th>
            <th scope="col">Mother</th>
            <th scope="col">Father</th>
          </tr>
        </thead>
        <tbody>
          {people.map((human, index) => (
            <PersonRow
              number={index}
              human={human}
              key={shortid.generate()}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
