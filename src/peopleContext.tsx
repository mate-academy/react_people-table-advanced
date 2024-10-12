import React from 'react';
import { Person } from './types';

export const PeopleContext = React.createContext<Person[]>([]);
