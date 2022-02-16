import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './PeoplePage.scss';
import debounce from 'lodash/debounce';
import { PersonRow } from './PersonRow';
import sortBoth from '../../images/sort_both.png';
import sortAsc from '../../images/sort_asc.png';
import sortDesc from '../../images/sort_desc.png';

interface People {
  name: string,
  sex: string,
  born: string,
  died: string,
  motherName: string,
  fatherName: string,
}

type Props = {
  people: People[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortByName, setSortByName] = useState('asc');
  const [sortBySex, setSortBySex] = useState('asc');
  const [sortByBorn, setSortByBorn] = useState('asc');
  const [sortByDied, setSortByDied] = useState('asc');
  const [filteredPeople, setFilteredPeople] = useState(people);

  const [imgName, setImgName] = useState(sortBoth);
  const [imgSex, setImgSex] = useState(sortBoth);
  const [imgBorn, setImgBorn] = useState(sortBoth);
  const [imgDied, setImgDied] = useState(sortBoth);

  const queryText = searchParams.get('query') || '';
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    setSortOrder(searchParams.get('sortOrder') || '');
  });

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        if (newQuery && sortBy && sortOrder) {
          const params = {
            query: newQuery,
            sortBy,
            sortOrder,
          };

          setSearchParams(params);
        } else if (newQuery) {
          setSearchParams({ query: newQuery });
        }
      } else {
        setSearchParams({});
      }
    }, 1000), [],
  );

  const HandleQueryChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value);
    applyQuery(event.currentTarget.value);
  };

  useEffect(() => {
    setFilteredPeople(people.filter(person => {
      const match = `${person.name} ${person.fatherName} ${person.motherName}`;

      return match.toLowerCase().includes(queryText.toLowerCase());
    }));
  }, [queryText]);

  const sortTable = (table: People[]) => {
    if (sortBy) {
      switch (sortBy) {
        case 'name':
          table.sort((a, b) => {
            return sortByName === 'desc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case 'sex':
          table.sort((a, b) => {
            return sortBySex === 'desc'
              ? a.sex.localeCompare(b.sex)
              : b.sex.localeCompare(a.sex);
          });
          break;
        case 'born':
          table.sort((a, b) => {
            return sortByBorn === 'desc'
              ? +a.born - +b.born
              : +b.born - +a.born;
          });
          break;
        case 'died':
          table.sort((a, b) => {
            return sortByDied === 'desc'
              ? +a.died - +b.died
              : +b.died - +a.died;
          });
          break;

        default:
          break;
      }
    }

    return filteredPeople;
  };

  return (
    <>
      <div className="input__container section">
        Find person:
        <input
          className="input"
          type="text"
          value={query}
          onChange={HandleQueryChange}
          onFocus={() => {
            setImgSex(sortBoth);
            setImgBorn(sortBoth);
            setImgDied(sortBoth);
            setImgName(sortBoth);
          }}
        />
      </div>
      <table className="PeopleTable">
        <thead>
          <tr>
            <th>
              <Link
                to={queryText
                  ? `?query=${queryText}&?sortBy=${sortBy}&sortOrder=${sortByName}`
                  : `?sortBy=name&sortOrder=${sortByName}`}
                className="people-table__link"
                onClick={() => {
                  setSortByName(sortByName === 'asc' ? 'desc' : 'asc');
                  setImgName(sortByName === 'asc' ? sortAsc : sortDesc);
                  setImgSex(sortBoth);
                  setImgBorn(sortBoth);
                  setImgDied(sortBoth);
                  setSortBy('name');
                }}
              >
                name
                <img src={imgName} alt="sort_both" />
              </Link>
            </th>
            <th>
              <Link
                to={queryText
                  ? `?query=${queryText}&?sortBy=${sortBy}&sortOrder=${sortBySex}`
                  : `?sortBy=sex&sortOrder=${sortBySex}`}
                className="people-table__link"
                onClick={() => {
                  setSortBySex(sortBySex === 'asc' ? 'desc' : 'asc');
                  setImgSex(sortBySex === 'asc' ? sortAsc : sortDesc);
                  setImgName(sortBoth);
                  setImgBorn(sortBoth);
                  setImgDied(sortBoth);
                  setSortBy('sex');
                }}
              >
                sex
                <img src={imgSex} alt="sort_both" />
              </Link>
            </th>
            <th>
              <Link
                to={queryText
                  ? `?query=${queryText}&?sortBy=${sortBy}&sortOrder=${sortByBorn}`
                  : `?sortBy=born&sortOrder=${sortByBorn}`}
                className="people-table__link"
                onClick={() => {
                  setSortByBorn(sortByBorn === 'asc' ? 'desc' : 'asc');
                  setImgBorn(sortByBorn === 'asc' ? sortAsc : sortDesc);
                  setImgSex(sortBoth);
                  setImgName(sortBoth);
                  setImgDied(sortBoth);
                  setSortBy('born');
                }}
              >
                born
                <img src={imgBorn} alt="sort_both" />
              </Link>
            </th>
            <th>
              <Link
                to={queryText
                  ? `?query=${queryText}&?sortBy=${sortBy}&sortOrder=${sortByDied}`
                  : `?sortBy=died&sortOrder=${sortByDied}`}
                className="people-table__link"
                onClick={() => {
                  setSortByDied(sortByDied === 'asc' ? 'desc' : 'asc');
                  setImgDied(sortByDied === 'asc' ? sortAsc : sortDesc);
                  setImgSex(sortBoth);
                  setImgBorn(sortBoth);
                  setImgName(sortBoth);
                  setSortBy('died');
                }}
              >
                died
                <img src={imgDied} alt="sort_both" />
              </Link>
            </th>
            <th>father</th>
            <th>mother</th>
          </tr>
        </thead>

        <tbody>
          {sortTable(filteredPeople).map(person => (
            <PersonRow
              person={person}
              people={people}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
