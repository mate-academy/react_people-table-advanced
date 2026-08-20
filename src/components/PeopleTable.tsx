/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';
import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { filtro } from './filtro';
import { ordenar } from './sort';
interface SortType {
  type: string;
  direction: string;
}
export const PeopleTable = () => {
  const [personList, setPersonList] = useState<Person[]>([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [definedList, setDefinedList] = useState<Person[]>([]);
  const [sorts, setSorts] = useState([
    {
      type: 'Name',
      direction: 'no',
    },
    {
      type: 'Sex',
      direction: 'no',
    },
    {
      type: 'Born',
      direction: 'no',
    },
    {
      type: 'Died',
      direction: 'no',
    },
  ]);
  const setarDirecao = (): string => {
    const query = searchParams.get('sort');

    if (!searchParams.get('sort')) {
      return 'up';
    } else if (query && searchParams.get('order') !== 'desc') {
      return 'down';
    }

    return 'no';

    // switch (direction) {
    //   case 'no':
    //     return 'up';
    //   case 'up':
    //     return 'down';
    //   case 'down':
    //     return 'no';
    // }

    // return '';
  };

  const setOrdamento = (parametro: SortType) => {
    setSorts(prev =>
      prev.map(sort =>
        sort.type === parametro.type
          ? { ...sort, direction: setarDirecao() }
          : sort,
      ),
    );
  };

  const setSeta = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', param.toLocaleLowerCase());
    switch (value) {
      case 'no':
        params.delete('sort');
        params.delete('order');
        break;
      case 'up':
        params.delete('order');
        break;
      case 'down':
        params.set('order', 'desc');
    }

    setSearchParams(params);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let newTodo = await getPeople();

        setDefinedList(newTodo);
        let people: Person[] = [];

        newTodo = filtro(newTodo, searchParams)[1];
        people = filtro(newTodo, searchParams)[0];

        if (searchParams.get('sort')) {
          if (people.length === 0) {
            newTodo = ordenar(newTodo, searchParams);
          } else {
            people = ordenar(people, searchParams);
          }
        }

        if (people.length === 0) {
          setPersonList(newTodo);
        } else {
          setPersonList(people);
        }
      } catch (e) {
        throw new Error('Erro no getData' + e);
      }
    };

    getData();
  }, [searchParams]);
  const returnPais = (infos: Person, paiouMae: string) => {
    if (paiouMae === 'mae') {
      return definedList.find(r => r.name === infos.motherName);
    } else {
      return definedList.find(r => r.name === infos.fatherName);
    }
  };

  const definirClass = (var1: SortType) => {
    if (searchParams.get('sort') !== var1.type.toLocaleLowerCase()) {
      return '';
    } else {
      if (searchParams.get('order')) {
        return '-down';
      }

      return '-up';
    }
  };

  return (
    <>
      {personList.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {sorts.map(sortElement => (
                <>
                  <th key={sortElement.type}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {sortElement.type}
                      <a
                        onClick={() => {
                          const novaDirecao = setarDirecao();

                          setOrdamento(sortElement);
                          setSeta(sortElement.type, novaDirecao);
                        }}
                      >
                        <span className="icon">
                          <i
                            className={`fas fa-sort${definirClass(sortElement)}`}
                          />
                        </span>
                      </a>
                    </span>
                  </th>
                </>
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {personList.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={`${location.pathname.includes(person.slug) ? 'has-background-warning' : ''}`}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {returnPais(person, 'mae') ? (
                    <>
                      <Link
                        className="has-text-danger"
                        to={`/people${returnPais(person, 'mae') !== undefined ? `/${returnPais(person, 'mae')?.slug}` : ''}`}
                      >
                        {''}
                        {person.motherName}
                      </Link>
                    </>
                  ) : (
                    person.motherName || '-'
                  )}
                </td>
                <td>
                  {returnPais(person, 'pai') ? (
                    <Link
                      to={`/people${returnPais(person, 'pai') !== undefined ? `/${returnPais(person, 'pai')?.slug}` : ''}`}
                    >
                      {''}
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
