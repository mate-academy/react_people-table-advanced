import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type Search = {
  (
    searchParams: URLSearchParams,
    params: {
      [keys: string]: string | string[] | null;
    }
  ): string;
};

export const PeopleTable: React.FC<{
  setSearchWith: Search;
  person: Person;
  selectedTodoId: string;
  visiblePeople: Person[];
}> = ({
  setSearchWith, person, selectedTodoId, visiblePeople,
}) => {
  const {
    name, sex, born, died, fatherName, motherName, slug,
  } = person;

  const [searchParamThirdAttach] = useSearchParams();

  const linkParents = (selectedParrents: string | null) => {
    const findedParents
      = selectedParrents
      && visiblePeople.find((people) => people.name === selectedParrents);

    if (findedParents) {
      return (
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: setSearchWith(searchParamThirdAttach, {
              search: searchParamThirdAttach.get('search'),
              centuries: searchParamThirdAttach.getAll('centuries'),
              sex: searchParamThirdAttach.get('sex'),
            }),
          }}
          className={classNames({
            'has-text-danger': findedParents.sex === 'f',
          })}
        >
          {selectedParrents}
        </Link>
      );
    }

    return selectedParrents || ' - ';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedTodoId === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: setSearchWith(searchParamThirdAttach, {
              search: searchParamThirdAttach.get('search'),
              centuries: searchParamThirdAttach.getAll('centuries'),
              sex: searchParamThirdAttach.get('sex'),
            }),
          }}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{linkParents(motherName)}</td>
      <td>{linkParents(fatherName)}</td>
    </tr>
  );
};
