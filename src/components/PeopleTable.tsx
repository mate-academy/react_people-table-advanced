import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Parents } from '../types/Parents';
import { Person } from '../types/Person';
import { SortTypes } from '../types/SortTypes';
import { findParent, handleSortParams } from '../utils/helper';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  peoples: Person[] | null;
  selectedSlug: string;
};

const sortOptions = Object.values(SortTypes);

export const PeopleTable: React.FC<PeopleTableProps> = ({
  peoples,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOptions.map(option => {
            const hasSort = searchParams.get('sort') === option.toLowerCase();
            const hasOrder = searchParams.get('order') !== null;
            const isSortUp = hasSort && !hasOrder;
            const isSortDown = hasSort && hasOrder;
            const searchLinkParam = handleSortParams(hasSort, hasOrder, option);

            return (
              <th key={option}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {option}
                  <SearchLink
                    params={searchLinkParam}
                  >
                    <span className="icon">
                      <i className={classNames('fas', 'fa-sort',
                        {
                          'fa-sort-up': isSortUp,
                        }, {
                          'fa-sort-down': isSortDown,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples?.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const isPersonSelected = slug === selectedSlug;
          const personsMom = findParent(peoples, person, Parents.Mother);
          const personsDad = findParent(peoples, person, Parents.Father);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
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
                {personsMom ? (
                  <PersonLink person={personsMom} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {personsDad ? (
                  <PersonLink person={personsDad} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
