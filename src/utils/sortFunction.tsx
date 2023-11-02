/* eslint-disable */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';

function getSortElementComparison(firstWord: string, secondWord: string) {
  return firstWord.localeCompare(secondWord);
}

export function sortByTrigger() {
  const [people, _setPeople] = useState<Person[]>([]);

  const [copy, _setCopy] = useState(people);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const list = [...people];

  if (order) {
    return list.reverse();
  }

  if (sort === 'name') {
    return list.sort(
      (first, second) => getSortElementComparison(first.name, second.name),
    );
  }

  if (sort === 'sex') {
    return list.sort(
      (first, second) => getSortElementComparison(first.sex, second.sex),
    );
  }

  if (sort === 'born') {
    return list.sort(
      (first, second) => (first.born > second.born ? 1 : -1),
    );
  }

  if (sort === 'died') {
    return list.sort(
      (first, second) => (first.died > second.died ? 1 : -1),
    );
  }

  if (sex === 'm') {
    return list.sort(
      (first, second) => getSortElementComparison(second.sex, first.sex),
    );
  }

  if (query?.length) {
    return list.filter(person => (
      person.name.toLowerCase().includes(query)
    ));
  }

  if (sex === 'f') {
    return list.sort(
      (first, second) => getSortElementComparison(first.sex, second.sex),
    );
  }

  if (centuries.length) {
    return list.filter(person => +(String(person.born).slice(0, -2)) === +centuries[0]);
  }

  return copy;
}
