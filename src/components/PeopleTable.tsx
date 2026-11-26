import {
  Link,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';

import { SearchLink } from './SearchLink';

import { Params } from '../types/SearchParams';
import { Person } from '../types';
import { SortField } from '../types/SortField';

export const PeopleTable = () => {
  const { peoples, allPeoples } = useOutletContext<{
    peoples: Person[];
    allPeoples: Person[];
  }>();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const renderSortHeader = (title: string, field: SortField) => {
    const isActive = sort === field;

    const icon = !isActive
      ? 'fa-sort'
      : order === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up';

    const nextParams: Params = !isActive
      ? { sort: field, order: null }
      : order !== 'desc'
        ? { order: 'desc' }
        : { sort: null, order: null };

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          <Link
            to={{
              search: getSearchWith(nextParams, searchParams),
            }}
          >
            {title}

            <span className="icon">
              <i className={`fas ${icon}`} />
            </span>
          </Link>
        </span>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeader('Name', 'name')}
          {renderSortHeader('Sex', 'sex')}
          {renderSortHeader('Born', 'born')}
          {renderSortHeader('Died', 'died')}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => {
          const mother = allPeoples.find(
            pers => pers.name === pers.motherName,
          );

          const father = allPeoples.find(
            pers => pers.name === pers.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <SearchLink peoples={allPeoples} person={person} params={{}}>
                  {person.name}
                </SearchLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <SearchLink peoples={allPeoples} person={mother} params={{}}>
                    {mother.name}
                  </SearchLink>
                ) : (
                  person.motherName
                )}
              </td>
              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <SearchLink peoples={allPeoples} person={father} params={{}}>
                    {father.name}
                  </SearchLink>
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
