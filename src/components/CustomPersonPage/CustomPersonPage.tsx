import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../../api';
import { Person } from '../../types';
import './CustomPersonPage.scss';

export const CustomPersonPage: React.FC = () => {
  const { slug = '' } = useParams();
  const [person, setPerson] = useState<Person>();

  useEffect(() => {
    getPeople().then(people => {
      setPerson(people.find(el => el.slug === slug));
    });
  }, []);

  return (
    <>
      <h1 className="title">{`Custom ${person && person.name} Page`}</h1>
      <div className="mainDiv">
        <div className={classNames(
          'photo',
          {
            male: (person && (person.sex === 'm')),
            female: (person && (person.sex === 'f')),
          },
        )}
        />
        <div className="info">
          <table
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <tbody>
              <tr>
                <td>Name</td>
                <td>{person && person.name}</td>
              </tr>
              <tr>
                <td>Sex</td>
                <td>{person && person.sex}</td>
              </tr>
              <tr>
                <td>Born</td>
                <td>{person && person.born}</td>
              </tr>
              <tr>
                <td>Died</td>
                <td>{person && person.died}</td>
              </tr>
              <tr>
                <td>Mother</td>
                <td>{person && person.motherName}</td>
              </tr>
              <tr>
                <td>Father</td>
                <td>{person && person.fatherName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
