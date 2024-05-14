enum ClassFor {
  one = 'fa-sort',
  two = 'fa-sort-up',
  three = 'fa-sort-down',
}

export function sortClass(position: number): string {
  switch (position) {
    case 1: {
      return ClassFor.one;
    }

    case 2: {
      return ClassFor.two;
    }

    case 3: {
      return ClassFor.three;
    }

    default:
      return '';
  }
}
