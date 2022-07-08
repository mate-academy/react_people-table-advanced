import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as request from '../api/request';

export const PeopleContext = React.createContext({
  people: [],
  setPeople: () => {},
});

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    request.getPeople()
      .then(result => setPeople(result));
  }, []);

  const contextValue = useMemo(() => ({
    people,
    setPeople,
  }), [people]);

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};

PeopleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
