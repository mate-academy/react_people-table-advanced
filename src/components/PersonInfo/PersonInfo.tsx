import React from 'react';
import { ServerIPerson } from '../../api/interface';
import { PersonName } from '../PersonName';

import './PersonInfo.scss';

type PersonInfo = {
  person: ServerIPerson | undefined;
};

export const PersonInfo: React.FC<PersonInfo> = ({ person }) => (
  <ul>
    <li className="parents-info">
      Name:
      <PersonName
        person={person}
      />
    </li>
    <li className="parents-info">
      Sex:
      {person?.sex}
    </li>
    <li className="parents-info">
      Born:
      {person?.born}
    </li>
    <li className="parents-info">
      Died:
      {person?.died}
    </li>
  </ul>
);
