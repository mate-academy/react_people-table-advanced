import React, { useEffect, useState } from "react";
import { Person as PersonType } from "../types";
import { Person } from "./Person";
import { useParams } from 'react-router-dom';

type Props = {
  peopleData: PersonType[] | null;
  sex: string;
  nameSearch: string;
  centuries: string[];
};

export const PeopleTable: React.FC<Props> = ({ peopleData, sex, nameSearch, centuries }) => {
  const { personName } = useParams();
  const [local, setLocal] = useState(peopleData);

  useEffect(() => {
    const filteredData = peopleData?.filter(el => {

      // Fix for correct century calculation
      const numberCentury = el.born ? (Math.floor(el.born / 100)) + 1 : '';
      const matchesSex = sex ? el.sex === sex : true;
      const matchesName = nameSearch ? el.name.toLowerCase().includes(nameSearch.toLowerCase()) : true;
      const matchCentury = centuries.length > 0 ? centuries.includes(numberCentury.toString()) : true;

      return matchesSex && matchesName && matchCentury;
    }) || [];

    setLocal(filteredData);
  }, [sex, nameSearch, peopleData, centuries]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {local?.length === 0 ? (
        <caption>There are no people matching the current search criteria</caption>
      ) : (
        <>
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {local?.map(el => {
              const motherData = local.findIndex(m => m.name === el.motherName);
              const fatherData = local.findIndex(f => f.name === el.fatherName);

              const newData = {
                ...el,
                mother: local[motherData],
                father: local[fatherData],
              };

              return <Person key={el.name} data={newData} param={personName} />;
            })}
          </tbody>
        </>
      )}
    </table>
  );
};
