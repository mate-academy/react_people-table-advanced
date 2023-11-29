import { useCallback } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { proceedPeople } from '../../utils/proceedPeople';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { humanId } = useParams();
  const [searchParams] = useSearchParams();

  const getSortingParams = useCallback((param: string): SearchParams => {
    if (searchParams.get('sort') === param) {
      if (searchParams.get('order') === 'desc') {
        return { sort: null, order: null };
      }

      return { sort: param, order: 'desc' };
    }

    return { sort: param, order: null };
  }, [searchParams]);

  const getSortingIcon = useCallback((param: string) => {
    return cn('fas', {
      'fa-sort': searchParams.get('sort') !== param,
      'fa-sort-up': searchParams.get('sort') === param
        && searchParams.get('order') !== 'desc',
      'fa-sort-down': searchParams.get('sort') === param
        && searchParams.get('order') === 'desc',
    });
  }, [searchParams]);

  return (
    <table
      data-cy="peopleTable"
      // eslint-disable-next-line max-len
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={getSortingParams('name')}
              >
                <span className="icon">
                  <i className={getSortingIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortingParams('sex')}
              >
                <span className="icon">
                  <i className={getSortingIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortingParams('born')}
              >
                <span className="icon">
                  <i className={getSortingIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortingParams('died')}
              >
                <span className="icon">
                  <i className={getSortingIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {proceedPeople(people, searchParams).map((person) => {
          const {
            sex, born, died, slug, motherName,
            fatherName, mother, father,
          } = person;

          return (
            <tr
              data-cy="person"
              className={cn(
                { 'has-background-warning': slug === humanId },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {
                  mother
                    ? <PersonLink person={mother} />
                    : motherName || '-'
                }
              </td>
              <td>
                {
                  father
                    ? <PersonLink person={father} />
                    : fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
