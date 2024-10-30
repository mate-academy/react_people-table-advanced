import React from 'react';

import { Loader } from './Loader';
import { PeopleRender } from './PeopleRender';

import { Person } from '../types';

interface Props {
  people: Person[];
  isLoading: boolean;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, isLoading }) => {
  return (
    <>{isLoading === true ? <Loader /> : <PeopleRender people={people} />}</>
  );
};
