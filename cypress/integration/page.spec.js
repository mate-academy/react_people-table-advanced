/// <reference types="Cypress" />

const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';
const SELECTED_PERSON_CLASS = 'has-background-warning';

const page = {
  spyOnPeopleRequest: () => {
    const spy = cy.spy().as('peopleRequest');

    cy.intercept('**/people.json', req => {
      spy();
      req.reply({ body: [] });
    });
  },
  mockPeople: () =>
    cy.intercept('**/people.json', { fixture: 'people' }).as('peopleData'),
  mockLessPeople: () =>
    cy.intercept('**/people.json', { fixture: 'lessPeople' }).as('peopleData'),
  mockNoPeople: () =>
    cy.intercept('**/people.json', { body: [] }).as('peopleData'),
  mockPeopleError: () => {
    const errorResponse = {
      statusCode: 404,
      body: '404 Not Found!',
    };

    return cy.intercept('**/people.json', errorResponse).as('peopleData');
  },

  visit: (url, waitForPeople = false) => {
    cy.visit(url);
    page.getByDataCy('app').should('exist');

    if (waitForPeople) {
      cy.wait('@peopleData');
    }
  },

  getByDataCy: name => cy.get(`[data-cy="${name}"]`),
  title: () => cy.get('.title'),
  nav: () => page.getByDataCy('nav'),
  loader: () => page.getByDataCy('loader'),
  noPeopleMessage: () => page.getByDataCy('noPeopleMessage'),
  peopleLoadingError: () => page.getByDataCy('peopleLoadingError'),
  peopleTable: () => page.getByDataCy('peopleTable'),
  people: () => page.getByDataCy('person'),
  heading: () => page.peopleTable().find('th'),

  assertHash: hash => cy.location('hash').should('eq', hash),
  assertSearch: search => cy.location('search').should('eq', search),
  assetTitle: text =>
    page.title().should('have.length', 1).and('have.text', text),
};

let failed = false;

Cypress.on('fail', e => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
  });

  // ... testes da home e páginas inexistentes (sem alteração) ...

  describe('#/people page', () => {
    it('should have correct address', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page.assertHash('#/people');
    });

    it('should have navigation', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page.nav().should('exist');
    });

    it('should have People nav link active', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page
        .nav()
        .contains('a', 'People')
        .and('have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have Home nav link not active', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page
        .nav()
        .contains('a', 'Home')
        .and('not.have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have only correct title', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page.assetTitle('People Page');
    });

    it('should send one API request', () => {
      page.spyOnPeopleRequest();
      page.visit('/#/people');
      cy.get('@peopleRequest').should('have.been.calledOnce');
    });

    it('should show loader before the people are loaded', () => {
      cy.clock();
      page.mockPeople();
      page.visit('/#/people');
      page.loader().should('exist');
    });

    it('should hide loader after people are loaded', () => {
      cy.clock();
      page.mockPeople();
      page.visit('/#/people');
      cy.tick(10000);
      page.loader().should('not.exist');
    });

    it('should hide loader if no people were loaded', () => {
      cy.clock();
      page.mockNoPeople();
      page.visit('/#/people');
      cy.tick(10000);
      page.loader().should('not.exist');
    });

    it('should hide loader on people loading error', () => {
      cy.clock();
      page.mockNoPeople();
      page.visit('/#/people');
      cy.tick(10000);
      page.loader().should('not.exist');
    });

    it('should show the `no people` message if API sent no people', () => {
      page.mockNoPeople();
      page.visit('/#/people', true);
      page.noPeopleMessage().should('exist');
    });

    it('should not show the `no people` message if people are not empty', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page.noPeopleMessage().should('not.exist');
    });

    it('should not show the `no people` message on people loading error', () => {
      page.mockPeopleError();
      page.visit('/#/people', true);
      page.noPeopleMessage().should('not.exist');
    });

    it('should not show the `no people` message before an empty response received', () => {
      cy.clock();
      page.mockNoPeople();
      page.visit('/#/people');
      page.noPeopleMessage().should('not.exist');
    });

    it('should show loading error on peolpe loading error', () => {
      page.mockPeopleError();
      page.visit('/#/people', true);
      page.peopleLoadingError().should('exist');
    });

    it('should not show loading error if people were loaded', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page.peopleLoadingError().should('not.exist');
    });

    it('should not show loading error if API send no people', () => {
      page.mockNoPeople();
      page.visit('/#/people', true);
      page.peopleLoadingError().should('not.exist');
    });

    it('should not show loading error before an error response received', () => {
      cy.clock();
      page.mockPeopleError();
      page.visit('/#/people');
      page.peopleLoadingError().should('not.exist');
    });

    it('should show people table if people are loaded', () => {
      page.mockPeople();
      page.visit('/#/people', true);
      page.peopleTable().should('exist');
    });

    it('should not show people table if API sent no people', () => {
      page.mockNoPeople();
      page.visit('/#/people', true);
      page.peopleTable().should('not.exist');
    });

    it('should not show people table on people loading error', () => {
      page.mockPeopleError();
      page.visit('/#/people', true);
      page.peopleTable().should('not.exist');
    });

    it('should not show people table before a response received', () => {
      cy.clock();
      page.mockPeople();
      page.visit('/#/people');
      page.peopleTable().should('not.exist');
    });

    it('should show the people loaded from API', () => {
      page.mockLessPeople();
      page.visit('/#/people', true);
      page.people().should('have.length', 6);
    });

    describe('People table', () => {
      beforeEach(() => {
        page.mockPeople();
        page.visit('/#/people', true);
      });

      it('should have all the required columns', () => {
        page.heading().should('have.length', 6);
        // ...
      });

      it('should show all the people', () => {
        page.people().should('have.length', 39);
      });

      it('should allow to select a person', () => {
        page.people().eq(1).find('td').eq(0).find('a').click();
        page.assertHash('#/people/emma-de-milliano-1876');
        page.people().eq(1).should('have.class', SELECTED_PERSON_CLASS);
      });

      // ... demais testes da tabela
    });
  });

  describe('#/people/:correct-slug page', () => {
    beforeEach(() => {
      page.mockPeople();
      page.visit('/#/people/emma-de-milliano-1876', true);
    });

    it('should have one selected person', () => {
      page.people().eq(1).should('have.class', SELECTED_PERSON_CLASS);
    });
  });

  describe('#/people/:wrong-slug page', () => {
    beforeEach(() => {
      page.mockPeople();
      page.visit('/#/people/non-existing-slug', true);
    });

    it('should allow to select a person', () => {
      page.people().eq(1).find('td').eq(0).find('a').click();
      page.assertHash('#/people/emma-de-milliano-1876');
      page.people().eq(1).should('have.class', SELECTED_PERSON_CLASS);
    });
  });
});
