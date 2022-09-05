import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string | undefined,
};

function getCentury(year: number) {
  if (year === 0) {
    return '1';
  }

  return (Math.floor((year - 1) / 100 + 1)).toString();
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const isSelected = (person: Person) => person.slug === selectedSlug;
  const [searchParams] = useSearchParams();
  const [visiblePeople, setVisiblePeople] = useState([...people]);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const [nameCounter, setNameCounter] = useState(0);
  const [sexCounter, setSexCounter] = useState(0);
  const [bornCounter, setBornCounter] = useState(0);
  const [diedCounter, setDiedCounter] = useState(0);

  // const query = useMemo(() => (
  //   searchParams.get('query')
  // ), [query]) || '';

  // const centuries = useMemo(() => (
  //   searchParams.getAll('centuries')
  // ), [centuries]) || [];

  // console.log(centuries);

  useEffect(() => {
    let newPeople = people.filter(person => {
      if (
        person.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        || person.motherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
        || person.fatherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
      ) {
        return true;
      }

      return false;
    });

    if (centuries.length > 0) {
      newPeople = [...newPeople].filter(person => {
        if (centuries.includes(getCentury(+person.born))) {
          return true;
        }

        return false;
      });
    }

    if (sex !== '') {
      newPeople = [...newPeople].filter(person => person.sex === sex);
    }

    if (sort) {
      switch (sort) {
        case 'name':
          newPeople = [...newPeople]
            .sort((a, b) => a.name.localeCompare(b.name));
          break;

        case 'sex':
          newPeople = [...newPeople]
            .sort((a, b) => a.sex.localeCompare(b.sex));
          break;

        case 'born':
          newPeople = [...newPeople]
            .sort((a, b) => a.born - b.born);
          break;

        case 'died':
          newPeople = [...newPeople]
            .sort((a, b) => a.died - b.died);
          break;
        default:
          break;
      }
    }

    if (order) {
      newPeople = [...newPeople].reverse();
    }

    setVisiblePeople(newPeople);
  }, [query, centuries]);

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

              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setNameCounter(nameCounter + 1);

                  if (nameCounter === 2) {
                    setNameCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: nameCounter === 0 || nameCounter === 1
                      ? 'name'
                      : null,
                    order: nameCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': nameCounter === 0 },
                    { 'fa-sort-up': nameCounter === 1 },
                    { 'fa-sort-down': nameCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setSexCounter(sexCounter + 1);

                  if (sexCounter === 2) {
                    setSexCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: sexCounter === 0 || sexCounter === 1
                      ? 'sex'
                      : null,
                    order: sexCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sexCounter === 0 },
                    { 'fa-sort-up': sexCounter === 1 },
                    { 'fa-sort-down': sexCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setBornCounter(bornCounter + 1);

                  if (bornCounter === 2) {
                    setBornCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: bornCounter === 0 || bornCounter === 1
                      ? 'born'
                      : null,
                    order: bornCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': bornCounter === 0 },
                    { 'fa-sort-up': bornCounter === 1 },
                    { 'fa-sort-down': bornCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                onClick={() => {
                  setSexCounter(0);
                  setNameCounter(0);
                  setBornCounter(0);
                  setDiedCounter(0);
                  setDiedCounter(diedCounter + 1);

                  if (diedCounter === 2) {
                    setDiedCounter(0);
                  }
                }}
                to={{
                  search: getSearchWith(searchParams, {
                    sort: diedCounter === 0 || diedCounter === 1
                      ? 'born'
                      : null,
                    order: diedCounter === 1
                      ? 'desc'
                      : null,
                  }),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': diedCounter === 0 },
                    { 'fa-sort-up': diedCounter === 1 },
                    { 'fa-sort-down': diedCounter === 2 },
                  )}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonLink
            people={people}
            person={person}
            isSelected={isSelected}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};

// export const PeopleTable = () => {
//   return (
//     <table
//       data-cy="peopleTable"
//       className="table is-striped is-hoverable is-narrow is-fullwidth"
//     >
// <thead>
//   <tr>
//     <th>
//       <span className="is-flex is-flex-wrap-nowrap">
//         Name
//         <a href="#/people?sort=name">
//           <span className="icon">
//             <i className="fas fa-sort" />
//           </span>
//         </a>
//       </span>
//     </th>

//     <th>
//       <span className="is-flex is-flex-wrap-nowrap">
//         Sex
//         <a href="#/people?sort=sex">
//           <span className="icon">
//             <i className="fas fa-sort" />
//           </span>
//         </a>
//       </span>
//     </th>

//     <th>
//       <span className="is-flex is-flex-wrap-nowrap">
//         Born
//         <a href="#/people?sort=born&amp;order=desc">
//           <span className="icon">
//             <i className="fas fa-sort-up" />
//           </span>
//         </a>
//       </span>
//     </th>

//     <th>
//       <span className="is-flex is-flex-wrap-nowrap">
//         Died
//         <a href="#/people?sort=died">
//           <span className="icon">
//             <i className="fas fa-sort" />
//           </span>
//         </a>
//       </span>
//     </th>

//     <th>Mother</th>
//     <th>Father</th>
//   </tr>
// </thead>

//       <tbody>
//         <tr data-cy="person">
//           <td>
//             <a href="#/people/pieter-haverbeke-1602">Pieter Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1602</td>
//           <td>1642</td>
//           <td>-</td>
//           <td>
//             <a href="#/people/lieven-van-haverbeke-1570">
//               Lieven van Haverbeke
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/anna-van-hecke-1607"
//             >
//               Anna van Hecke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1607</td>
//           <td>1670</td>
//           <td>Martijntken Beelaert</td>
//           <td>Paschasius van Hecke</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/lieven-haverbeke-1631">Lieven Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1631</td>
//           <td>1676</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/anna-van-hecke-1607"
//             >
//               Anna van Hecke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/pieter-haverbeke-1602">Pieter Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/elisabeth-hercke-1632"
//             >
//               Elisabeth Hercke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1632</td>
//           <td>1674</td>
//           <td>Margriet de Brabander</td>
//           <td>Willem Hercke</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/daniel-haverbeke-1652">Daniel Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1652</td>
//           <td>1723</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/elisabeth-hercke-1632"
//             >
//               Elisabeth Hercke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/lieven-haverbeke-1631">Lieven Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/joanna-de-pape-1654"
//             >
//               Joanna de Pape
//             </a>
//           </td>
//           <td>f</td>
//           <td>1654</td>
//           <td>1723</td>
//           <td>Petronella Wauters</td>
//           <td>Vincent de Pape</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/martina-de-pape-1666"
//             >
//               Martina de Pape
//             </a>
//           </td>
//           <td>f</td>
//           <td>1666</td>
//           <td>1727</td>
//           <td>Petronella Wauters</td>
//           <td>Vincent de Pape</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/willem-haverbeke-1668">Willem Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1668</td>
//           <td>1731</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/elisabeth-hercke-1632"
//             >
//               Elisabeth Hercke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/lieven-haverbeke-1631">Lieven Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/jan-haverbeke-1671">Jan Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1671</td>
//           <td>1731</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/elisabeth-hercke-1632"
//             >
//               Elisabeth Hercke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/lieven-haverbeke-1631">Lieven Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person" className="has-background-warning">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-de-rycke-1683"
//             >
//               Maria de Rycke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1683</td>
//           <td>1724</td>
//           <td>Laurentia van Vlaenderen</td>
//           <td>Frederik de Rycke</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/livina-haverbeke-1692"
//             >
//               Livina Haverbeke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1692</td>
//           <td>1743</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/joanna-de-pape-1654"
//             >
//               Joanna de Pape
//             </a>
//           </td>
//           <td>
//             <a href="#/people/daniel-haverbeke-1652">Daniel Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/pieter-bernard-haverbeke-1695">
//               Pieter Bernard Haverbeke
//             </a>
//           </td>
//           <td>m</td>
//           <td>1695</td>
//           <td>1762</td>
//           <td>Petronella Wauters</td>
//           <td>
//             <a href="#/people/willem-haverbeke-1668">Willem Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/lieven-de-causmaecker-1696">
//               Lieven de Causmaecker
//             </a>
//           </td>
//           <td>m</td>
//           <td>1696</td>
//           <td>1724</td>
//           <td>Joanna Claes</td>
//           <td>Carel de Causmaecker</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/jacoba-lammens-1699"
//             >
//               Jacoba Lammens
//             </a>
//           </td>
//           <td>f</td>
//           <td>1699</td>
//           <td>1740</td>
//           <td>Livina de Vrieze</td>
//           <td>Lieven Lammens</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/pieter-de-decker-1705">Pieter de Decker</a>
//           </td>
//           <td>m</td>
//           <td>1705</td>
//           <td>1780</td>
//           <td>Petronella van de Steene</td>
//           <td>Joos de Decker</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/laurentia-haverbeke-1710"
//             >
//               Laurentia Haverbeke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1710</td>
//           <td>1786</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-de-rycke-1683"
//             >
//               Maria de Rycke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/jan-haverbeke-1671">Jan Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/elisabeth-haverbeke-1711"
//             >
//               Elisabeth Haverbeke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1711</td>
//           <td>1754</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-de-rycke-1683"
//             >
//               Maria de Rycke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/jan-haverbeke-1671">Jan Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/jan-van-brussel-1714">Jan van Brussel</a>
//           </td>
//           <td>m</td>
//           <td>1714</td>
//           <td>1748</td>
//           <td>Joanna van Rooten</td>
//           <td>Jacobus van Brussel</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/bernardus-de-causmaecker-1721">
//               Bernardus de Causmaecker
//             </a>
//           </td>
//           <td>m</td>
//           <td>1721</td>
//           <td>1789</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/livina-haverbeke-1692"
//             >
//               Livina Haverbeke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/lieven-de-causmaecker-1696">
//               Lieven de Causmaecker
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/jan-francies-haverbeke-1725">
//               Jan Francies Haverbeke
//             </a>
//           </td>
//           <td>m</td>
//           <td>1725</td>
//           <td>1779</td>
//           <td>Livina de Vrieze</td>
//           <td>
//             <a href="#/people/pieter-bernard-haverbeke-1695">
//               Pieter Bernard Haverbeke
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/angela-haverbeke-1728"
//             >
//               Angela Haverbeke
//             </a>
//           </td>
//           <td>f</td>
//           <td>1728</td>
//           <td>1734</td>
//           <td>Livina de Vrieze</td>
//           <td>
//             <a href="#/people/pieter-bernard-haverbeke-1695">
//               Pieter Bernard Haverbeke
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/petronella-de-decker-1731"
//             >
//               Petronella de Decker
//             </a>
//           </td>
//           <td>f</td>
//           <td>1731</td>
//           <td>1781</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/livina-haverbeke-1692"
//             >
//               Livina Haverbeke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/pieter-de-decker-1705">Pieter de Decker</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/jacobus-bernardus-van-brussel-1736">
//               Jacobus Bernardus van Brussel
//             </a>
//           </td>
//           <td>m</td>
//           <td>1736</td>
//           <td>1809</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/elisabeth-haverbeke-1711"
//             >
//               Elisabeth Haverbeke
//             </a>
//           </td>
//           <td>
//             <a href="#/people/jan-van-brussel-1714">Jan van Brussel</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/pieter-antone-haverbeke-1753">
//               Pieter Antone Haverbeke
//             </a>
//           </td>
//           <td>m</td>
//           <td>1753</td>
//           <td>1798</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/petronella-de-decker-1731"
//             >
//               Petronella de Decker
//             </a>
//           </td>
//           <td>
//             <a href="#/people/jan-francies-haverbeke-1725">
//               Jan Francies Haverbeke
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/jan-frans-van-brussel-1761">
//               Jan Frans van Brussel
//             </a>
//           </td>
//           <td>m</td>
//           <td>1761</td>
//           <td>1833</td>
//           <td>-</td>
//           <td>
//             <a href="#/people/jacobus-bernardus-van-brussel-1736">
//               Jacobus Bernardus van Brussel
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/livina-sierens-1761"
//             >
//               Livina Sierens
//             </a>
//           </td>
//           <td>f</td>
//           <td>1761</td>
//           <td>1826</td>
//           <td>Maria van Waes</td>
//           <td>Jan Sierens</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/joanna-de-causmaecker-1762"
//             >
//               Joanna de Causmaecker
//             </a>
//           </td>
//           <td>f</td>
//           <td>1762</td>
//           <td>1807</td>
//           <td>-</td>
//           <td>
//             <a href="#/people/bernardus-de-causmaecker-1721">
//               Bernardus de Causmaecker
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/carel-haverbeke-1796">Carel Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1796</td>
//           <td>1837</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/livina-sierens-1761"
//             >
//               Livina Sierens
//             </a>
//           </td>
//           <td>
//             <a href="#/people/pieter-antone-haverbeke-1753">
//               Pieter Antone Haverbeke
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-van-brussel-1801"
//             >
//               Maria van Brussel
//             </a>
//           </td>
//           <td>f</td>
//           <td>1801</td>
//           <td>1834</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/joanna-de-causmaecker-1762"
//             >
//               Joanna de Causmaecker
//             </a>
//           </td>
//           <td>
//             <a href="#/people/jan-frans-van-brussel-1761">
//               Jan Frans van Brussel
//             </a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/carolus-haverbeke-1832">Carolus Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1832</td>
//           <td>1905</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-van-brussel-1801"
//             >
//               Maria van Brussel
//             </a>
//           </td>
//           <td>
//             <a href="#/people/carel-haverbeke-1796">Carel Haverbeke</a>
//           </td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-sturm-1835"
//             >
//               Maria Sturm
//             </a>
//           </td>
//           <td>f</td>
//           <td>1835</td>
//           <td>1917</td>
//           <td>Seraphina Spelier</td>
//           <td>Charles Sturm</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/emma-de-milliano-1876"
//             >
//               Emma de Milliano
//             </a>
//           </td>
//           <td>f</td>
//           <td>1876</td>
//           <td>1956</td>
//           <td>Sophia van Damme</td>
//           <td>Petrus de Milliano</td>
//         </tr>

//         <tr data-cy="person">
//           <td>
//             <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
//           </td>
//           <td>m</td>
//           <td>1877</td>
//           <td>1968</td>
//           <td>
//             <a
//               className="has-text-danger"
//               href="#/people/maria-sturm-1835"
//             >
//               Maria Sturm
//             </a>
//           </td>
//           <td>
//             <a href="#/people/carolus-haverbeke-1832">Carolus Haverbeke</a>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };
