import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';
import { SortParam } from '../types/SortParam';
import { Sex } from '../types/Sex';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Prop = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Prop> = ({ peopleList }) => {
  const { personSlug } = useParams();
  const [processedPeopleList, setProcessedPeopleList] =
    useState<Person[]>(peopleList);
  const [searchParams] = useSearchParams();
  const [sortParam, setSortParam] = useState<string | null>();
  const [order, setOrder] = useState<string | null>();
  const [sexFilter, setSexFilter] = useState<string | null>();
  const [query, setQuery] = useState<string | null>('');
  const [centuries, setCenturies] = useState<string[] | null>(null);

  useEffect(() => {
    setSortParam(searchParams.get('sort'));
    setOrder(searchParams.get('order'));
    setSexFilter(searchParams.get('sex'));
    setQuery(searchParams.get('query'));
    setCenturies(searchParams.getAll('centuries'));
  }, [searchParams]);

  useEffect(() => {
    let tempList = [...peopleList];

    //code to sort in ascending order
    switch (sortParam) {
      case SortParam.Name:
        tempList.sort((a: Person, b: Person) => a.name.localeCompare(b.name));
        break;
      case SortParam.Sex:
        tempList.sort((a: Person, b: Person) => a.sex.localeCompare(b.sex));
        break;
      case SortParam.Born:
        tempList.sort((a: Person, b: Person) => a.born - b.born);
        break;
      case SortParam.Died:
        tempList.sort((a: Person, b: Person) => a.died - b.died);
        break;
      default:
        break;
    }

    //code to reverse the sorted list
    if (order === 'desc') {
      tempList.reverse();
    }

    //code to filter based on Sex Filter
    if (sexFilter === Sex.Male) {
      tempList = tempList.filter(p => p.sex === Sex.Male);
    } else if (sexFilter === Sex.Female) {
      tempList = tempList.filter(p => p.sex === Sex.Female);
    }

    //code to filter based on search text
    if (query) {
      const searchQuery = query.toLowerCase();

      tempList = tempList.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.motherName?.toLowerCase().includes(searchQuery) ||
          p.fatherName?.toLowerCase().includes(searchQuery),
      );
    }

    //code to filter based on centuries filter
    if (centuries && centuries?.length > 0) {
      tempList = tempList.filter(
        p =>
          centuries.includes(Math.ceil(p.born / 100).toString()) ||
          centuries.includes(Math.ceil(p.died / 100).toString()),
      );
    }

    setProcessedPeopleList([...tempList]);
  }, [sortParam, order, sexFilter, query, centuries, peopleList]);

  return (
    <>
      {processedPeopleList.length == 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  {sortParam === SortParam.Name && order === 'desc' ? (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  ) : sortParam === SortParam.Name && !order ? (
                    <SearchLink
                      params={{ sort: SortParam.Name, order: 'desc' }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  ) : (
                    <SearchLink params={{ sort: SortParam.Name }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  {sortParam === SortParam.Sex && order === 'desc' ? (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  ) : sortParam === SortParam.Sex && !order ? (
                    <SearchLink params={{ sort: SortParam.Sex, order: 'desc' }}>
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  ) : (
                    <SearchLink params={{ sort: SortParam.Sex }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  {sortParam === SortParam.Born && order === 'desc' ? (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  ) : sortParam === SortParam.Born && !order ? (
                    <SearchLink
                      params={{ sort: SortParam.Born, order: 'desc' }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  ) : (
                    <SearchLink params={{ sort: SortParam.Born }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  {sortParam === SortParam.Died && order === 'desc' ? (
                    <SearchLink params={{ sort: null, order: null }}>
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </SearchLink>
                  ) : sortParam === SortParam.Died && !order ? (
                    <SearchLink
                      params={{ sort: SortParam.Died, order: 'desc' }}
                    >
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </SearchLink>
                  ) : (
                    <SearchLink params={{ sort: SortParam.Died }}>
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {processedPeopleList.map(p => (
              <tr
                key={p.slug}
                data-cy="person"
                className={
                  personSlug === p.slug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <PeopleLink person={p} />
                </td>
                <td>{p.sex}</td>
                <td>{p.born}</td>
                <td>{p.died}</td>
                <td>
                  {p.mother ? (
                    <PeopleLink person={p.mother} />
                  ) : p.motherName ? (
                    p.motherName
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {p.father ? (
                    <PeopleLink person={p.father} />
                  ) : p.fatherName ? (
                    p.fatherName
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
