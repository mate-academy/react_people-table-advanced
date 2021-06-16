/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { debounce } from '../../scripts/debounce';
import { getUsers } from '../../api';
import { Table } from './Table';

import './PeopleTable.scss';

const searchQueryDelay = 500;

export const PeopleTable = React.memo(
  withRouter(
    ({ match }) => {
      const history = useHistory();
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query') || '';

      const [people, setPeople] = useState([]);
      const [searchValue, setSearchValue] = useState(query);
      const [activeInpute, setActiveInpute] = useState(false);

      useEffect(() => {
        getUsers()
          .then(setPeople);
      }, []);

      const handleQueryChange = (value, params) => {
        params.set('query', value);

        if (value === '') {
          params.delete('query');
        }

        return history.push({ search: `${params.toString()}` });
      };

      const applyQuery = useCallback(
        debounce(handleQueryChange, searchQueryDelay),
        [searchQueryDelay],
      );

      const visiblePeople = people.filter((person) => {
        const lowerQuery = query.toLowerCase();

        return person.name.toLowerCase().includes(lowerQuery)
          || person.fatherName?.toLowerCase().includes(lowerQuery)
          || person.motherName?.toLowerCase().includes(lowerQuery);
      });

      return (
        <section className="people-section">
          <h2 className="people-section__title">
            People table
          </h2>

          <div className="people-section__search">
            <label
              htmlFor="search-field"
              className="people-section__search-label"
            >
              <span className="people-section__search-label-text">
                Find the person
              </span>

              <div
                className={classNames(
                  'people-section__search-input-wrapper',
                  {
                    'people-section__search-input-wrapper--active':
                      activeInpute,
                  },
                )}
              >
                <input
                  id="search-field"
                  className="people-section__search-input"
                  type="text"
                  placeholder="Enter the name"
                  value={searchValue}
                  onFocus={() => {
                    setActiveInpute(true);
                  }}
                  onBlur={() => {
                    setActiveInpute(false);
                  }}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                    applyQuery(event.target.value, searchParams);
                  }}
                />

                <label
                  htmlFor="search-field"
                  className="people-section__search-icon"
                />
              </div>
            </label>
          </div>

          <Table people={visiblePeople} selectedSlug={match.params.slug} />
        </section>
      );
    },
  ),
);
