import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { getCentury } from '../../Utils/GetCentury';
import { AddPerson } from '../AddPerson/AddPerson';
import { Filters } from '../Filters/Filters';
import { Loader } from '../Loader';
import { PeopleTable } from '../Peopletable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [avalableCenturies, setAvalableCenturies] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoaded, setIsloaded] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  useEffect((() => {
    getPeople().then(res => {
      if (res) {
        const prepearedPeople = res.map(person => {
          const father = res
            .find(parent => person.fatherName === parent.name) || null;

          const mother = res
            .find(parent => person.motherName === parent.name) || null;

          return ({
            ...person,
            fatherName: person.fatherName || '--John Doe--',
            motherName: person.motherName || '--Jane Doe--',
            father,
            mother,
          }
          );
        });

        const peopleLivedCenturies = Array
          .from(new Set(prepearedPeople
            .map(person => getCentury(person).toString()).sort()));

        setAvalableCenturies(peopleLivedCenturies);
        setPeople(prepearedPeople);
      }
    }).finally(() => {
      setIsloaded(true);
    });
  }), []);

  const addPerson = (person: Person) => {
    setPeople(prevPeople => {
      if (prevPeople.some(prevPerson => prevPerson.slug === person.slug)) {
        return prevPeople;
      }

      return [...prevPeople, person];
    });
    setIsAdd(false);
  };

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople
      .filter(person => centuries.includes(getCentury(person).toString()));
  }

  if (query) {
    const lowerQuary = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return [person.name, person.fatherName, person.motherName]
        .join('\n')
        .toLowerCase()
        .includes(lowerQuary);
    });
  }

  if (sortField) {
    visiblePeople.sort((firstPerson, secondPerson) => {
      switch (sortField) {
        case 'name':
        case 'sex':
        case 'fatherName':
        case 'motherName':
          return firstPerson[sortField].localeCompare(secondPerson[sortField]);

        case 'born':
        case 'died':
          return firstPerson[sortField] - secondPerson[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      visiblePeople.reverse();
    }
  }

  return (
    <div>
      <h1 className="title has-text-centered">People</h1>
      {isLoaded
        ? (
          <div className="block">
            <div className="columns">
              <PeopleTable people={visiblePeople} />
              <div>
                <Filters avalableCenturies={avalableCenturies} />
                {!isAdd
                  ? (
                    <div className="column is-one-fifths">
                      <div className="panel">
                        <div className="panel-block">
                          <button
                            type="button"
                            className="button is-danger is-fullwidth"
                            onClick={() => setIsAdd(true)}
                          >
                            Add person
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                  : (
                    <AddPerson people={people} addPerson={addPerson} />
                  )}

              </div>
            </div>

          </div>
        )
        : (<Loader />)}

    </div>
  );
};
