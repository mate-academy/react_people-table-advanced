import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

export function Form({ searchParams }) {
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const history = useHistory();
  const applyQuery = useCallback(
    debounce((newQuary) => {
      if (newQuary) {
        searchParams.delete('sortBy');
        searchParams.set('query', newQuary);
      } else {
        searchParams.delete('query');
      }

      history.push(`?${searchParams.toString()}`);
    }, 1000),
    [],
  );

  const onChange = (event) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  return (
    <form>
      <div className="field">
        <div className="control">
          <label className="label">
            User Name
            <input
              className="input"
              type="text"
              placeholder="user name"
              value={query}
              onChange={onChange}
            />
          </label>
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  searchParams: PropTypes.shape({
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }).isRequired,
};
