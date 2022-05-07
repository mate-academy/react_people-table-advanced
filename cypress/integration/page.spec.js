import { page } from '../support/utils/common.js';

describe('Page', () => {
  beforeEach(() => {
    cy.intercept('**/people.json', { fixture: 'people' });

    cy.visit('#/people');
  });

  it('should have the name of a person as a link to the person containing slug', () => {
    page.checkIfHrefIncludes('Carolus Haverbeke', 'carolus-haverbeke-1832');
  });

  it('should use person name as a link with slug in "name", "mother" and "father" columns', () => {
    cy.getByDataCy('filterInput')
      .type('Lieven de Causmaecker');

    page.checkIfHrefIncludes('Lieven de Causmaecker', 'lieven-de-causmaecker-1696');

    page.checkIfHrefIncludes('Joanna Claes', 'emma-de-milliano-1876');

    page.checkIfHrefIncludes('Carolus Haverbeke', 'carolus-haverbeke-1832');
  });

  it('should have different text colors for male and female names', () => {
    cy.contains('Carolus Haverbeke')
      .invoke('css', 'color')
      .should('eq', 'rgb(0, 71, 171)')

    cy.contains('Joanna Claes')
      .invoke('css', 'color')
      .should('eq', 'rgb(255, 0, 0)');
  });

  it('should highlight row with selected person', () => {
    cy.get('tbody')
      .children()
      .eq(0)
      .invoke('css', 'background-color')
      .then((rowNotHighlighted) => {
        cy.contains('Carolus Haverbeke')
          .click();

        cy.get('tbody')
          .children()
          .eq(0)
          .invoke('css', 'background-color')
          .then((rowHighlighted) => {
            expect(rowNotHighlighted).to.not.eq(rowHighlighted);
          });
      });
  });

  it('should not highlight any row if the `slug` in the URL is not found among the people', () => {
    cy.contains('Carolus Haverbeke')
      .click();

    cy.get('tbody')
      .children()
      .eq(0)
      .invoke('css', 'background-color')
      .then((selectedRowColor) => {

        cy.visit('#/people/some-slug-1832?');

        cy.get('tbody')
          .children()
          .each((row) => {
            cy.get(row)
              .invoke('css', 'background-color')
              .should('not.eq', selectedRowColor);
          });
      });
  });

  it('should update the URL with "query=<user input>" after user enters data in the input', () => {
    cy.getByDataCy('filterInput')
      .type('test{enter}');

    cy.url()
      .should('include', 'query=test');
  });

  it('should set the "query" value from the URL to the input when the page is loaded', () => {
    cy.getByDataCy('filterInput')
      .type('test{enter}');

    cy.url()
      .should('include', 'query=test');

    cy.reload();

    cy.url()
      .should('include', 'query=test');

    cy.getByDataCy('filterInput')
      .should('have.value', 'test');
  });

  it('should filter poeple by "name"', () => {
    cy.getByDataCy('filterInput')
      .type('Lieven');

    cy.get('tbody')
      .children()
      .should('have.length', 1)
      .and('contain', 'Lieven de Causmaecker');
  });

  it('should filter poeple by "motherName"', () => {
    cy.getByDataCy('filterInput')
      .type('Joanna Claes');

    cy.get('tbody')
      .children()
      .should('have.length', 2)
      .and('contain', 'Lieven de Causmaecker');
  });

  it('should filter people by "fatherName"', () => {
    cy.getByDataCy('filterInput')
      .type('Carolus Haverbeke');

    cy.get('tbody')
      .children()
      .should('have.length', 3)
      .and('contain', 'Lieven de Causmaecker');
  });

  it('should highlight the column to sort by', () => {
    cy.contains('Born')
      .invoke('attr', 'class')
      .then((sortNotApplied) => {
        cy.contains('Born')
          .click()
          .invoke('attr', 'class')
          .then((sortApplied) => {
            expect(sortNotApplied).to.not.eq(sortApplied);
          });
      });
  });

  it('should have "sortBy=" param added to the URL', () => {
    cy.contains('Sex')
      .as('sex')
      .click();

    cy.url()
      .should('include', 'sortBy=');
  });

  it('should sort the people by "name"', () => {
    cy.contains('Name')
      .click();

    page.checkColumnIsSorted(1, 'asc');
  });

  it('should sort the people by "sex"', () => {
    cy.contains('Sex')
      .click();

    page.checkColumnIsSorted(2, 'asc');
  });

  it('should sort the people by "born"', () => {
    cy.contains('Born')
      .click();

    page.checkColumnIsSorted(3, 'asc', 'number');
  });

  it('should sort the people by "died"', () => {
    cy.contains('Died')
      .click();

    page.checkColumnIsSorted(4, 'asc', 'number');
  });

  it('should apply "sortBy" if the page is loaded with it (column is highilghted and people are sorted)', () => {
    cy.contains('Sex')
      .click()
      .invoke('attr', 'class')
      .then((sortNotApplied) => {
        page.checkColumnIsSorted(2, 'asc');

        cy.reload();

        cy.url()
          .should('include', 'sortBy=');
        page.checkColumnIsSorted(2, 'asc');

        cy.contains('Sex')
          .invoke('attr', 'class')
          .should('eq', sortNotApplied);
      });
  });

  it('should not highlight any column and sort people if the "sortBy" value is not valid', () => {
    cy.contains('Sex')
      .click()
      .invoke('attr', 'class')
      .then((atr) => {
        cy.visit('/#/people?query=&sortBy=foo');
        cy.reload();
        cy.contains('Sex')
          .invoke('attr', 'class')
          .should('not.eq', atr);
      });

    page.checkColumnIsNotSorted(2);
  });

  it('should have sort working together with filtering', () => {
    cy.getByDataCy('filterInput')
      .type('Joanna Claes');

    cy.get('tbody')
      .children()
      .should('have.length', 2)
      .and('contain', 'Lieven de Causmaecker');

    cy.contains('Sex')
      .as('sex')
      .click();

    page.checkColumnIsSorted(2, 'asc');

    cy.url()
      .should('include', 'sortBy=')
      .and('include', 'query=Joanna+Claes');
  });

  it('should have "query" and "sortBy" stay in the URL when a user is selected', () => {
    cy.contains('Name')
      .click();

    cy.contains('Carolus Haverbeke')
      .click();

    cy.url()
      .should('contain', 'carolus-haverbeke-1832')
      .and('include', 'sortBy=');
  });

  it('should sort people in both directions', () => {
    cy.contains('Name')
      .click();

    page.checkColumnIsSorted(1, 'asc');

    cy.contains('Name')
      .click();

    page.checkColumnIsSorted(1, 'desc');
  });

  it('should sort "ascending" after the first click and "descending" after the second', () => {
    cy.contains('Born')
      .click();

    page.checkColumnIsSorted(3, 'asc', 'number');

    cy.contains('Born')
      .click();

    page.checkColumnIsSorted(3, 'desc', 'number');
  });

  it('should update the "query" in the URL with "debounce" of 500ms', () => {
    cy.clock();

    cy.getByDataCy('filterInput')
      .type('test{enter}');

    cy.tick(499);

    cy.url()
      .should('not.include', 'query=test');

    cy.tick(500);

    cy.url()
      .should('include', 'query=test');
  });
});
