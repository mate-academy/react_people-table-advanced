import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SortBy } from '../../types/SortBy';
import { filterAndSortPeople } from '../../utils/filterAndSortPeople';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[]
  selectedSlug: string
};

export const PeopleTable: React.FC<Props> = React.memo(
  ({ people, selectedSlug }) => {
    const [searchParams] = useSearchParams();
    const currentQuery = searchParams.get('query');
    const currentSex = searchParams.get('sex');
    const currentCenturies = searchParams.getAll('centuries');
    const currentSort = searchParams.get('sort') || '';
    const currentOrder = searchParams.get('order') || '';

    const visiblePeople = useMemo(() => filterAndSortPeople(
      people,
      currentQuery,
      currentSex,
      currentCenturies,
      currentSort,
      currentOrder,
    ), [
      people,
      currentQuery,
      currentSex,
      currentCenturies,
      currentSort,
      currentOrder,
    ]);

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
                <SortLink
                  sort={SortBy.Name}
                />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SortLink
                  sort={SortBy.Sex}
                />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SortLink
                  sort={SortBy.Born}
                />
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SortLink
                  sort={SortBy.Died}
                />
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => {
            const {
              sex,
              born,
              died,
              father,
              fatherName,
              mother,
              motherName,
              slug,
            } = person;
            const isSlugSelected = slug === selectedSlug;
            const preparedMotherName = motherName || '-';
            const preparedFatherName = fatherName || '-';

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames(
                  { 'has-background-warning': isSlugSelected },
                )}
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
                    : preparedMotherName}
                </td>
                <td>
                  {father
                    ? <PersonLink person={father} />
                    : preparedFatherName}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
);
