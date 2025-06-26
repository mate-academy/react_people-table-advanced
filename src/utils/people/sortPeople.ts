import { Person } from '../../types';
import { ColumnsName } from '../../types/ColumnsName';
import { chooseDirection } from '../chooseDirection';

interface Sort {
  sortSearchParam: string;
  orderSearchParam: string;
}

export const sortPeploe = (humens: Person[], sort: Sort) => {
  let preparePeople = [...humens];

  switch (sort.sortSearchParam) {
    case ColumnsName.Name:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person2.name, person1.name, sort.orderSearchParam),
      );
      break;
    case ColumnsName.Sex:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person2.sex, person1.sex, sort.orderSearchParam),
      );
      break;
    case ColumnsName.Born:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person2.born, person1.born, sort.orderSearchParam),
      );
      break;
    case ColumnsName.Died:
      preparePeople = preparePeople.sort((person1, person2) =>
        chooseDirection(person2.died, person1.died, sort.orderSearchParam),
      );
      break;
  }

  return preparePeople;
};
