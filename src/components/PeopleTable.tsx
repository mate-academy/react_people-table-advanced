import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  selectedSlug: string;
  nameToSlugMap: Map<string, string>;
};

enum Field {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}
const fieldMap: Record<string, Field> = {
  Name: Field.Name,
  Sex: Field.Sex,
  Born: Field.Born,
  Died: Field.Died,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  nameToSlugMap,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (e: React.MouseEvent, label: string) => {
    e.preventDefault();

    const field = fieldMap[label];
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    let sortParams: SearchParams = {};

    if (currentSort !== field) {
      sortParams = {
        sort: field,
        order: null,
      };
    } else if (currentOrder !== 'desc') {
      sortParams = {
        sort: field,
        order: 'desc',
      };
    } else {
      sortParams = {
        sort: null,
        order: null,
      };
    }

    const search = getSearchWith(searchParams, sortParams);

    setSearchParams(search);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(label => (
            <th key={label}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <a href={'#'} onClick={e => handleSort(e, label)}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        searchParams.get('sort') === fieldMap[label]
                          ? searchParams.get('order') === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort-up'
                          : 'fa-sort',
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person, index) => (
          <PersonLink
            key={index}
            person={person}
            selectedSlug={selectedSlug}
            nameToSlugMap={nameToSlugMap}
          />
        ))}
      </tbody>
    </table>
  );
};
