import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person, SortKey } from '../types';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const sortKey = searchParams.get('sort') as SortKey | null;
  const sortOrder = (searchParams.get('order') ?? 'asc') as 'asc' | 'desc';

  const peopleByName = new Map(people.map(p => [p.name, p]));

  const getSortParams = (key: SortKey) => {
    if (sortKey !== key) {
      return { sort: key, order: null };
    }

    if (sortOrder === 'asc') {
      return { sort: key, order: 'desc' as const };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (key: SortKey) => {
    if (sortKey !== key) {
      return 'fa-sort';
    }

    return sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  const renderPerson = (name?: string | null): React.ReactNode => {
    if (!name) {
      return '-';
    }

    const person = peopleByName.get(name);

    return person ? <PersonLink person={person} /> : name;
  };

  const SortableHeader = ({
    label,
    keyName,
  }: {
    label: string;
    keyName: SortKey;
  }) => (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <SearchLink params={getSortParams(keyName)}>
          <span className="icon">
            <i className={classNames('fas', getSortIconClass(keyName))} />
          </span>
        </SearchLink>
      </span>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortableHeader label="Name" keyName="name" />
          <SortableHeader label="Sex" keyName="sex" />
          <SortableHeader label="Born" keyName="born" />
          <SortableHeader label="Died" keyName="died" />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPerson(person.motherName)}</td>
            <td>{renderPerson(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
