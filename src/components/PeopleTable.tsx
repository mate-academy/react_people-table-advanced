/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

enum SortType {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getParams = (call: SortType) => {
    if (call === sort && !order) {
      return { sort, order: 'desc' };
    }

    if (call === sort && order) {
      return { sort: null, order: null };
    }

    return {
      sort: call,
      order: null,
    };
  };

  const visiblePeople = useMemo(() => {
    let sorted = [...people];
    const isReversed = order === 'desc';

    switch (sort) {
      case SortType.NAME:
        sorted = sorted.sort((person1, person2) => person1.name.localeCompare(person2.name));
        break;

      case SortType.SEX:
        sorted = sorted.sort((person1, person2) => person1.sex.localeCompare(person2.sex));
        break;

      case SortType.BORN:
        sorted = sorted.sort((person1, person2) => person1.born - person2.born);
        break;

      case SortType.DIED:
        sorted = sorted.sort((person1, person2) => person1.died - person2.died);
        break;

      default:
    }

    if (isReversed) {
      sorted = sorted.reverse();
    }

    return sorted;
  }, [sort, people, order]);

  const peopleArray = visiblePeople.map((person) => {
    const personCopy = { ...person };
    const mother = people.find((mom) => (
      mom.name === person.motherName
    ));

    const father = people.find((dad) => (
      dad.name === person.fatherName
    ));

    if (mother) {
      personCopy.mother = mother;
    }

    if (father) {
      personCopy.father = father;
    }

    return personCopy;
  });

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
                params={
                  getParams(SortType.NAME)
                }
              >
                <span className="icon">
                  <i className={classNames({ 'fas fa-sort': !sort || sort !== SortType.NAME },
                    { 'fas fa-sort-up': sort === SortType.NAME && !order },
                    { 'fas fa-sort-down': sort === SortType.NAME && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={
                  getParams(SortType.SEX)
                }
              >
                <span className="icon">
                  <i className={classNames({ 'fas fa-sort': !sort || sort !== SortType.SEX },
                    { 'fas fa-sort-up': sort === SortType.SEX && !order },
                    { 'fas fa-sort-down': sort === SortType.SEX && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={
                  getParams(SortType.BORN)
                }
              >
                <span className="icon">
                  <i className={classNames({ 'fas fa-sort': !sort || sort !== SortType.BORN },
                    { 'fas fa-sort-up': sort === SortType.BORN && !order },
                    { 'fas fa-sort-down': sort === SortType.BORN && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={
                  getParams(SortType.DIED)
                }
              >
                <span className="icon">
                  <i className={classNames({ 'fas fa-sort': !sort || sort !== SortType.DIED },
                    { 'fas fa-sort-up': sort === SortType.DIED && !order },
                    { 'fas fa-sort-down': sort === SortType.DIED && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {peopleArray.map((person) => {
          return (
            <tr
              key={person.slug}
              className={`${person.slug === selectedSlug ? 'has-background-warning' : ''}`}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>
                {person.sex}
              </td>
              <td>
                {person.born}
              </td>
              <td>
                {person.died}
              </td>
              <td>

                {
                  person.mother
                    ? <PersonLink person={person.mother} />
                    : person.motherName || '-'
                }
              </td>
              <td>
                {
                  person.father
                    ? <PersonLink person={person.father} />
                    : person.fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
