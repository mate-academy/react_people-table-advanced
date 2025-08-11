import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getFilteredPeople } from '../filters/filteringPeople';
import { PersonLink } from './PersonLink';
import { TableTitle } from '../models/TableTitle';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  const getNextOrder = (currentOrder: string | null) =>
    currentOrder === 'asc' ? 'desc' : 'asc';

  const handleSortClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sortBy: string,
  ) => {
    e.preventDefault();
    const nextOrder = sort === sortBy && order === 'asc' ? 'desc' : 'asc';

    window.location.href = `/people?sort=${sortBy}&order=${nextOrder}`;
  };

  const filteredPeople = getFilteredPeople(people, {
    sex,
    centuries,
    query,
    sort,
    order,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableTitle).map(title => {
            const key = title.toLowerCase();
            const isActive = sort === key;
            const nextOrder = isActive ? getNextOrder(order) : 'asc';
            const shouldBeSortered =
              title !== TableTitle.Mother && title !== TableTitle.Father;

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  {shouldBeSortered && (
                    <a
                      href={`/people?sort=${key}&order=${nextOrder}`}
                      onClick={e => handleSortClick(e, key)}
                    >
                      <span className="icon">
                        <i
                          className={`fas fa-sort${
                            isActive ? (order === 'asc' ? '-up' : '-down') : ''
                          }`}
                        />
                      </span>
                    </a>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <>
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <PersonLink person={person.father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
