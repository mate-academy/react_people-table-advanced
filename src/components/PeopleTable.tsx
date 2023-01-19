import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const hasParamsSort = (value: string) => (
    value.toLowerCase() === sort && !order
  );
  const hasParamsSortAndOrder = (value: string) => (
    value.toLowerCase() === sort && order
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(header => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {header}
                <SearchLink
                  params={{
                    sort: !hasParamsSortAndOrder(header)
                      ? header.toLowerCase()
                      : null,
                    order: hasParamsSort(header)
                      ? 'desс'
                      : null,
                  }}
                  className="is-flex is-flex-wrap-nowrap"
                >
                  <span className="icon">
                    <i className={classNames(
                      'fas',
                      { 'fa-sort': !hasParamsSortAndOrder(header) },
                      { 'fa-sort-up': hasParamsSort(header) },
                      { 'fa-sort-down': hasParamsSortAndOrder(header) },
                    )}
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
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            isSelected={slug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
