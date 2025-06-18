import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

const sortLinks = [
  { id: 1, title: 'Name', sort: 'name' },
  { id: 2, title: 'Sex', sort: 'sex' },
  { id: 3, title: 'Born', sort: 'born' },
  { id: 4, title: 'Died', sort: 'died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const makeParams = (linkSort: string) => {
    let newSort = null;
    let newOrder = null;

    if (sort !== linkSort) {
      newSort = linkSort;
    } else {
      if (order !== 'desc') {
        newSort = linkSort;
        newOrder = 'desc';
      }
    }

    return { sort: newSort, order: newOrder };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortLinks.map(link => (
            <th key={link.id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {link.title}
                <SearchLink params={makeParams(link.sort)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== link.sort,
                        'fa-sort-up': sort === link.sort && order !== 'desc',
                        'fa-sort-down': sort === link.sort && order === 'desc',
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
        {people.map(person => (
          <PersonLink key={person.slug} people={people} person={person} />
        ))}
      </tbody>
    </table>
  );
};
