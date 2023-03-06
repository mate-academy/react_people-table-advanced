import React from 'react';
import classnames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import { sortVisiblePeople } from '../../utils/sortVisiblePeople';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({
    people,
  }) => {
    const { slug: paramsSlug = '' } = useParams();
    const [searchParams] = useSearchParams();
    const currentQuery = searchParams.get('query');
    const currentSex = searchParams.get('sex');
    const currentCenturies = searchParams.getAll('centuries');
    const currentSort = searchParams.get('sort');
    const isReversed = searchParams.get('order') === 'desc';

    const visiblePeolpe = getVisiblePeople(
      people,
      currentQuery,
      currentSex,
      currentCenturies,
    );

    const sortedVisiblePeople = sortVisiblePeople(
      visiblePeolpe,
      currentSort,
      isReversed,
    );

    const getSortParam = (sort: string) => {
      if (currentSort !== sort) {
        return {
          sort,
          order: null,
        };
      }

      if (!isReversed) {
        return {
          sort,
          order: 'desc',
        };
      }

      return {
        sort: null,
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
                <SearchLink
                  params={getSortParam('name')}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink
                  params={getSortParam('sex')}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink
                  params={getSortParam('born')}
                >
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink
                  params={getSortParam('died')}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortedVisiblePeople.map((person) => {
            const {
              sex,
              born,
              died,
              fatherName,
              motherName,
              slug,
              mother,
              father,
            } = person;

            const preparedMother = motherName || '-';
            const preparedFather = fatherName || '-';

            const isPersonSelected = paramsSlug === slug;

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classnames({
                  'has-background-warning': isPersonSelected,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother
                    ? <PersonLink person={mother} />
                    : preparedMother}
                </td>
                <td>
                  {father
                    ? <PersonLink person={father} />
                    : preparedFather}
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    );
  },
);
