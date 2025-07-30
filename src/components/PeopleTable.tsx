/* eslint-disable */

import React, { useEffect, useMemo, useState } from 'react';
import { usePeopleContext } from '../context/PeopleContext';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { filter } from 'cypress/types/bluebird';

type keyToSort = 'name' | 'sex' | 'born' | 'died' | null;

export const PeopleTable: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { peoples, query, sex, centuries } = usePeopleContext();
  const { slug: currentPersonSlug } = useParams();
  const [arrState, setArrState] = useState<number>(0);

  const sortKey = searchParams.get('sort') as keyToSort;
  const order = searchParams.get('order');

  const filteredPeoples = useMemo(() => {
    let result = [...(peoples || [])];

    if (sortKey) {
      if (order) {
        setArrState(2);
      } else {
        setArrState(1);
      }
    } else {
      setArrState(0);
    }

    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex && sex !== 'all') {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const bornCentury = parseInt(person.born.toString().slice(0, 2)) + 1;
        return centuries.includes(bornCentury);
      });
    }

    if (sortKey) {
      result.sort((a, b) => {
        let valueA: string | number = a[sortKey];
        let valueB: string | number = b[sortKey];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          const comparison = valueA.localeCompare(valueB);
          return order === 'desc' ? -comparison : comparison;
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return order === 'desc' ? valueB - valueA : valueA - valueB;
        }

        return 0;
      });
    }

    return result;
  }, [peoples, query, sex, centuries, searchParams]);

  const handleArrStateChange = (param: string) => {
    const params = new URLSearchParams(searchParams);

    if (sortKey === param) {
      switch (arrState) {
        case 0:
          setArrState(1);
          params.set('sort', param);
          params.delete('order');
          break;
        case 1:
          setArrState(2);
          params.set('sort', param);
          params.set('order', 'desc');
          break;
        case 2:
          setArrState(0);
          params.delete('sort');
          params.delete('order');
          break;
      }
    } else {
      setArrState(1);
      params.set('sort', param);
      params.delete('order');
    }

    setSearchParams(params);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table
                is-striped
                is-hoverable
                is-narrow
                is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                onClick={() => {
                  handleArrStateChange('name');
                }}
              >
                <span className="icon">
                  <i
                    className={`
                      fas
                      ${
                        sortKey === 'name'
                          ? arrState === 1
                            ? 'fa-sort-up'
                            : arrState === 2
                              ? 'fa-sort-down'
                              : 'fa-sort'
                          : 'fa-sort'
                      }
                    `}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={() => {
                  handleArrStateChange('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={`
                      fas
                      ${
                        sortKey === 'sex'
                          ? arrState === 1
                            ? 'fa-sort-up'
                            : arrState === 2
                              ? 'fa-sort-down'
                              : 'fa-sort'
                          : 'fa-sort'
                      }
                    `}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={() => {
                  handleArrStateChange('born');
                }}
              >
                <span className="icon">
                  <i
                    className={`
                      fas
                      ${
                        sortKey === 'born'
                          ? arrState === 1
                            ? 'fa-sort-up'
                            : arrState === 2
                              ? 'fa-sort-down'
                              : 'fa-sort'
                          : 'fa-sort'
                      }
                    `}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={() => {
                  handleArrStateChange('died');
                }}
              >
                <span className="icon">
                  <i
                    className={`
                      fas
                      ${
                        sortKey === 'died'
                          ? arrState === 1
                            ? 'fa-sort-up'
                            : arrState === 2
                              ? 'fa-sort-down'
                              : 'fa-sort'
                          : 'fa-sort'
                      }
                    `}
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
        {filteredPeoples?.map(person => {
          const motherPerson = peoples?.find(
            p => p.name === person.motherName && p.slug,
          );

          const fatherPerson = peoples?.find(
            p => p.name === person.fatherName && p.slug,
          );

          return (
            <tr
              key={person.name}
              data-cy="person"
              className={
                currentPersonSlug === person.slug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName === null ? (
                  '-'
                ) : motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  person.motherName
                )}
              </td>
              <td>
                {person.fatherName === null ? (
                  '-'
                ) : fatherPerson ? (
                  <PersonLink person={fatherPerson} />
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
