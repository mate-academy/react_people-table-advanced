export function getNameMatches(name: string, query: string) {
  return name.toLocaleLowerCase().includes(query);
}
