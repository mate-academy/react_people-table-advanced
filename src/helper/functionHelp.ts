const normalizeSlug = (slug: string | undefined) =>
  slug?.replaceAll(' ', '-').toLowerCase();

export { normalizeSlug };
