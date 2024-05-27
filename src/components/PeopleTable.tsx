/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams, useSearchParams } from "react-router-dom";
import { Person } from "../types";
import classNames from "classnames";
import { SearchLink } from "./SearchLink";
import { PersonLink } from "./PersonLink/PersonLink";

type Props = {
  people: Person[];
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, visiblePeople }) => {

  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (!parent) {
      return parentName;
    }

    return <PersonLink person={parent} />;
  };

  const getSortOption = (newSort: string) => {
    if (newSort !== currentSort) {
      return { sort: newSort, order: null };
    }

    if (newSort === currentSort && !order) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortClass = (sort: string) => {
    return classNames('fas', {
      'fa-sort': sort !== currentSort,
      'fa-sort-up': sort === currentSort && !order,
      'fa-sort-down': sort === currentSort && !!order,
    });
  };

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
              <SearchLink params={{ ...getSortOption('name') }}>
                <span className="icon">
                  <i className={getSortClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ ...getSortOption('sex') }}>
                <span className="icon">
                  <i className={getSortClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ ...getSortOption('born') }}>
                <span className="icon">
                  <i className={getSortClass('died')} />
                </span>
              </SearchLink>
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
      {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({ 'has-background-warning': slug === person.slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParent(person.motherName)}</td>
            <td>{getParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
