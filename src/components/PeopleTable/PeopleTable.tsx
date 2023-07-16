import {
  FC,
} from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { ParentInfo } from './ParentInfo';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { activeTH } from '../../utils/data';

type Props = {
  visiblePeople: Person[];
};

export const PeopleTable: FC<Props> = ({ visiblePeople }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const personSlug = searchParams.get('personSlug');

  const handleSortOrder = (currentSortType: string | null) => {
    if ((!sort && !order) || (sort && sort !== currentSortType)) {
      return { sort: currentSortType, order: null };
    }

    if (sort === currentSortType && !order) {
      return { sort: currentSortType, order: 'desc' };
    }

    return { order: null, sort: null };
  };

  if (!visiblePeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {activeTH.map(({ title, params }) => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  params={handleSortOrder(params.sort)}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas fa-sort', {
                        'fa-sort-up': !order && sort === params.sort,
                        'fa-sort-down': order && sort === params.sort,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(({
          slug,
          name,
          sex,
          born,
          died,
          fatherName = null,
          motherName = null,
          father,
          mother,
        }) => (
          <tr
            data-cy="person"
            key={slug}
            className={classNames({
              'has-background-warning': slug === personSlug,
            })}
          >
            <td>
              <SearchLink
                params={{ personSlug: slug }}
                className={classNames('', {
                  'has-text-danger': sex === 'f',
                  'has-text-info': sex === 'm',
                })}
                title={name}
              />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              <ParentInfo parent={mother} name={motherName} />
            </td>
            <td>
              <ParentInfo parent={father} name={fatherName} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
