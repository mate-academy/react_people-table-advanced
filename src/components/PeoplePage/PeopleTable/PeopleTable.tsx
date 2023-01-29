import classNames from 'classnames';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { SearchLink } from '../../SearchLink';
import { PersonLink } from './PersonLink/PersonLink';

type Props = {
  visiblePeople: Person[],
};

export const PeopleTable: React.FC<Props>
= ({ visiblePeople }) => {
  const slugUrl = useParams();
  const [sortType, setSortType] = useState('');
  const [clickValue, setClickValue] = useState(0);

  const isSelected = (personSlug: string) => {
    return personSlug === slugUrl.slug;
  };

  const getParent = (parentName: string | null) => {
    const parent = visiblePeople.find(
      (person: Person) => person.name === parentName,
    );

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName || '-';
  };

  const sortByValue = (
    value: string,
    click: number,
    setClick: (value: number) => void,
  ) => {
    setClick(click + 1);
    if (click === 0) {
      setSortType(`${value}Asc`);
    }

    if (click === 1) {
      setSortType(`${value}Desc`);
    }

    if (click === 2) {
      setSortType('default');
      setClick(0);
    }
  };

  console.log(sortType);

  const setSortedPeople = () => {
    const sortedPeople = [...visiblePeople];

    return sortedPeople.sort((a, b) => {
      switch (sortType) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'sexAsc':
          return a.sex.localeCompare(b.sex);
        case 'sexDesc':
          return b.sex.localeCompare(a.sex);
        case 'bornAsc':
          return b.born - a.born;
        case 'bornDesc':
          return a.born - b.born;
        case 'diedAsc':
          return b.died - a.died;
        case 'diedDesc':
          return a.died - b.died;
        default:
          return 0;
      }
    });
  };

  const visibleAndSortedPeople = setSortedPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {
            ['name', 'sex', 'born', 'died'].map((value) => (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {value[0].toUpperCase() + value.slice(1)}
                  <SearchLink
                    params={{ sort: value }}
                    onClick={() => {
                      sortByValue(value, clickValue, setClickValue);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas fa-sort', {
                          'fa-sort-up': clickValue === 1
                          && sortType.includes(value),
                          'fa-sort-down': clickValue === 2
                          && sortType.includes(value),
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>

              </th>
            ))
          }
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          visibleAndSortedPeople.map((person: Person) => {
            const {
              born,
              died,
              sex,
              motherName,
              fatherName,
              slug,
            } = person;

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames(
                  { 'has-background-warning': isSelected(slug) },
                )}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {getParent(motherName)}
                </td>
                <td>
                  {getParent(fatherName)}
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
