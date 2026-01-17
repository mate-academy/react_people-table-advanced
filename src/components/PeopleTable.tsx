/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const addParentLinks = (people: Person[]): Person[] => {
  const peopleWithParentLinks: Person[] = people.map(p => ({ ...p }));

  const byName = new Map<string, Person>();

  for (const p of peopleWithParentLinks) {
    byName.set(p.name, p);
  }

  for (const person of peopleWithParentLinks) {
    person.mother = person.motherName
      ? byName.get(person.motherName)
      : undefined;

    person.father = person.fatherName
      ? byName.get(person.fatherName)
      : undefined;
  }

  return peopleWithParentLinks;
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [displayedPeople, setDisplayedPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const peopleWithParentLinks = useMemo(() => addParentLinks(people), [people]);

  useEffect(() => {
    const query = searchParams.get('query') || null;
    const centuries = searchParams.getAll('centuries') || [];
    const sex = searchParams.get('sex') || null;

    setDisplayedPeople(() => {
      return peopleWithParentLinks
        .filter((person: Person) => {
          if (query) {
            const lowerCaseQuery = query.toLowerCase();

            if (
              !person.name.toLowerCase().includes(lowerCaseQuery) &&
              !(
                person.fatherName &&
                person.fatherName.toLowerCase().includes(lowerCaseQuery)
              ) &&
              !(
                person.motherName &&
                person.motherName.toLowerCase().includes(lowerCaseQuery)
              )
            ) {
              return false;
            }
          }

          if (centuries.length > 0) {
            const personCentury = Math.ceil(person.born / 100);

            if (!centuries.includes(personCentury.toString())) {
              return false;
            }
          }

          if (sex && person.sex !== sex) {
            return false;
          }

          return true;
        })
        .sort((a: Person, b: Person): number => {
          if (!sort) {
            return 0;
          }

          let aValue: string | number = a[sort as keyof Person] as
            | string
            | number;
          let bValue: string | number = b[sort as keyof Person] as
            | string
            | number;

          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
          }

          if (typeof bValue === 'string') {
            bValue = bValue.toLowerCase();
          }

          if (aValue < bValue) {
            return order === 'desc' ? 1 : -1;
          }

          if (aValue > bValue) {
            return order === 'desc' ? -1 : 1;
          }

          return 0;
        });
    });
  }, [searchParams, peopleWithParentLinks, order, sort]);

  const getSortLinkParams = (key: string) => {
    return {
      sort: !sort ? key : sort === key && order === 'desc' ? null : key,
      order: !sort ? null : sort === key && !order ? 'desc' : null,
    };
  };

  const getSortLinkClassName = (key: string) => {
    return classNames('fas', {
      'fa-sort': sort !== key,
      'fa-sort-up': sort === key && !order,
      'fa-sort-down': sort === key && order === 'desc',
    });
  };

  return displayedPeople.length === 0 ? (
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
              <SearchLink params={getSortLinkParams('name')}>
                <span className="icon">
                  <i className={getSortLinkClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortLinkParams('sex')}>
                <span className="icon">
                  <i className={getSortLinkClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortLinkParams('born')}>
                <span className="icon">
                  <i className={getSortLinkClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortLinkParams('died')}>
                <span className="icon">
                  <i className={getSortLinkClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {displayedPeople.map(person => (
          <PersonLink
            key={person.name}
            person={person}
            isSelected={person.slug === slug}
          />
        ))}
      </tbody>
    </table>
  );
};
