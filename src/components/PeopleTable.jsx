import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';

import { PersonRow } from './PersonRow';

export const PeopleTable = ({ people }) => {
  const [sortingData, setSortingData] = useState({
    name: 'asc',
    sex: 'asc',
    born: 'asc',
    died: 'asc',
    mother: '',
    father: '',
  });

  const keyWords = Object.keys(sortingData);
  const history = useHistory();
  const searchParams = new URLSearchParams(useLocation().search);

  const applySortBy = (event) => {
    const keyWord = event.target.name;

    searchParams.set('sortBy', keyWord);
    searchParams.set('sortOrder', sortingData[keyWord]);

    const newOrder = sortingData[keyWord] === 'asc'
      ? 'desc'
      : 'asc';

    setSortingData({
      ...sortingData,
      [keyWord]: newOrder,
    });

    history.push(`?${searchParams.toString()}`);
  };

  return (
    <table className="PeopleTable table is-hoverable">
      <thead className="thead">
        <tr className="tr">
          {keyWords.map(keyWord => (
            <th
              key={keyWord}
              className="th"
            >
              <div className="container th-container">

                <span>
                  {keyWord.toUpperCase()}
                </span>

                {sortingData[keyWord] && (
                  <div className="buttons">
                    <button
                      type="button"
                      className="button is-white btn-asc"
                      name={keyWord}
                      onClick={applySortBy}
                      disabled={sortingData[keyWord] === 'desc'}
                    />
                    <button
                      type="button"
                      className="button is-white btn-desc"
                      name={keyWord}
                      onClick={applySortBy}
                      disabled={sortingData[keyWord] === 'asc'}
                    />
                  </div>
                )
              }

              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="tbody">
        {people && people
          .map(person => <PersonRow key={person.name} person={person} />)
        }
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  people: PropTypes.arrayOf({ object }).isRequired,
};
