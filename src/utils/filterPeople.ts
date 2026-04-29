import Person from '../types/Person';

export const getYearBoundsForCentury = (
  century: number,
): { yearLowerBound: number; yearUpperBound: number } => {
  const yearLowerBound = century * 100 - 100;
  const yearUpperBound = yearLowerBound + 99;

  return { yearLowerBound, yearUpperBound };
};

export const filterPeople = ({
  people,
  sexParam,
  nameParam,
  centuryParam,
}: {
  people: Person[];
  sexParam: string | null;
  nameParam: string | null;
  centuryParam: string[];
}): Person[] => {
  let peopleData = [...people];

  if (sexParam) {
    peopleData = peopleData.filter(person => {
      return person.sex === sexParam;
    });
  }

  if (nameParam) {
    const query = nameParam.toLowerCase().trim();

    peopleData = peopleData.filter(person => {
      return person.name.toLowerCase().includes(query);
    });
  }

  if (centuryParam && centuryParam.length > 0) {
    if (centuryParam.length === 1) {
      const { yearLowerBound, yearUpperBound } = getYearBoundsForCentury(
        +centuryParam[0],
      );

      peopleData = peopleData.filter(person => {
        return person.born >= yearLowerBound && person.born <= yearUpperBound;
      });
    } else {
      let cumulativePeopleData: Person[] = [];

      centuryParam.forEach(century => {
        const { yearLowerBound, yearUpperBound } =
          getYearBoundsForCentury(+century);

        const filteredPeople = peopleData.filter(person => {
          return person.born >= yearLowerBound && person.born <= yearUpperBound;
        });

        cumulativePeopleData = [...cumulativePeopleData, ...filteredPeople];
      });

      peopleData = cumulativePeopleData;
    }
  }

  return peopleData;
};

export default filterPeople;
