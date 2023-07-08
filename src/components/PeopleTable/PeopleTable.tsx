import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../../utils/SearchLink';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { slug } = useParams();
  const sortingLinks = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingLinks.map(link => {
            const lowLink = link.toLowerCase();

            return (
              <th key={link}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {link}
                  <SearchLink
                    params={{
                      sort: sort === lowLink && order
                        ? null
                        : lowLink,
                      order: sort === lowLink && !order
                        ? 'desc'
                        : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort': sort !== lowLink,
                            'fa-sort-up': sort === lowLink && !order,
                            'fa-sort-down': sort === lowLink && order,
                          },
                        )}
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              classNames({ 'has-background-warning': person.slug === slug })
            }
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
