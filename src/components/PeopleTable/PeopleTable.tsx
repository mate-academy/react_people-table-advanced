import { FC } from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { findParent } from '../../utils/findParent';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortParams = (sortParam: string) => {
    if (order && sort) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sort) {
      return {
        sort: sortParam,
        order: 'desc',
      };
    }

    return {
      sort: sortParam,
      order: null,
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
              <SearchLink params={sortParams('name')}>
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'name',
                    'fa-sort-up': sort === 'name' && !order,
                    'fa-sort-down': sort === 'name' && order,
                  })}
                />
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams('sex')}>
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'sex',
                    'fa-sort-up': sort === 'sex' && !order,
                    'fa-sort-down': sort === 'sex' && order,
                  })}
                />
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams('born')}>
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'born',
                    'fa-sort-up': sort === 'born' && !order,
                    'fa-sort-down': sort === 'born' && order,
                  })}
                />
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams('died')}>
                <i
                  className={classNames('fas', {
                    'fa-sort': sort !== 'died',
                    'fa-sort-up': sort === 'died' && !order,
                    'fa-sort-down': sort === 'died' && order,
                  })}
                />
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      {people.map(person => {
        const {
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
        } = person;

        const mother = findParent(people, motherName);
        const father = findParent(people, fatherName);

        return (
          <tbody key={slug}>
            <tr
              data-cy="person"
              className={classNames(
                { 'has-background-warning': selectedSlug === slug },
              )}
            >
              <td>
                <PersonLink person={person} selectedSlug={selectedSlug} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink selectedSlug={selectedSlug} person={mother} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink selectedSlug={selectedSlug} person={father} />
                  : fatherName || '-'}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
