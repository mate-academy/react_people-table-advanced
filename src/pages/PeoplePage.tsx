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
  const params = new URLSearchParams(searchParams);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>('');
  const [filterGenderStatus, setFilterGenderStatus]
  = useState<Gender>(Gender.ALL);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [selectedCenturies, setSelectedCenturies] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { slug } = useParams();

  const getCentury = (year: number) => {
    return Math.ceil(year / 100).toString();
  };

  const handleSearchChange = (event: { target: { value: string; }; }) => {
    setSearchQuery(event.target.value);

    params.set('query', event.target.value);
    setSearcParams(params);

    if (event.target.value.length === 0) {
      setSearcParams('');
    }
  };

  useEffect(() => {
    let filtered = [...people];

    if (searchQuery) {
      filtered = filtered.filter(person => person
        .name.toLowerCase().includes(searchQuery.toLowerCase()));
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

    if (sort) {
      switch (sort) {
        case 'name':
        case 'sex':
          filtered = filtered.sort((a, b) => {
            return order === 'desc'
              ? b[sort].localeCompare(a[sort])
              : a[sort].localeCompare(b[sort]);
          });
          break;
        case 'born':
        case 'died':
          filtered = filtered.sort((a, b) => {
            return order === 'desc'
              ? b[sort] - a[sort]
              : a[sort] - b[sort];
          });
          break;
        default:
      }
    }

    setFilteredPeople(filtered);
  }, [people, searchQuery, filterGenderStatus, selectedCenturies, sort, order]);

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
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                setSearchQuery={setSearchQuery}
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
                {!errorMessage && !people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {!filteredPeople.length ? (
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable
                    filteredPeople={filteredPeople}
                    selectedPersonSlug={selectedPersonSlug}
                    handleSelectPerson={handleSelectPerson}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
