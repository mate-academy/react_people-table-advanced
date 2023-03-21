import classNames from 'classnames';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable: FC<Props> = ({ people, slug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') as SortBy | null;
  const order = searchParams.get('order');

  const getSortParams = (sortBy: SortBy) => {
    return {
      sort: sort === sortBy && order ? null : sortBy,
      order: sort === sortBy && !order ? 'desc' : null,
    };
  };

  const getClassNamesSort = (sortBy: SortBy) => {
    return classNames(
      'fas',
      {
        'fa-sort': sort !== sortBy,
        'fa-sort-up': sort === sortBy && !order,
        'fa-sort-down': sort === sortBy && order,
      },
    );
  };

  const parentsLink = (person: Person, sex: 'f' | 'm') => {
    if (sex === 'f') {
      if (person.mother) {
        return <PersonLink person={person.mother} />;
      }

      return person.motherName || '-';
    }

    if (person.father) {
      return <PersonLink person={person.father} />;
    }

    return person.fatherName || '-';
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
              <SearchLink params={getSortParams(SortBy.Name)}>
                <span className="icon">
                  <i className={getClassNamesSort(SortBy.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams(SortBy.Sex)}>
                <span className="icon">
                  <i className={getClassNamesSort(SortBy.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortParams(SortBy.Born)}
              >
                {/* href="#/people?sort=born&amp;order=desc"> */}
                <span className="icon">
                  <i className={getClassNamesSort(SortBy.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams(SortBy.Died)}>
                <span className="icon">
                  <i className={getClassNamesSort(SortBy.Died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{parentsLink(person, 'f')}</td>
            <td>{parentsLink(person, 'm')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
