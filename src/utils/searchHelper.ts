export interface SearchParams {
  [key: string]: string | string[] | null;
}

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    // Remover parâmetros existentes para esta chave
    newParams.delete(key);

    // Adicionar novos valores se não forem nulos/vazios
    if (value === null || value === '') {
      // Já removido acima, não precisa fazer nada
    } else if (Array.isArray(value)) {
      // Para arrays (como centuries), adicionar cada valor
      value.forEach(v => newParams.append(key, v));
    } else {
      // Para valores únicos, definir o parâmetro
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}

// Função auxiliar para validar campos de ordenação
export function isValidSortField(field: string | null): boolean {
  const allowedFields = ['name', 'sex', 'born', 'died'];

  return field !== null && allowedFields.includes(field);
}
