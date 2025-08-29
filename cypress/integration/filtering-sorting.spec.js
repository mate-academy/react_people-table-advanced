/// <reference types="cypress" />

describe('Filtering and Sorting Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load people and show filters once loaded', () => {
    cy.get('[data-cy="peopleTable"]').should('be.visible');
    cy.get('.panel').should('be.visible');
  });

  it('should filter people by name query', () => {
    cy.get('[data-cy="NameFilter"]').type('Anna');
    cy.url().should('include', 'query=Anna');
    cy.get('[data-cy="person"]').should('have.length.greaterThan', 0);
    cy.get('[data-cy="person"]').each($person => {
      const text = $person.text().toLowerCase();
      expect(text).to.include('anna');
    });
  });

  it('should filter people by sex', () => {
    // Select male
    cy.contains('Male').click();
    cy.url().should('include', 'sex=m');
    cy.get('[data-cy="person"]').each($person => {
      cy.wrap($person).find('td').eq(1).should('have.text', 'm');
    });

    // Select female
    cy.contains('Female').click();
    cy.url().should('include', 'sex=f');
    cy.get('[data-cy="person"]').each($person => {
      cy.wrap($person).find('td').eq(1).should('have.text', 'f');
    });
  });

  it('should filter people by century', () => {
    // Select 17th century
    cy.contains('17').click();
    cy.url().should('include', 'centuries=17');

    // All people should be from 17th century
    cy.get('[data-cy="person"]').each($person => {
      cy.wrap($person).find('td').eq(2).invoke('text').then(parseInt).should(year => {
        expect(Math.ceil(year / 100)).to.eq(17);
      });
    });

    // Select multiple centuries (17th and 18th)
    cy.contains('18').click();
    cy.url().should('include', 'centuries=17');
    cy.url().should('include', 'centuries=18');
  });

  it('should sort people by name', () => {
    // Click on name column header
    cy.get('th').contains('Name').find('a').click();
    cy.url().should('include', 'sort=name');

    // Check ascending sort
    cy.get('[data-cy="person"]').then($people => {
      const names = $people.toArray().map(el =>
        el.querySelector('td:first-child').textContent.trim().toLowerCase());
      const sortedNames = [...names].sort();
      expect(names).to.deep.eq(sortedNames);
    });

    // Click again for descending sort
    cy.get('th').contains('Name').find('a').click();
    cy.url().should('include', 'sort=name');
    cy.url().should('include', 'order=desc');

    // Check descending sort
    cy.get('[data-cy="person"]').then($people => {
      const names = $people.toArray().map(el =>
        el.querySelector('td:first-child').textContent.trim().toLowerCase());
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.eq(sortedNames);
    });
  });

  it('should sort people by birth year', () => {
    // Click on born column header
    cy.get('th').contains('Born').find('a').click();
    cy.url().should('include', 'sort=born');

    // Check ascending sort
    cy.get('[data-cy="person"]').then($people => {
      const years = $people.toArray().map(el =>
        parseInt(el.querySelector('td:nth-child(3)').textContent.trim()));
      const sortedYears = [...years].sort((a, b) => a - b);
      expect(years).to.deep.eq(sortedYears);
    });
  });

  it('should reset filters', () => {
    // Apply some filters first
    cy.contains('Female').click();
    cy.contains('18').click();
    cy.get('[data-cy="NameFilter"]').type('a');

    // Then reset filters
    cy.contains('Reset all filters').click();
    cy.url().should('not.include', 'sex=');
    cy.url().should('not.include', 'centuries=');
    cy.url().should('not.include', 'query=');
  });
});
