// src/utils/hash.ts
export function readSearchParamsFromHash(): URLSearchParams {
  if (typeof window === 'undefined') {
    return new URLSearchParams();
  }

  const hash = window.location.hash || '';
  const idx = hash.indexOf('?');
  const qs = idx >= 0 ? hash.slice(idx + 1) : '';

  return new URLSearchParams(qs);
}

/**
 * Constrói hash preservando slug atual se existir.
 * Se a hash atual for algo como "#/people/<slug>?..." então o slug será mantido.
 * Caso contrário retorna "#/people" ou "#/people?..." dependendo de params.
 * Antes de serializar, remove parâmetros residuais que não devem ser persistidos, como sortCycle.
 */
export function buildPeopleHashFromParams(params: URLSearchParams): string {
  // garantir remoção de parâmetros não desejados
  params.delete('sortCycle');

  if (typeof window === 'undefined') {
    const qs = params.toString();

    return qs ? `#/people?${qs}` : '#/people';
  }

  const currentHash = window.location.hash || '';
  const base = currentHash.split('?')[0] || '';
  const parts = base
    .split('/')
    .map(p => p.trim())
    .filter(Boolean);

  // procurar slug após 'people' se existir
  const peopleIndex = parts.findIndex(p => p === 'people');
  const slug =
    peopleIndex !== -1 && parts.length > peopleIndex + 1
      ? parts[peopleIndex + 1]
      : null;

  const qs = params.toString();

  if (slug) {
    return qs ? `#/people/${slug}?${qs}` : `#/people/${slug}`;
  }

  return qs ? `#/people?${qs}` : '#/people';
}
