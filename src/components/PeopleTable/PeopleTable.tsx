import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, SearchParams } from '../../types';
import { PeopleTableItem } from '../PeopleTableItem';
import { TABLE_ATTRIBUTES } from '../../utils/constants';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleAddSort = (attribute: string): SearchParams => {
    switch (sort === attribute) {
      case true: {
        if (order) {
          return { order: null, sort: null };
        }

        return { order: 'desc' };
      }

      case false:
      default: {
        return { order: null, sort: attribute };
      }
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_ATTRIBUTES.map(attribute => {
            if (attribute !== 'Mother' && attribute !== 'Father') {
              const normalizedAttribute = attribute.toLowerCase();
              const isSortActive = sort === normalizedAttribute;

              return (
                <th key={attribute}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {attribute}
                    <SearchLink params={handleAddSort(normalizedAttribute)}>
                      <span className="icon">
                        <i className={classNames(
                          'fas',
                          {
                            'fa-sort': !isSortActive,
                            'fa-sort-up': isSortActive && !order,
                            'fa-sort-down': isSortActive && order,
                          },
                        )}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>
              );
            }

            return <th key={attribute}>{attribute}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleTableItem
            person={person}
            key={person.slug}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
