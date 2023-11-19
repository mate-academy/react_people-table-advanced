import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonComponent } from './PersonComponent';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  visiblePeople: Person[];
};

const sortCategories = [
  { title: 'Name', urlParam: 'name' },
  { title: 'Sex', urlParam: 'sex' },
  { title: 'Born', urlParam: 'born' },
  { title: 'Died', urlParam: 'died' },
];

export const PeopleTable: React.FC<Props> = ({
  people,
  visiblePeople,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortToggle = (sortType: string) => {
    if (sort !== sortType) {
      return getSearchWith(searchParams, { sort: sortType, order: null });
    }

    if (sort === sortType && order === 'desc') {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    return getSearchWith(searchParams, { sort: sortType, order: 'desc' });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortCategories.map((sortCategory) => (
            <th key={sortCategory.title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortCategory.title}
                <Link to={{ search: sortToggle(sortCategory.urlParam) }}>
                  <span className="icon">
                    <i className={cn('fas',
                      {
                        'fa-sort': sort !== sortCategory.urlParam,
                        'fa-sort-down': sort === sortCategory.urlParam
                        && order === 'desc',
                        'fa-sort-up': sort === sortCategory.urlParam
                        && order !== 'desc',
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
        {visiblePeople.map((person) => {
          const mother = people.find(
            p => p.name === person.motherName,
          );

          const father = people.find(
            p => p.name === person.fatherName,
          );

          const personWithParents = {
            ...person,
            mother,
            father,
          };

          return (
            <PersonComponent person={personWithParents} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};
