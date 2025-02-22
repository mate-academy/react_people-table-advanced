import { useParams } from 'react-router-dom';
import { LinkPerson } from './LinkPerson';
import cn from 'classnames';
import { useContext } from 'react';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { Sort } from '../enums/Sort';
import { ContextPeople } from '../PeopleContext';

/* eslint-disable jsx-a11y/control-has-associated-label */

export const PeopleTable = () => {
  const { searchParams, handlerSortBy, sortOrder, sort, sortedPeople, people } =
    useContext(ContextPeople);
  const { personSlug } = useParams();

  const generateSortBy = (value: string): SearchParams => {
    if (
      searchParams.get('sort') !== null &&
      searchParams.get('order') !== null
    ) {
      return { order: null, sort: null };
    }

    if (searchParams.get('sort') === value) {
      return { order: 'desc' };
    }

    return { sort: value };
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
              <SearchLink params={generateSortBy(Sort.name)}>
                <span
                  onClick={() => {
                    handlerSortBy(Sort.name);
                  }}
                  className="icon"
                >
                  <i
                    className={cn('fas', {
                      'fa-sort': sortOrder === 'org' || sort !== 'name',
                      'fa-sort-up': sortOrder === 'asc' && sort === 'name',
                      'fa-sort-down': sortOrder === 'desc' && sort === 'name',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={generateSortBy(Sort.sex)}>
                <span onClick={() => handlerSortBy(Sort.sex)} className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortOrder === 'org' || sort !== 'sex',
                      'fa-sort-up': sortOrder === 'asc' && sort === 'sex',
                      'fa-sort-down': sortOrder === 'desc' && sort === 'sex',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={generateSortBy(Sort.born)}>
                <span onClick={() => handlerSortBy(Sort.born)} className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortOrder === 'org' || sort !== 'born',
                      'fa-sort-up': sortOrder === 'asc' && sort === 'born',
                      'fa-sort-down': sortOrder === 'desc' && sort === 'born',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={generateSortBy(Sort.died)}>
                <span onClick={() => handlerSortBy(Sort.died)} className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortOrder === 'org' || sort !== 'died',
                      'fa-sort-up': sortOrder === 'asc' && sort === 'died',
                      'fa-sort-down': sortOrder === 'desc' && sort === 'died',
                    })}
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
        {sortedPeople.map(person => {
          const { slug, born, died, sex, fatherName, motherName } = person;
          const mother = people?.find(p => p.name === person.motherName);
          const father = people?.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': slug === personSlug,
              })}
            >
              <td>
                <LinkPerson person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <LinkPerson person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <LinkPerson person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
