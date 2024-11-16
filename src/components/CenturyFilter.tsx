import { useState } from 'react';

export const CenturyFilter = () => {
  const [selectCenturies, setSelectCenturies] = useState(new Set());

  const append = (century: number) => {
    setSelectCenturies(prevSelected => {
      const updatedSelected = new Set(prevSelected);

      if (updatedSelected.has(century)) {
        updatedSelected.delete(century);
      } else {
        updatedSelected.add(century);
      }

      return updatedSelected;
    });
  };

  const deleteAll = () => {
    setSelectCenturies(new Set([]));
  };

  const getAll = () => {
    return Array.from(selectCenturies);
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {[16, 17, 18, 19, 20].map(century => (
            <>
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  selectCenturies.has(century) ? 'is-info' : ''
                }`}
                href={`#/people?centuries=${getAll().join(',')}`}
                onClick={() => {
                  append(century);
                }}
              >
                {century}
              </a>
            </>
          ))}
        </div>

        <div className="level-right ml-4">
          <a
            data-cy="centuryALL"
            className="button is-success is-outlined"
            href="#/people"
            onClick={() => {
              deleteAll();
            }}
          >
            All
          </a>
        </div>
      </div>
    </div>
  );
};
