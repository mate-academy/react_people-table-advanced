import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PeopleItem } from '../PeopleItem';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  people: Person[];
};

const titleArr = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  function handleFilterChange(sortType: string) {
    if (sort === sortType && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === sortType) {
      return { sort: sortType, order: 'desc' };
    }

    return { sort: sortType, order: null };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titleArr.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      handleFilterChange(title.toLowerCase()),
                    ),
                  }}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== title.toLowerCase(),
                        'fa-sort-up': sort === title.toLowerCase() && !order,
                        'fa-sort-down': sort === title.toLowerCase() && order,
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleItem key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
