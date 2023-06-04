import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SortType } from './SortType';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortType sortBy="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortType sortBy="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortType sortBy="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortType sortBy="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherNameFound = people.find(
            p => p.name === person.motherName,
          );
          const fatherNameFound = people.find(
            p => p.name === person.fatherName,
          );

          return (
            <>
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames(
                  { 'has-background-warning': person.slug === selectedSlug },
                )}
              >
                <td>
                  <Link
                    to={`../${person.slug}`}
                    className={classNames(
                      { 'has-text-danger': person.sex === 'f' },
                    )}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {motherNameFound
                    ? (
                      <Link
                        to={`../${motherNameFound?.slug}`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </Link>
                    )
                    : person.motherName || '-'}
                </td>

                <td>
                  {fatherNameFound
                    ? (
                      <Link to={`../${fatherNameFound?.slug}`} className="">
                        {person.fatherName}
                      </Link>
                    )
                    : person.fatherName || '-'}
                </td>
              </tr>
            </>
          );
        }) }
      </tbody>
    </table>
  );
};
