import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface PeoplePageProps {
  peopleList: Person[];
  selectedPerson: string;
}

const SELECTED = 'has-background-warning';

enum SortingType {
  name = 'name',
  born = 'born',
  died = 'died',
  sex = 'sex',
}

const SORT_DEFAULT_IMG = <i className="fas fa-sort" />;
const SORT_ASC_IMG = <i className="fas fa-sort-up" />;
const SORT_DESC_IMG = <i className="fas fa-sort-down" />;

export const PeopleTable: React.FC<PeoplePageProps> = ({
  peopleList,
  selectedPerson,
}) => {
  const findPerson = (personName: string) => {
    const person = peopleList.find(item => item.name === personName);

    return person
      ? <PersonLink person={person} />
      : personName;
  };

  const [searchParams] = useSearchParams();
  const sortType = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSorting = (type: string): {} => {
    if (sortType === type) {
      if (order) {
        return { sort: null, order: null };
      }

      return { order: 'desc' };
    }

    return { sort: type };
  };

  const getImage = (valueName: string): React.ReactElement => {
    if (valueName === sortType) {
      if (order) {
        return SORT_DESC_IMG;
      }

      return SORT_ASC_IMG;
    }

    return SORT_DEFAULT_IMG;
  };

  return (
    <>
      {peopleList.length === 0 ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
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
                  <SearchLink
                    params={setSorting(SortingType.name)}
                  >
                    <span className="icon">
                      {getImage(SortingType.name)}
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={setSorting(SortingType.sex)}
                  >
                    <span className="icon">
                      {getImage(SortingType.sex)}
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={setSorting(SortingType.born)}
                  >
                    <span className="icon">
                      {getImage(SortingType.born)}
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={setSorting(SortingType.died)}
                  >
                    <span className="icon">
                      {getImage(SortingType.died)}
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {peopleList.map((person) => (
              <tr
                data-cy="person"
                className={cn({
                  [SELECTED]: selectedPerson === person.slug,
                })}
                key={person.name}
              >
                {/* eslint-disable jsx-a11y/control-has-associated-label */}
                <td>
                  <PersonLink
                    person={person}
                  />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.motherName ? (
                    findPerson(person.motherName)
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    findPerson(person.fatherName)
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
