import classNames from 'classnames';
import React from 'react';
import {
  Link, useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable:React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const isSelected = (peop: Person) => peop.slug === slug;
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';

  let newPeople = [...people];

  const filtersOnSex = () => {
    if (sex) {
      newPeople = newPeople.filter(a => a.sex === sex);
    }
  };

  const filterOnQuery = () => {
    newPeople = newPeople.filter(
      a => a.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || a.motherName?.toLocaleLowerCase().includes(
          query.toLocaleLowerCase(),
        )
        || a.fatherName?.toLocaleLowerCase().includes(
          query.toLocaleLowerCase(),
        ),
    );
  };

  filtersOnSex();
  filterOnQuery();

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {newPeople.map(a => (
          <tr
            data-cy="person"
            key={a.slug}
            className={classNames(
              { 'has-background-warning': isSelected(a) },
            )}
          >
            <td>
              <Link
                className={classNames({ 'has-text-danger': a.sex === 'f' })}
                to={{
                  pathname: `/people/${a.slug}`,
                  search: location.search,
                }}
              >
                {a.name}
              </Link>
            </td>
            <td>{a.sex}</td>
            <td>{a.born}</td>
            <td>{a.died}</td>
            <td>{a.mother ? <Link className="has-text-danger" to={`/people/${a.mother.slug}`}>{a.motherName}</Link> : a.motherName || '-'}</td>
            <td>{a.father ? <Link to={`/people/${a.father.slug}`}>{a.fatherName}</Link> : a.fatherName || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
