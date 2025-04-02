/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';
import { getPeople } from '../../api';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  columnsList,
  getPeopleListFromDB,
  getSortedList,
  getSortingClassName,
} from './service';
import { ParentLink } from './ParentLink';
import { getSearchWith } from '../../utils/searchHelper';
import { Context } from '../../utils/context/MainContext';
import { PeoplePageStateType } from '../PeoplePage';

type Props = {
  setPeoplePageState: React.Dispatch<React.SetStateAction<PeoplePageStateType>>;
  peoplePageState: PeoplePageStateType;
};

export const PeopleTable: React.FC<Props> = ({
  setPeoplePageState,
  peoplePageState,
}) => {
  const { user } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const contextData = useContext(Context);

  const { context, setContextData } = contextData;

  useEffect(() => {
    getPeopleListFromDB(
      getPeople,
      context,
      setContextData,
      peoplePageState,
      setPeoplePageState,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSortClick = (e: React.MouseEvent) => {
    const element = e.target as HTMLElement;
    const newSortValue = element.closest('a')?.dataset.sorting || '';

    const updatedParams =
      newSortValue === params.get('sort')
        ? params.get('order')
          ? { sort: null, order: null }
          : { sort: newSortValue, order: 'desc' }
        : { sort: newSortValue, order: null };

    const newParams = new URLSearchParams(getSearchWith(params, updatedParams));

    setSearchParams(newParams);
    setContextData({
      ...context,
      listToShow: getSortedList(context.fullList, newParams),
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnsList.map(column => {
            const capitalizedColumnName =
              column[0].toUpperCase() + column.slice(1);
            const isParents = column === 'mother' || column === 'father';

            return !isParents ? (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {capitalizedColumnName}
                  <a onClick={handleSortClick} data-sorting={column}>
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          getSortingClassName(params, column),
                        )}
                      />
                    </span>
                  </a>
                </span>
              </th>
            ) : (
              <th key={column}>{capitalizedColumnName}</th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {context.listToShow.map(person => {
          const { name, sex, born, died, slug } = person;

          return (
            <tr
              key={name}
              data-cy="person"
              className={classNames({
                'has-background-warning': user === slug,
              })}
            >
              <td>
                <a
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                  href={`#/people/${slug}`}
                >
                  {name}
                </a>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                <ParentLink person={person} parentSex="f" />
              </td>
              <td>
                <ParentLink person={person} parentSex="m" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
