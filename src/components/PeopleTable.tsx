import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleRender } from './PeopleRender';

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
