/* eslint-disable jsx-a11y/control-has-associated-label */
import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import { LoaderEnum } from '../types/loader';
import classNames from 'classnames';
import { Loader } from './Loader';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import {
  filteringData,
  getParentLink,
  getSortIcon,
  handleSortClick,
  sortPersonList,
} from '../utils/prepareData';
import React from 'react';

interface PeopleTableProps {
  people: Person[];
  error: string;
  loader: LoaderEnum;
}

export enum Type {
  mother = 'mother',
  father = 'father',
}

enum Sex {
  women = 'f',
}

export enum searchParamsEnum {
  sort = 'sort',
  order = 'order',
}

enum SortColumn {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  error,
  loader,
}) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const SortColumns = [
    SortColumn.Name,
    SortColumn.Sex,
    SortColumn.Born,
    SortColumn.Died,
  ];
  const currentSort = searchParams.get(searchParamsEnum.sort);
  const currentOrder = searchParams.get(searchParamsEnum.order) || '';

  const sortList = sortPersonList(people, currentSort, currentOrder);

  const filteredData = filteringData(sortList, searchParams);

  return (
    <div className="box table-container">
      {loader === 'loading' && <Loader />}
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {loader === 'loaded' && !people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!!people.length && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {SortColumns.map(column => (

                <th key={column}>
                  <span
                    className="is-flex is-flex-wrap-nowrap"
                    onClick={() => {}}
                  >
                    {column}
                    <SearchLink
                      params={handleSortClick(
                        column.toLowerCase(),
                        currentSort,
                        currentOrder,
                      )}
                    >
                      <span className="icon">
                        {getSortIcon(
                          handleSortClick(
                            column.toLowerCase(),
                            currentSort,
                            currentOrder,
                          ),
                        )}
                      </span>
                    </SearchLink>
                  </span>
                </th>
              ))}
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(person => (
              <tr
                data-cy="person"
                className={classNames(
                  person.slug === slug ? 'has-background-warning' : '',
                )}
                key={person.slug}
              >
                <td>
                  <NavLink
                    to={`/people/${person.slug}`}
                    className={classNames(
                      person.sex === Sex.women ? 'has-text-danger' : '',
                    )}
                  >
                    {person.name}
                  </NavLink>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                <td>{getParentLink(person.motherName, people, Type.mother)}</td>
                <td>{getParentLink(person.fatherName, people, Type.father)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
