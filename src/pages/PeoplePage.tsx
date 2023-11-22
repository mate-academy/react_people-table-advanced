import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Gender } from '../types/Gender';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>('');
  const [filterGenderStatus, setFilterGenderStatus]
  = useState<Gender>(Gender.ALL);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);

  const { slug } = useParams();

  const handleSelectPerson = (selectedSlug: string) => {
    setSelectedPersonSlug(selectedSlug);
  };

  const getCentury = (year: number) => {
    return Math.ceil(year / 100).toString();
  };

  useEffect(() => {
    const filterPeopleByCenturies = () => {
      if (selectedCenturies.length === 0) {
        return people;
      }

      return people.filter(person => {
        const personCentury = getCentury(person.born);

        return selectedCenturies.includes(personCentury);
      });
    };

    const filtered = filterPeopleByCenturies();

    setFilteredPeople(filtered);
  }, [people, selectedCenturies]);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
        if (slug) {
          setSelectedPersonSlug(slug);
        }
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, [slug]);

  useEffect(() => {
    const filterPeopleByGender = () => {
      const peopleCopy = [...people];

      switch (filterGenderStatus) {
        case Gender.MALE:
          return peopleCopy.filter(person => person.sex === 'm');
        case Gender.FEMALE:
          return peopleCopy.filter(person => person.sex === 'f');
        case Gender.ALL:
        default:
          return peopleCopy;
      }
    };

    const filtered = filterPeopleByGender();

    setFilteredPeople(filtered);
  }, [people, filterGenderStatus]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              selectedCenturies={selectedCenturies}
              setSelectedCenturies={setSelectedCenturies}
              filterGenderStatus={filterGenderStatus}
              setFilterGenderStatus={setFilterGenderStatus}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}
              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {/* <p>There are no people matching the current search criteria</p> */}
              {people.length > 0 && (
                <PeopleTable
                  filteredPeople={filteredPeople}
                  selectedPersonSlug={selectedPersonSlug}
                  handleSelectPerson={handleSelectPerson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
