import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonElement } from '../PersonElement';
import { SearchLink } from '../SearchLink';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

type Props = {
  peopleList: Person[];
};

const COLUMNS = [
  { label: 'Name', value: 'name' },
  { label: 'Sex', value: 'sex' },
  { label: 'Born', value: 'born' },
  { label: 'Died', value: 'died' },
];

export const PeopleTable = ({ peopleList }: Props) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const preparedPeople = getPreparedPeople(peopleList, searchParams);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => {
            const isSorted = column.value === sort;
            let nextOrder;

            if (!isSorted) {
              nextOrder = 'asc';
            } else if (order === 'asc') {
              nextOrder = 'desc';
            } else {
              nextOrder = '';
            }

            return (
              <th key={column.value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column.label}
                  <SearchLink
                    params={
                      nextOrder
                        ? { sort: column.value, order: nextOrder }
                        : { sort: null, order: null }
                    }
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isSorted,
                          'fa-sort-up': isSorted && order === 'asc',
                          'fa-sort-down': isSorted && order === 'desc',
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
        {preparedPeople.map(person => (
          <PersonElement
            key={person.slug}
            person={person}
            peopleList={preparedPeople}
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
