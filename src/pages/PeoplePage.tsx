import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Gender } from '../types/Gender';

const MALE_GENDER = 'm';
const FEMALE_GENDER = 'f';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearcParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>('');
  const [filterGenderStatus, setFilterGenderStatus]
  = useState<Gender>(Gender.ALL);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { slug } = useParams();

  const getCentury = (year: number) => {
    return Math.ceil(year / 100).toString();
  };

  const handleSearchChange = (event: { target: { value: string; }; }) => {
    setSearchQuery(event.target.value.toLowerCase());

    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value.toLowerCase());
    setSearcParams(params);
  };

  useEffect(() => {
    let filtered = [...people];

    if (searchQuery) {
      filtered = filtered.filter(person => person
        .name.toLowerCase().includes(searchQuery.trim()));
    }

    switch (filterGenderStatus) {
      case Gender.MALE:
        filtered = filtered.filter(person => person.sex === MALE_GENDER);
        break;
      case Gender.FEMALE:
        filtered = filtered.filter(person => person.sex === FEMALE_GENDER);
        break;
      case Gender.ALL:
      default:
        break;
    }

    if (selectedCenturies.length > 0) {
      filtered = filtered.filter(person => selectedCenturies
        .includes(getCentury(person.born)));
    }

    setFilteredPeople(filtered);
  }, [people, searchQuery, filterGenderStatus, selectedCenturies]);

  const handleSelectPerson = (selectedSlug: string) => {
    setSelectedPersonSlug(selectedSlug);
  };

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

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
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
              {!isLoading && !errorMessage && !people.length && (
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
