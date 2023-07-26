import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  order: string;
  sortBy: string;
}

const sortByList = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({
  people,
  order,
  sortBy,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const switchingSort = (param: string) => {
    if (param === sortBy) {
      if (order === 'asc') {
        return { sort: param, order: 'desc' };
      }

      return { sort: null, order: null };
    }

    return { sort: param, order: 'asc' };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortByList.map(sortName => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortName.charAt(0).toUpperCase() + sortName.slice(1)}
                <SearchLink
                  params={switchingSort(`${sortName}`)}
                >
                  <span className="icon">
                    <i className={cn('fas', {
                      'fa-sort': sortBy !== `${sortName}`,
                      'fa-sort-up': sortBy === `${sortName}` && order === 'asc',
                      'fa-sort-down': sortBy === `${sortName}` && order === 'desc',
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
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: PersonSlug,
          } = person;

          const foundMother = people
            .find(mother => mother.name === motherName) || null;

          const foundFather = people
            .find(father => father.name === fatherName) || null;

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning':
                  slug === PersonSlug,
              })}
              key={PersonSlug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {foundMother
                  ? (
                    <PersonLink person={foundMother} />
                  )
                  : <p>{motherName || '-'}</p>}

              </td>

              <td>
                {foundFather
                  ? (
                    <PersonLink person={foundFather} />
                  )
                  : <p>{fatherName || '-'}</p>}

              </td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
