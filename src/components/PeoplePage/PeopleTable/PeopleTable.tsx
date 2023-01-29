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
  const [clickName, setClickName] = useState(0);
  const [clickSex, setClickSex] = useState(0);
  const [clickBorn, setClickBorn] = useState(0);
  const [clickDied, setClickDied] = useState(0);

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
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                // to="#/people?sort=name"
                params={{ sort: 'name' }}
                onClick={() => sortByValue('name', clickName, setClickName)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                // to="#/people?sort=sex"
                params={{ sort: 'sex' }}
                onClick={() => sortByValue('sex', clickSex, setClickSex)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                // href="#/people?sort=born&amp;order=desc"
                params={{ sort: 'born' }}
                onClick={() => sortByValue('born', clickBorn, setClickBorn)}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                // href="#/people?sort=died"
                params={{ sort: 'died' }}
                onClick={() => sortByValue('died', clickDied, setClickDied)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

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
