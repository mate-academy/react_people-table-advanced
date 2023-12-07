import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { SearchLink } from './SearchLink';
import { Sort } from '../types/Sort';
import { getSortingOptions } from '../utils/getSortingOptions';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
}) => {
  const { personSlug } = useParams();
  const order = searchParams.get('order') || '';
  const sort = searchParams.get('sort') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sort).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={getSortingOptions(sort, order, value)}
                >
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': sort !== value,
                      'fa-sort-up': sort === value && !order,
                      'fa-sort-down': sort === value && order,
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
        {people.map(person => {
          const mother = people.find(mom => mom.name === person.motherName);
          const father = people.find(dad => dad.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': personSlug === person.slug,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{`${person.sex}`}</td>
              <td>{`${person.born}`}</td>
              <td>{`${person.died}`}</td>
              <td>
                {
                  mother
                    ? <PeopleLink person={mother} />
                    : person.motherName || '-'
                }
              </td>
              <td>
                {
                  father
                    ? <PeopleLink person={father} />
                    : person.fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
