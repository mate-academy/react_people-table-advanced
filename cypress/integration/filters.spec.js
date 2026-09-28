/// <reference types="Cypress" />

const initialNames = [
  'Carolus Haverbeke',
  'Emma de Milliano',
  'Maria de Rycke',
  'Jan van Brussel',
  'Philibert Haverbeke',
  'Jan Frans van Brussel',
];

const getPeople = () => cy.get('[data-cy="person"]');
const getFilters = () => cy.contains('.panel-heading', 'Filters');
const getNameFilter = () => cy.get('[data-cy="NameFilter"]');
const getCentury = century =>
  cy
    .get('[data-cy="CenturyFilter"]')
    .contains('[data-cy="century"]', new RegExp(`^${century}$`));

const mockPeople = () =>
  cy.intercept('**/people.json', { fixture: 'lessPeople' }).as('peopleData');

const visitPeople = (suffix = '') => {
  cy.visit(`/#/people${suffix}`);
  cy.get('[data-cy="app"]').should('exist');
};

const assertSearch = expected => {
  cy.location('hash').should(hash => {
    const search = new URLSearchParams(hash.split('?')[1] || '');
    const actual = {};

    search.forEach((value, key) => {
      actual[key] = [...(actual[key] || []), value].sort();
    });

    const normalizedExpected = Object.fromEntries(
      Object.entries(expected).map(([key, value]) => [
        key,
        (Array.isArray(value) ? [...value] : [value]).sort(),
      ]),
    );

    expect(actual).to.deep.equal(normalizedExpected);
  });
};

const assertNames = expected => {
  getPeople().should($rows => {
    const names = [...$rows].map(row => row.querySelector('td').textContent);

    expect(names).to.deep.equal(expected);
  });
};

const assertColumn = (index, expected) => {
  getPeople().should($rows => {
    const values = [...$rows].map(
      row => row.querySelectorAll('td')[index].textContent,
    );

    expect(values).to.deep.equal(expected);
  });
};

const clickSort = index =>
  cy.get('[data-cy="peopleTable"] th').eq(index).find('a').click();

