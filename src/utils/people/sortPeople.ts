import { Person } from '../../types';
import { ColumnsName } from '../../types/ColumnsName';
import { chooseDirection } from '../chooseDirection';

interface Sort {
  sortSearchParam: string;
  orderSearchParam: string;
}

export const sortPeople = (humens: Person[], sort: Sort) => {
  let preparePeople = [...humens];

  switch (sort.sortSearchParam) {
    case ColumnsName.Name:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person1.name, person2.name, sort.orderSearchParam),
      );
      break;
    case ColumnsName.Sex:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person1.sex, person2.sex, sort.orderSearchParam),
      );
      break;
    case ColumnsName.Born:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person1.born, person2.born, sort.orderSearchParam),
      );
      break;
    case ColumnsName.Died:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person1.died, person2.died, sort.orderSearchParam),
      );
      break;
  }

  return preparePeople;
};
