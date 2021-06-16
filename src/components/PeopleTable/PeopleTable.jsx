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
      const [people, setPeople] = useState([]);
      const [searchValue, setSearchValue] = useState(null);
      const [activeInpute, setActiveInpute] = useState(false);

      useEffect(() => {
        getUsers()
          .then(addParents);
      }, []);

      function addParents(array) {
        const peopleWithParents = [...array].map((person) => {
          const father = array.find(human => human.name === person.fatherName);
          const mother = array.find(human => human.name === person.motherName);

          return {
            ...person,
            father,
            mother,
          };
        });

        setPeople(peopleWithParents);
      }

      const history = useHistory();
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query') || '';

      if (searchValue === null) {
        setSearchValue(query);
      }

      const handleQueryChange = useCallback(
        (value) => {
          const pathName = location.pathname;
          const hash = location.hash || '';

          searchParams.set('query', value);

          if (value === '') {
            searchParams.delete('query');
          }

          return history.replace(
            `${pathName}?${searchParams.toString()}${hash}`,
          );
        },
        [location, searchParams, history],
      );

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
                    applyQuery(event.target.value);
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