describe('URL filters and sorting', () => {
  it('shows the sidebar only after nonempty people finish loading', () => {
    cy.clock();
    mockPeople();
    visitPeople();

    cy.get('[data-cy="loader"]').should('exist');
    getFilters().should('not.exist');

    cy.tick(500);
    cy.wait('@peopleData');
    cy.get('[data-cy="loader"]').should('not.exist');
    getFilters().should('be.visible');
  });

  it('hides the sidebar for an empty server response', () => {
    cy.intercept('**/people.json', { body: [] }).as('peopleData');
    visitPeople();
    cy.wait('@peopleData');

    cy.get('[data-cy="noPeopleMessage"]').should('be.visible');
    getFilters().should('not.exist');
  });

  it('hides the sidebar after a server error', () => {
    cy.intercept('**/people.json', {
      statusCode: 404,
      body: '404 Not Found!',
    }).as('peopleData');
    visitPeople();
    cy.wait('@peopleData');

    cy.get('[data-cy="peopleLoadingError"]').should('be.visible');
    getFilters().should('not.exist');
  });

  [
    { field: 'name', query: 'cArOlUs', names: ['Carolus Haverbeke'] },
    { field: 'motherName', query: 'sOpHiA', names: ['Emma de Milliano'] },
    { field: 'fatherName', query: 'eMiLe', names: ['Philibert Haverbeke'] },
  ].forEach(({ field, query, names }) => {
    it(`matches ${field} case insensitively and stores the typed query`, () => {
      mockPeople();
      visitPeople();
      getNameFilter().type(query);

      assertSearch({ query });
      assertNames(names);
    });
  });

  it('removes an empty query while preserving the other parameters', () => {
    mockPeople();
    visitPeople('?query=EMMA&centuries=19&centuries=20&sort=born&order=desc');

    getNameFilter().should('have.value', 'EMMA').clear();

    assertSearch({ centuries: ['19', '20'], sort: 'born', order: 'desc' });
    assertNames([
      'Philibert Haverbeke',
      'Emma de Milliano',
      'Carolus Haverbeke',
    ]);
  });

  it('keeps filters available when loaded people do not match the query', () => {
    mockPeople();
    visitPeople('?query=not-a-person');

    getNameFilter().should('have.value', 'not-a-person');
    getFilters().should('be.visible');
    getPeople().should('not.exist');
    cy.get('[data-cy="noPeopleMessage"]').should('not.exist');
    cy.contains(
      'There are no people matching the current search criteria',
    ).should('be.visible');
  });

  it('restores the query and filtered rows from a shared URL and browser history', () => {
    mockPeople();
    visitPeople('?query=EMMA&sort=born');

    getNameFilter().should('have.value', 'EMMA');
    assertNames(['Emma de Milliano', 'Philibert Haverbeke']);

    cy.get('[data-cy="SexFilter"]').contains('a', 'Female').click();
    assertSearch({ query: 'EMMA', sort: 'born', sex: 'f' });
    assertNames(['Emma de Milliano']);

    cy.go('back');
    assertSearch({ query: 'EMMA', sort: 'born' });
    getNameFilter().should('have.value', 'EMMA');
    assertNames(['Emma de Milliano', 'Philibert Haverbeke']);

    cy.reload();
    getNameFilter().should('have.value', 'EMMA');
    assertNames(['Emma de Milliano', 'Philibert Haverbeke']);
  });

  it('combines the sex filter with query, centuries, and sorting', () => {
    mockPeople();
    visitPeople('?query=emma&centuries=19&centuries=20&sort=died&order=desc');

    cy.get('[data-cy="SexFilter"]').contains('a', 'Female').click();
    assertSearch({
      query: 'emma',
      centuries: ['19', '20'],
      sort: 'died',
      order: 'desc',
      sex: 'f',
    });
    assertNames(['Emma de Milliano']);

    cy.get('[data-cy="SexFilter"]').contains('a', 'Male').click();
    assertNames(['Philibert Haverbeke']);
    cy.get('[data-cy="SexFilter"]')
      .contains('a', 'Male')
      .should('have.class', 'is-active');

    cy.get('[data-cy="SexFilter"]').contains('a', 'All').click();
    assertSearch({
      query: 'emma',
      centuries: ['19', '20'],
      sort: 'died',
      order: 'desc',
    });
    assertNames(['Philibert Haverbeke', 'Emma de Milliano']);
  });

  it('adds repeated century parameters, toggles one off, and clears only centuries with All', () => {
    mockPeople();
    visitPeople('?query=e&sort=born');

    getCentury('17').click();
    assertSearch({ query: 'e', sort: 'born', centuries: ['17'] });
    assertNames(['Maria de Rycke']);

    getCentury('20').click();
    assertSearch({ query: 'e', sort: 'born', centuries: ['17', '20'] });
    assertNames(['Maria de Rycke', 'Philibert Haverbeke']);
    getCentury('17').should('have.class', 'is-info');
    getCentury('20').should('have.class', 'is-info');

    getCentury('17').click();
    assertSearch({ query: 'e', sort: 'born', centuries: ['20'] });
    assertNames(['Philibert Haverbeke']);
    getCentury('17').should('not.have.class', 'is-info');

    cy.get('[data-cy="centuryALL"]').click();
    assertSearch({ query: 'e', sort: 'born' });
    assertNames([
      'Maria de Rycke',
      'Jan van Brussel',
      'Jan Frans van Brussel',
      'Carolus Haverbeke',
      'Emma de Milliano',
      'Philibert Haverbeke',
    ]);
  });

  const boundaryYears = [1600, 1601, 1700, 1701, 1800, 1801, 1900, 1901, 2000];
  const boundaryPeople = boundaryYears.map(born => ({
    name: `Born in ${born}`,
    sex: 'm',
    born,
    died: born + 50,
    fatherName: null,
    motherName: null,
    slug: `born-in-${born}`,
  }));

  [
    { century: '16', years: ['1600'] },
    { century: '17', years: ['1601', '1700'] },
    { century: '18', years: ['1701', '1800'] },
    { century: '19', years: ['1801', '1900'] },
    { century: '20', years: ['1901', '2000'] },
  ].forEach(({ century, years }) => {
    it(`uses the correct year boundaries for century ${century}`, () => {
      cy.intercept('**/people.json', { body: boundaryPeople });
      visitPeople(`?centuries=${century}`);

      getCentury(century).should('have.class', 'is-info');
      assertColumn(2, years);
    });
  });

  [
    {
      field: 'name',
      index: 0,
      ascending: [
        'Carolus Haverbeke',
        'Emma de Milliano',
        'Jan Frans van Brussel',
        'Jan van Brussel',
        'Maria de Rycke',
        'Philibert Haverbeke',
      ],
    },
    { field: 'sex', index: 1, ascending: ['f', 'f', 'm', 'm', 'm', 'm'] },
    {
      field: 'born',
      index: 2,
      ascending: ['1683', '1714', '1761', '1832', '1876', '1907'],
    },
    {
      field: 'died',
      index: 3,
      ascending: ['1724', '1748', '1833', '1905', '1956', '1997'],
    },
  ].forEach(({ field, index, ascending }) => {
    it(`cycles ${field} sorting through ascending, descending, and original order`, () => {
      mockPeople();
      visitPeople();

      clickSort(index);
      assertSearch({ sort: field });
      assertColumn(index, ascending);

      clickSort(index);
      assertSearch({ sort: field, order: 'desc' });
      assertColumn(index, [...ascending].reverse());

      clickSort(index);
      assertSearch({});
      assertNames(initialNames);
    });
  });

  it('starts a different sort column ascending while preserving filters', () => {
    mockPeople();
    visitPeople('?query=brussel&sex=m&sort=born&order=desc');

    clickSort(0);
    assertSearch({ query: 'brussel', sex: 'm', sort: 'name' });
    assertNames([
      'Carolus Haverbeke',
      'Jan Frans van Brussel',
      'Jan van Brussel',
    ]);
  });

  it('preserves all parameters in person, loaded-parent, and People navigation links', () => {
    cy.intercept('**/people.json', { fixture: 'people' }).as('peopleData');
    const search = 'query=philibert&sex=m&centuries=20&sort=born&order=desc';
    const expectedParams = {
      query: 'philibert',
      sex: 'm',
      centuries: ['20'],
      sort: 'born',
      order: 'desc',
    };

    visitPeople(`?${search}`);
    assertNames(['Philibert Haverbeke']);

    getPeople().find('td').eq(0).find('a').click();
    cy.location('hash').should('include', '#/people/philibert-haverbeke-1907?');
    assertSearch(expectedParams);
    getPeople().should('have.class', 'has-background-warning');

    getPeople().find('td').eq(4).contains('a', 'Emma de Milliano').click();
    cy.location('hash').should('include', '#/people/emma-de-milliano-1876?');
    assertSearch(expectedParams);

    getPeople().find('td').eq(5).contains('a', 'Emile Haverbeke').click();
    cy.location('hash').should('include', '#/people/emile-haverbeke-1877?');
    assertSearch(expectedParams);

    cy.get('[data-cy="nav"]').contains('a', 'People').click();
    cy.location('hash').should('include', '#/people?');
    assertSearch(expectedParams);

    cy.reload();
    getNameFilter().should('have.value', 'philibert');
    getCentury('20').should('have.class', 'is-info');
    cy.get('[data-cy="SexFilter"]')
      .contains('a', 'Male')
      .should('have.class', 'is-active');
    assertSearch(expectedParams);
    assertNames(['Philibert Haverbeke']);
  });

  it('resets all filters while preserving the current sorting', () => {
    mockPeople();
    visitPeople(
      '?query=emma&sex=f&centuries=19&centuries=20&sort=born&order=desc',
    );

    cy.contains('a', 'Reset all filters').click();

    assertSearch({ sort: 'born', order: 'desc' });
    getNameFilter().should('have.value', '');
    cy.get('[data-cy="SexFilter"]')
      .contains('a', 'All')
      .should('have.class', 'is-active');
    assertNames([
      'Philibert Haverbeke',
      'Emma de Milliano',
      'Carolus Haverbeke',
      'Jan Frans van Brussel',
      'Jan van Brussel',
      'Maria de Rycke',
    ]);
  });
});
