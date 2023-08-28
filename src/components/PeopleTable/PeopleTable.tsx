import { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { SortHeaders } from '../../types/SortHeaders';

type Props = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const sortValue = searchParams.get('sort');
  const order = searchParams.get('order');

  const hasValueAndOrder = (value: string) => sortValue === value && order;
  const hasValueNoOrder = (value: string) => sortValue === value && !order;

  const isPersonSelected = (slug: string) => {
    return slug === selectedSlug;
  };

  const renderParent = (name: string | null) => {
    const parent = people.find(person => person.name === name);

    if (!parent) {
      return name || '-';
    }

    return (
      <PersonLink person={parent} />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortHeaders).map(([key, value]) => (
            <th key={value}>
              <span
                className="
                  is-flex
                  is-flex-wrap-nowrap
                "
              >
                {key}
                <SearchLink
                  params={({
                    sort: hasValueAndOrder(value)
                      ? null
                      : value,
                    order: hasValueNoOrder(value)
                      ? 'desc'
                      : null,
                  })}
                >
                  <span className="icon">
                    <i className={classNames(
                      'fas',
                      { 'fa-sort': sortValue !== value },
                      { 'fa-sort-up': hasValueNoOrder(value) },
                      { 'fa-sort-down': hasValueAndOrder(value) },
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
        {people.map(({
          name,
          sex,
          born,
          died,
          motherName,
          fatherName,
          slug,
        }) => (
          <tr
            key={name}
            data-cy="person"
            className={classNames({
              'has-background-warning': isPersonSelected(slug),
            })}
          >
            <td>
              <PersonLink person={{ name, sex, slug }} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>

            <td>
              {renderParent(motherName)}
            </td>

            <td>
              {renderParent(fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
