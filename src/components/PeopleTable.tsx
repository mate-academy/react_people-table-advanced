/* eslint-disable jsx-a11y/control-has-associated-label */

import { Person } from '../types/Person';
import { PersonLink } from '../components/PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug: string | undefined;
};

function getParentSlug(people: Person[], childName: string, parentSex: string) {
  const person = people.find(p => p.name === childName);
  const parentName =
    parentSex === 'f' ? person?.motherName : person?.fatherName;

  return people.find(p => p.name === parentName)?.slug;
}

function getIcon(search: URLSearchParams, sort: string) {
  return search.get('sort') === sort
    ? search.get('order') === 'desc'
      ? 'fas fa-sort-down'
      : ' fas fa-sort-up'
    : 'fas fa-sort';
}

export const PeopleTable = ({ people, slug }: Props) => {
  const [searchParams] = useSearchParams();
  const peopleList = [...people];

  const getLinkParams = (sortBy: string) => {
    return {
      sort:
        searchParams.get('sort') === sortBy
          ? searchParams.get('order') === 'desc'
            ? null
            : sortBy
          : sortBy,
      order:
        searchParams.get('sort') === sortBy
          ? searchParams.get('order') === 'desc'
            ? null
            : 'desc'
          : null,
    };
  };

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
              <SearchLink params={getLinkParams('name')}>
                <span className="icon">
                  <i className={getIcon(searchParams, 'name')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getLinkParams('sex')}>
                <span className="icon">
                  <i className={getIcon(searchParams, 'sex')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getLinkParams('born')}>
                <span className="icon">
                  <i className={getIcon(searchParams, 'born')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getLinkParams('died')}>
                <span className="icon">
                  <i className={getIcon(searchParams, 'died')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonLink
            person={person}
            key={person.name}
            motherInAPI={
              person.motherName
                ? getParentSlug(people, person.name, 'f')
                : false
            }
            fatherInAPI={
              person.fatherName
                ? getParentSlug(people, person.name, 'm')
                : false
            }
            isSelected={slug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
