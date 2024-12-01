import { FC } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { findParent } from '../helpers/findParent';
import { getSearchWith } from '../../utils/searchHelper';

type Props = {
  people: Person[],
  sort: string | null;
  order: string | null,
};

const sortOptions = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: FC<Props> = ({ people, sort, order }) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOptions.map(sortName => (
            <th key={sortName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortName}
                <Link
                  to={{
                    search: getSearchWith(searchParams, {
                      sort: (sort === sortName.toLowerCase() && order)
                        ? null
                        : sortName.toLowerCase(),
                      order: (sort === sortName.toLowerCase() && !order)
                        ? 'desc'
                        : null,
                    }),
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
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
        {people.map((person) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          const mother = findParent(people, motherName);
          const father = findParent(people, fatherName);

          return (
            <tr
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
              data-cy="person"
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
