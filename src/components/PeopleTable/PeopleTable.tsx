/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { FC } from 'react';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink';


type Props = {
  people: Person[] | [];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [search] = useSearchParams();




  const curentSort = search.get('sort');
  const curentOrder = search.get('order');



  const toggleName = () => {


  if (curentSort === 'name' && curentOrder === 'desc') {
     return { sort: null, order: null };
  }

  if (curentSort === 'name') {
    return { sort: 'name', order: 'desc' };
  }


  return { sort: 'name' ,order : null};
};



  const toggleSex = () => {


    if (curentSort === 'sex' && curentOrder === 'desc') {
      return { sort: null, order : null}
    }

    if (curentSort=== 'sex') {
      return { sort: 'sex', order : 'desc'}
    }




    return {sort: 'sex',order : null}
  }


  const toggleBorn = () => {

    if (curentSort === 'born' && curentOrder === 'desc') {
      return {sort: null , order : null}
    }



    if (curentSort === 'born') {
      return {sort : 'born' , order : 'desc'}
    }

    return { sort: 'born', order: null }

  }



  const toggleDied = () => {

    if (curentSort === 'died' && curentOrder === 'desc') {
      return {sort: null , order : null}
    }



    if (curentSort === 'died') {
      return {sort : 'died' , order : 'desc'}
    }

    return { sort: 'died', order: null }
  }



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
              <SearchLink

                params={toggleName()}


              >
                <span className="icon">
                  <i className={`fas ${
    curentSort === 'name'
      ? curentOrder === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up'
      : 'fa-sort'
  }`}

                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={toggleSex()}

              >

                <span className="icon">
                  <i className={`fas ${
    curentSort === 'sex'
      ? curentOrder === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up'
      : 'fa-sort'
  }`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={toggleBorn()}
              >
                <span className="icon">
                  <i className={`fas ${
    curentSort === 'born'
      ? curentOrder === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up'
      : 'fa-sort'
  }`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={toggleDied()}>
                <span className="icon">
                 <i className={`fas ${
    curentSort === 'died'
      ? curentOrder === 'desc'
        ? 'fa-sort-down'
        : 'fa-sort-up'
      : 'fa-sort'
  }`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
              key={person.slug}
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
