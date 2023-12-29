import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person, SortParams } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  filteredPeople: Person[]
  slug: string | undefined;
};

export const PeopleTable: React.FC<Props> = (
  { people, filteredPeople, slug },
) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getParentInfo = (name: string) => {
    const parent = people.find(person => person.name === name);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return name;
  };

  const getLinkParams = (parameter: SortParams): { sort: string }
  | { sort: null, order: null } | { order: string } => {
    if (!sort) {
      return { sort: parameter };
    }

    if (sort === parameter && order) {
      return { sort: null, order: null };
    }

    if (sort === parameter && !order) {
      return { order: 'desc' };
    }

    return { sort: parameter };
  };

  const getLinkStyle = (parameter: SortParams) => classNames(
    'fas',
    { 'fa-sort': !sort || sort !== parameter },
    { 'fa-sort-up': sort === parameter && !order },
    { 'fa-sort-down': sort === parameter && order === 'desc' },
  );

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
                params={getLinkParams(SortParams.NAME)}
              >
                <span className="icon">
                  <i className={getLinkStyle(SortParams.NAME)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getLinkParams(SortParams.SEX)}
              >
                <span className="icon">
                  <i className={getLinkStyle(SortParams.SEX)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getLinkParams(SortParams.BORN)}
              >
                <span className="icon">
                  <i className={getLinkStyle(SortParams.BORN)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getLinkParams(SortParams.DIED)}
              >
                <span className="icon">
                  <i className={getLinkStyle(SortParams.DIED)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const {
            name, sex, born, died, fatherName, motherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={name}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td><PersonLink person={person} /></td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName
                  ? getParentInfo(motherName)
                  : '-'}
              </td>
              <td>
                {fatherName
                  ? getParentInfo(fatherName)
                  : '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
