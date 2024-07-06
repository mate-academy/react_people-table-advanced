import classNames from 'classnames';
import { Person } from '../types';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { chooseFatherLink, chooseMotherLink } from '../utils/functions';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { urlSlug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function chooseSortPath(sortBy: string) {
    if (!sort) {
      return `#/people?sort=${sortBy}`;
    }

    if (sort && !order) {
      return `#/people?sort=${sortBy}&order=desc`;
    }

    if (sort && order) {
      return `#/people`;
    }

    return `#/people?sort=${sortBy}`;
  }

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
              <a href={chooseSortPath('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !sort || sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href={chooseSortPath('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !sort || sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href={chooseSortPath('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !sort || sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href={chooseSortPath('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': !sort || sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map((person: Person) => {
          const { name, slug, sex, born, died } = person;

          return (
            <tr
              data-cy="person"
              key={name}
              className={classNames({
                'has-background-warning': urlSlug === slug,
              })}
            >
              <td>
                <NavLink
                  className={classNames({ 'has-text-danger': sex === 'f' })}
                  to={{
                    pathname: `../${slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {name}
                </NavLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{chooseMotherLink(person)}</td>
              <td>{chooseFatherLink(person)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
