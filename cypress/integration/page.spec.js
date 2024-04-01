/// <reference types="Cypress" />

const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';
const SELECTED_PERSON_CLASS = 'has-background-warning';

const page = {
  spyOnPeopleRequest: () => {
    const spy = cy.spy().as('peopleRequest');

    cy.intercept('**/people.json', (req) => {
      spy();
      req.reply({ body: [] });
    })
  },
  mockPeople: () => cy.intercept('**/people.json', { fixture: 'people' }).as('peopleData'),
  mockLessPeople: () => cy.intercept('**/people.json', { fixture: 'lessPeople' }).as('peopleData'),
  mockNoPeople: () => cy.intercept('**/people.json', { body: [] }).as('peopleData'),
  mockPeopleError: () => {
    const errorResponse = {
      statusCode: 404,
      body: '404 Not Found!',
    };

    return cy.intercept('**/people.json', errorResponse).as('peopleData')
  },

  visit: (url) => {
    cy.visit(url);
    page.getByDataCy('app').should('exist');
  },
  getByDataCy: name => cy.get(`[data-cy="${name}"]`),
  title: () => cy.get('.title'),
  nav: () => cy.getByDataCy('nav'),
  loader: () => cy.getByDataCy('loader'),
  noPeopleMessage: () => cy.getByDataCy('noPeopleMessage'),
  peopleLoadingError: () => cy.getByDataCy('peopleLoadingError'),
  peopleTable: () => cy.getByDataCy('peopleTable'),
  people: () => cy.getByDataCy('person'),
  heading: () => page.peopleTable().find('th'),

  assertHash: hash => cy.location('hash').should('eq', hash),
  assertSearch: search => cy.location('search').should('eq', search),
  assetTitle: text => page.title()
    .should('have.length', 1)
    .and('have.text', text),
}

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
  });

  describe('/ page', () => {
    it('should have correct address', () => {
      page.mockPeople();
      page.visit('/');
      page.assertHash('');
    });

    it('should have navigation', () => {
      page.mockPeople();
      page.visit('/');
      page.nav().should('exist');
    });

    it('should mark Home nav link as active', () => {
      page.mockPeople();
      page.visit('/');
      page.nav()
        .contains('a', 'Home')
        .should('have.attr', 'href', '#/')
        .and('have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should not mark People nav link as active', () => {
      page.mockPeople();
      page.visit('/');
      page.nav()
        .contains('a', 'People')
        .should('have.attr', 'href', '#/people')
        .and('not.have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have only correct title', () => {
      page.mockPeople();
      page.visit('/');
      page.assetTitle('Home Page');
    });


    it('should not send API request', () => {
      page.spyOnPeopleRequest();
      page.visit('/');
      cy.get('@peopleRequest').should('not.be.called');
    });

    it('should not have loader', () => {
      cy.clock();
      page.mockPeople();
      page.visit('/');
      page.loader().should('not.exist');
    });

    it('should not have the `no people` message', () => {
      page.mockNoPeople();
      page.visit('/');
      page.noPeopleMessage().should('not.exist');
    });

    it('should not have loading error', () => {
      page.mockPeopleError();
      page.visit('/');
      page.peopleLoadingError().should('not.exist');
    });

    it('should not have people table', () => {
      page.mockPeople();
      page.visit('/');
      page.peopleTable().should('not.exist');
    });
  });

  describe('App', () => {
    it('should redirect from /home to /', () => {
      page.visit('/#/home');
      page.assertHash('#/');
      page.assetTitle('Home Page');
    });
  });

  describe('Non existing page', () => {
    it('should have correct address', () => {
      page.mockPeople();
      page.visit('/#/some/not/existing/page');
      page.assertHash('#/some/not/existing/page');
    });

    it('should have navigation', () => {
      page.mockPeople();
      page.visit('/#/some/not/existing/page');
      page.nav().should('exist');
    });

    it('should not have active nav links', () => {
      page.mockPeople();
      page.visit('/#/some/not/existing/page');

      page.nav().contains('a', 'Home').should('not.have.class', ACTIVE_NAV_LINK_CLASS);
      page.nav().contains('a', 'People').should('not.have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have only correct title', () => {
      page.mockPeople();
      page.visit('/#/some/not/existing/page');
      page.assetTitle('Page not found');
    });

    it('should not send API request', () => {
      page.spyOnPeopleRequest();
      page.visit('/#/some/not/existing/page');
      cy.get('@peopleRequest').should('not.be.called');
    });

    it('should not have loader', () => {
      cy.clock();
      page.mockPeople();
      page.visit('/#/some/not/existing/page');
      page.loader().should('not.exist');
    });

    it('should not have the `no people` message', () => {
      page.mockNoPeople();
      page.visit('/#/some/not/existing/page');
      page.noPeopleMessage().should('not.exist');
    });

    it('should not have loading error', () => {
      page.mockPeopleError();
      page.visit('/#/some/not/existing/page');
      page.peopleLoadingError().should('not.exist');
    });

    it('should not have people table', () => {
      page.mockPeople();
      page.visit('/#/some/not/existing/page');
      page.peopleTable().should('not.exist');
    });
  });

  describe('#/people page', () => {
    it('should have correct address', () => {
      page.mockPeople();
      page.visit('/#/people');
      page.assertHash('#/people');
    });

    it('should have navigation', () => {
      page.mockPeople();
      page.visit('/#/people');
      page.nav().should('exist');
    });

    it('should have People nav link active', () => {
      page.mockPeople();
      page.visit('/#/people');
      page.nav()
        .contains('a', 'People')
        .and('have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have Home nav link not active', () => {
      page.mockPeople();
      page.visit('/#/people');
      page.nav()
        .contains('a', 'Home')
        .and('not.have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have only correct title', () => {
      page.mockPeople();
      page.visit('/#/people');
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
      page.visit('/#/people');
      page.noPeopleMessage().should('exist');
    });

    it('should not show the `no people` message if people are not empty', () => {
      page.mockPeople();
      page.visit('/#/people');
      page.noPeopleMessage().should('not.exist');
    });

    it('should not show the `no people` message on people loading error', () => {
      page.mockPeopleError();
      page.visit('/#/people');
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
      page.visit('/#/people');
      page.peopleLoadingError().should('exist');
    });

    it('should not show loading error if people were loaded', () => {
      page.mockPeople();
      page.visit('/#/people');
      page.peopleLoadingError().should('not.exist');
    });

    it('should not show loading error if API send no people', () => {
      page.mockPeopleError();
      page.visit('/#/people');
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
      page.visit('/#/people');
      page.peopleTable().should('exist');
    });

    it('should not show people table if API sent no people', () => {
      page.mockNoPeople();
      page.visit('/#/people');
      page.peopleTable().should('not.exist');
    });

    it('should not show people table on people loading error', () => {
      page.mockPeopleError();
      page.visit('/#/people');
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
      page.visit('/#/people');
      page.people()
        .should('have.length', 6);
    });

    describe('People table', () => {
      beforeEach(() => {
        page.mockPeople();
        page.visit('/#/people');
      });

      it('should have all the required columns', () => {
        page.heading().should('have.length', 6);

        page.heading().eq(0).should('have.text', 'Name');
        page.heading().eq(1).should('have.text', 'Sex');
        page.heading().eq(2).should('have.text', 'Born');
        page.heading().eq(3).should('have.text', 'Died');
        page.heading().eq(4).should('have.text', 'Mother');
        page.heading().eq(5).should('have.text', 'Father');
      });

      it('should show all the people', () => {
        page.people()
          .should('have.length', 39);
      });

      it('should render all required person data', () => {
        page.people().eq(1).find('td').eq(0).should('have.text', 'Emma de Milliano');
        page.people().eq(1).find('td').eq(1).should('have.text', 'f');
        page.people().eq(1).find('td').eq(2).should('have.text', '1876');
        page.people().eq(1).find('td').eq(3).should('have.text', '1956');
        page.people().eq(1).find('td').eq(4).should('have.text', 'Sophia van Damme');
        page.people().eq(1).find('td').eq(5).should('have.text', 'Petrus de Milliano');
      });

      it('should have red names for women', () => {
        page.people().eq(1)
          .find('td').eq(0)
          .find('a')
          .should('have.class', 'has-text-danger');
      });

      it('should have blue names for men', () => {
        page.people().eq(3)
          .find('td').eq(0)
          .find('a')
          .should('not.have.class', 'has-text-danger');
      });

      it('should have correct links as person names', () => {
        page.people().eq(1)
          .find('td').eq(0)
          .find('a')
          .should('have.attr', 'href', '#/people/emma-de-milliano-1876')
          .and('have.text', 'Emma de Milliano');

        page.people().eq(3)
          .find('td').eq(0)
          .find('a')
          .should('have.attr', 'href', '#/people/jan-van-brussel-1714')
          .and('have.text', 'Jan van Brussel');
      });

      it('should not have a selected person', () => {
        page.mockPeople();
        page.visit('/#/people');

        cy.get('[data-cy="person"].' + SELECTED_PERSON_CLASS)
          .should('not.exist');
      });

      it('should allow to select a person', () => {
        page.people().eq(1)
          .find('td').eq(0)
          .find('a')
          .click();

        page.assertHash('#/people/emma-de-milliano-1876')

        page.people().eq(1)
          .should('have.class', SELECTED_PERSON_CLASS);
      });

      it('should have a red link to a mother', () => {
        page.people().eq(0)
          .find('td').eq(4)
          .contains('a', 'Maria van Brussel')
          .should('have.attr', 'href', '#/people/maria-van-brussel-1801')
          .and('have.class', 'has-text-danger')
      });

      it('should have a link to a father', () => {
        page.people().eq(4)
          .find('td').eq(5)
          .contains('a', 'Emile Haverbeke')
          .should('have.attr', 'href', '#/people/emile-haverbeke-1877')
          .and('not.have.class', 'has-text-danger')
      });

      it('should have a text name if the mother is not in the table', () => {
        page.people().eq(1)
          .find('td').eq(4)
          .find('a')
          .should('not.exist')
      });

      it('should have a text name if the father is not in the table', () => {
        page.people().eq(1)
          .find('td').eq(5)
          .find('a')
          .should('not.exist')
      });

      it('should have an empty cell if the motherName is not given', () => {
        page.people().eq(20)
          .find('td').eq(4)
          .should('have.text', '-')
      });

      it('should have an empty cell if the fatherName is not given', () => {
        page.people().eq(20)
          .find('td').eq(5)
          .should('have.text', '-')
      });
    });
  });

  describe('#/people/:correct-slug page', () => {
    beforeEach(() => {
      page.mockPeople();
      page.visit('/#/people/emma-de-milliano-1876');
    });

    it('should have correct address', () => {
      page.assertHash('#/people/emma-de-milliano-1876');
    });

    it('should have People nav link active', () => {
      page.nav()
        .contains('a', 'People')
        .and('have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have only correct title', () => {
      page.assetTitle('People Page');
    });

    it('should have people table', () => {
      page.peopleTable().should('exist');
    });

    it('should have one selected person', () => {
      page.people().eq(1)
        .should('have.class', SELECTED_PERSON_CLASS);

      cy.get('[data-cy="person"].' + SELECTED_PERSON_CLASS)
        .should('have.length', 1);
    });

    it('should highlight person with given slug', () => {
      page.visit('/#/people/jan-van-brussel-1714');

      page.people().eq(3)
        .should('have.class', SELECTED_PERSON_CLASS)
    });

    it('should allow to select another person', () => {
      page.visit('/#/people/jan-van-brussel-1714');

      page.people().eq(3)
        .find('td').eq(0)
        .find('a')
        .click();

      page.assertHash('#/people/jan-van-brussel-1714')

      page.people().eq(3)
        .should('have.class', SELECTED_PERSON_CLASS);

      page.people().eq(1)
        .should('not.have.class', SELECTED_PERSON_CLASS);
    });
  });

  describe('#/people/:wrong-slug page', () => {
    beforeEach(() => {
      page.mockPeople();
      page.visit('/#/people/non-existing-slug');
    });

    it('should have correct address', () => {
      page.assertHash('#/people/non-existing-slug');
    });

    it('should have People nav link active', () => {
      page.nav()
        .contains('a', 'People')
        .and('have.class', ACTIVE_NAV_LINK_CLASS);
    });

    it('should have only correct title', () => {
      page.assetTitle('People Page');
    });

    it('should have people table', () => {
      page.peopleTable().should('exist');
    });

    it('should not have a selected person', () => {
      cy.get('[data-cy="person"].' + SELECTED_PERSON_CLASS)
        .should('not.exist');
    });

    it('should allow to select a person', () => {
      page.people().eq(1)
        .find('td').eq(0)
        .find('a')
        .click();

      page.assertHash('#/people/emma-de-milliano-1876')

      page.people().eq(1)
        .should('have.class', SELECTED_PERSON_CLASS);
    });
  });
});
