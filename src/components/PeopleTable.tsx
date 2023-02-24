import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[] | undefined;
  searchParams: URLSearchParams;
  setSearchParams: (value: string) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  setSearchParams,
}) => {
  const location = useLocation().pathname;
  const [slug, setSlug] = useState<string | null>();
  const selectedPerson = useParams();

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const params = searchParams.toString() !== '' ? `?${searchParams}` : '';

  const sortBy = (
    name: string,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (name !== sort) {
      setSearchParams(getSearchWith(searchParams, { sort: name }));

      return;
    }

    if (!order) {
      setSearchParams(getSearchWith(searchParams, { order: 'desc' }));
    } else {
      setSearchParams(getSearchWith(searchParams, { order: null }));
    }
  };

  useEffect(() => {
    setSlug(selectedPerson.slug || null);
  }, [selectedPerson]);

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
              <a
                href={`#${location}${params}`}
                onMouseDown={(e) => sortBy('name', e)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas fa-sort', {
                      'fa-sort-up': !order && sort === 'name',
                      'fa-sort-down': order && sort === 'name',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href={`#${location}${params}`}
                onMouseDown={(e) => sortBy('sex', e)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas fa-sort', {
                      'fa-sort-up': !order && sort === 'sex',
                      'fa-sort-down': order && sort === 'sex',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href={`#${location}${params}`}
                onMouseDown={(e) => sortBy('born', e)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas fa-sort', {
                      'fa-sort-up': !order && sort === 'born',
                      'fa-sort-down': order && sort === 'born',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href={`#${location}${params}`}
                onMouseDown={(e) => sortBy('died', e)}
              >
                <span className="icon">
                  <i
                    className={classNames('fas fa-sort', {
                      'fa-sort-up': !order && sort === 'died',
                      'fa-sort-down': order && sort === 'died',
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
        {people?.map((person) => {
          let father = person.fatherName || '-';
          let mother = person.motherName || '-';

          if (person.father) {
            father = person.father.name;
          }

          if (person.mother) {
            mother = person.mother.name;
          }

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <a
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                  href={`#/people/${person.slug}${params}`}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <a
                    className="has-text-danger"
                    href={`#/people/${person.mother.slug}${params}`}
                  >
                    {person.mother.name}
                  </a>
                ) : (
                  mother
                )}
              </td>
              <td>
                {person.father ? (
                  <a href={`#/people/${person.father.slug}${params}`}>
                    {person.father.name}
                  </a>
                ) : (
                  father
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
