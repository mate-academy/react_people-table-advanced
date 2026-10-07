import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  // Читаем текущие параметры сортировки из URL
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  // Вспомогательная функция для поиска родителей по имени
  const getPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  // Функция для рендера заголовков с правильными иконками и ссылками
  const renderSortHeader = (field: SortField, label: string) => {
    let nextSort: string | null = field;
    let nextOrder: string | null = null;
    let iconClass = 'fas fa-sort';

    if (currentSort === field) {
      if (currentOrder === 'desc') {
        // 3-й клик: сейчас desc, значит следующий клик сбрасывает сортировку
        nextSort = null;
        nextOrder = null;
        iconClass = 'fas fa-sort-down';
      } else {
        // 2-й клик: сейчас asc, значит следующий клик делает desc
        nextSort = field;
        nextOrder = 'desc';
        iconClass = 'fas fa-sort-up';
      }
    }

    // Генерируем новую строку запроса, сохраняя остальные фильтры
    const nextSearch = getSearchWith(searchParams, {
      sort: nextSort,
      order: nextOrder,
    });

    return (
      <th>
        <span className="is-flex is-flex-wrap-nowrap">
          {label}
          <Link to={{ pathname, search: nextSearch }}>
            <span className="icon">
              <i className={iconClass} />
            </span>
          </Link>
        </span>
      </th>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeader('name', 'Name')}
          {renderSortHeader('sex', 'Sex')}
          {renderSortHeader('born', 'Born')}
          {renderSortHeader('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = getPersonByName(person.motherName);
          const father = getPersonByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
