import { useParams, Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useState } from 'react';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const reversedSort = searchParams.get('order') || null;
  const { humanId } = useParams();

  // let sorted = false;
  // const [sorted, setSorted] = useState(false);

  const isFemale = (sex: string) => sex === 'f';

  // const handleSetSorted = () => {
  //   if (!reversedSort) {
  //     return (sorted = true);
  //   }

  //   return (sorted = false);

  //   // sorted isn`t changing
  // };

  // const handleSetSorted = () => {
  //   if (!reversedSort) {
  //     return setSorted(true);
  //   }

  //   return setSorted(false);
  //   // 2 clicks to set order
  // };

  // const handleSetSorted = () => {
  //   if (sorted) {
  //     searchParams.set('order', 'desc');
  //   }

  //   searchParams.delete('order', 'desc');

  //   return (sorted = true);
  // };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={{ sort: 'name' }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink
                  params={{ sort: 'sex', order: sorted ? 'decs' : null }}
                  onClick={handleSetSorted}
                >
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={{ sort: 'born' }}>
                  <span className="icon">
                    <i className="fas fa-sort-up" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={{ sort: 'died' }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(human => {
            const { name, sex, born, died, fatherName, motherName, slug } =
              human;

            const mum =
              people.find(mother => mother.name === motherName) || null;

            const papa =
              people.find(father => father.name === fatherName) || null;

            return (
              <tr
                data-cy="person"
                key={slug}
                className={classNames({
                  'has-background-warning': humanId === slug,
                })}
              >
                <td>
                  <Link
                    to={{
                      pathname: `${slug}`,
                      search: searchParams.toString(),
                    }}
                    className={classNames({
                      'has-text-danger': isFemale(sex),
                    })}
                  >
                    {name}
                  </Link>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                {mum ? (
                  <td>
                    <Link to={`${mum.slug}`} className="has-text-danger">
                      {motherName}
                    </Link>
                  </td>
                ) : (
                  <td>{motherName || '-'}</td>
                )}
                {papa ? (
                  <td>
                    <Link to={`${papa.slug}`}>{fatherName}</Link>
                  </td>
                ) : (
                  <td>{fatherName || '-'}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
