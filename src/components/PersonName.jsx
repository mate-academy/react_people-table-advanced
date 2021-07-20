import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export function PersonName({ person }) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleOnClick = () => {
    searchParams.set('slug', person.slug);
    history.push(`?${searchParams.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={`${person.sex === 'm' ? 'manColor' : 'womenColor'}`}
    >
      {person.name}
    </button>
  );
}

PersonName.propTypes = {
  person: PropTypes.objectOf(PropTypes.string).isRequired,
};
