import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PeopleRow } from '../PeopleRow/PeopleRow';

const mainRow = ['name', 'sex', 'born', 'died', 'father', 'mother'];

type Props = {
  people: UpdatedPersons[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigate(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const sortHandler: React.MouseEventHandler<HTMLTableCellElement> = (
    event,
  ) => {
    const result = event.currentTarget.textContent;
    const value = result?.toLowerCase().replace('*', '');

    if (value) {
      searchParams.set('sortBy', value);
    }

    if (sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    navigate(`?${searchParams.toString()}`);
  };

  let visiblePeople = [...people];

  if (appliedQuery) {
    const lowerQuery = appliedQuery.toLowerCase();

    visiblePeople = visiblePeople.filter((person) => {
      return person.name.toLowerCase().includes(lowerQuery)
        || person.motherName?.toLowerCase().includes(lowerQuery)
        || person.fatherName?.toLowerCase().includes(lowerQuery);
    });
  }

  if (sortBy) {
    visiblePeople = visiblePeople.sort((firstPerson, secondPerson) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return sortOrder === 'asc'
            ? firstPerson[sortBy].localeCompare(secondPerson[sortBy])
            : secondPerson[sortBy].localeCompare(firstPerson[sortBy]);

        case 'born':
        case 'died':
          return sortOrder === 'asc'
            ? +firstPerson[sortBy] - +secondPerson[sortBy]
            : +secondPerson[sortBy] - +firstPerson[sortBy];

        default:
          return 0;
      }
    });
  }

  return (
    <>
      <h1>People table:</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
      />
      <table
        className="PeopleTable"
        style={{ borderCollapse: 'collapse' }}
      >
        <thead>
          <tr>
            {mainRow.map((item) => {
              return (
                <>
                  {item !== 'father' && item !== 'mother'
                    ? (
                      <th
                        key={item}
                        onClick={sortHandler}
                      >

                        {sortBy === item
                          ? `${item}*`.toUpperCase()
                          : item.toUpperCase()}

                        {sortBy && sortOrder === 'asc' && (
                          <img src="../../images/sort_asc.png" alt="" />)}

                        {sortBy && sortOrder === 'desc' && (
                          <img src="../../images/sort_desc.png" alt="" />)}

                        {!sortBy
                        && <img src="../../images/sort_both.png" alt="" />}
                      </th>
                    )
                    : (
                      <th
                        key={item}
                      >
                        {item.toUpperCase()}
                      </th>
                    )}
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visiblePeople.map((person) => {
            return (
              <PeopleRow person={person} key={person.slug} />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
