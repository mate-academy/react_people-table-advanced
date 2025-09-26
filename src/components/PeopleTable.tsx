import { useMemo } from "react";

/* eslint-disable jsx-a11y/control-has-associated-label */
type Person = {
  slug: string;
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
};

type Props = {
  people: Person[];
  sortField: string | null;
  sortOrder: string | null;
  onSort: (field: string) => void;
  onSelectPerson: (slug: string) => void;
  selectedSlug?: string;
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sortField,
  sortOrder,
  onSort,
  onSelectPerson,
  selectedSlug,
  searchParams,
}) => {
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    if (sortOrder === 'desc') {
      return <i className="fas fa-sort-down" />;
    }

    return <i className="fas fa-sort-up" />;
  };

  // Create lookup map for efficient parent search
  const peopleMap = useMemo(() => {
    const map = new Map<string, Person>();
    people.forEach(person => {
      map.set(person.name.toLowerCase().trim(), person);
    });
    return map;
  }, [people]);

  // Функція для обробки кліку з підтримкою модифікаторів
  const handleLinkClick = (e: React.MouseEvent, slug: string) => {
    // Дозволяємо стандартну поведінку для модифікованих кліків (Ctrl+click, Middle click)
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      return;
    }

    e.preventDefault();
    onSelectPerson(slug);
  };

  const searchString = searchParams.toString();
  const hrefSuffix = searchString ? `?${searchString}` : '';

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
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => onSort('name')}
              >
                <span className="icon">{renderSortIcon('name')}</span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => onSort('sex')}
              >
                <span className="icon">{renderSortIcon('sex')}</span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => onSort('born')}
              >
                <span className="icon">{renderSortIcon('born')}</span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => onSort('died')}
              >
                <span className="icon">{renderSortIcon('died')}</span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleMap.get(person.motherName.toLowerCase().trim())
            : null;
          const father = person.fatherName
            ? peopleMap.get(person.fatherName.toLowerCase().trim())
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === selectedSlug ? 'has-background-warning' : ''}
            >
              <td>
                <a
                  href={`#/people/${person.slug}${hrefSuffix}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  onClick={(e) => handleLinkClick(e, person.slug)}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <a
                      href={`#/people/${mother.slug}${hrefSuffix}`}
                      className="has-text-danger"
                      onClick={(e) => handleLinkClick(e, mother.slug)}
                    >
                      {person.motherName}
                    </a>
                  ) : (
                    // Матері немає в таблиці - показуємо як текст
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <a
                      href={`#/people/${father.slug}${hrefSuffix}`}
                      onClick={(e) => handleLinkClick(e, father.slug)}
                    >
                      {person.fatherName}
                    </a>
                  ) : (
                    // Батька немає в таблиці - показуємо як текст
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
