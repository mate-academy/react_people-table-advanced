const page = {
  mockTodos: () => cy.intercept('**/todos.json', { fixture: 'todos' }).as('todos'),
  mockUser1: () => cy.intercept('**/users/1.json', { fixture: 'userOne' }).as('user1'),
  mockUser2: () => cy.intercept('**/users/2.json', { fixture: 'userTwo' }).as('user2'),

  todos: () => cy.byDataCy('todo'),
  modal: () => cy.byDataCy('modal'),
  loader: () => cy.byDataCy('loader'),
  searchInput: () => cy.byDataCy('searchInput'),
  statusSelect: () => cy.byDataCy('statusSelect'),
  clearSearchButton: () => cy.byDataCy('clearSearchButton'),

  selectTodo: (index) => {
    page.todos().eq(index).byDataCy('selectButton')
      .click();
  },
};

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('Page', () => {
  beforeEach(() => {
    // if (failed) Cypress.runner.stop();
  });

  describe('before todos are loaded', () => {
    beforeEach(() => {
      page.mockTodos();
      cy.clock();
      cy.visit('/');
    });

    it('should show loader', () => {
      page.loader().should('exist');
    });

    it('should not show todos', () => {
      page.todos().should('not.exist');
    });
  });

  describe('after todos are loaded', () => {
    beforeEach(() => {
      page.mockTodos();
      cy.visit('/');
    });

    it('should hide loader when todos are loaded', () => {
      page.loader().should('not.exist');
    });

    it('should show all the loaded todos', () => {
      page.todos().should('have.length', 5);

      page.todos().eq(0)
        .should('contain.text', 'Delectus aut autem')
        .find('td').first().should('have.text', '1');

      page.todos().eq(4)
        .should('contain.text', 'Distinctio vitae autem nihil ut molestias quo')
        .find('td').first().should('have.text', '22');
    });

    it('should show completed icons only for completed todos', () => {
      page.todos().eq(0).byDataCy('iconCompleted').should('not.exist');
      page.todos().eq(1).byDataCy('iconCompleted').should('not.exist');
      page.todos().eq(2).byDataCy('iconCompleted').should('exist');
      page.todos().eq(3).byDataCy('iconCompleted').should('not.exist');
      page.todos().eq(4).byDataCy('iconCompleted').should('exist');
    });

    it('should have only show buttons by default', () => {
      cy.get('.fa-eye').should('have.length', 5);
      cy.get('.fa-eye-slash').should('have.length', 0);
    });

    it('should have only a hide button for a selected todo', () => {
      page.mockUser1();
      page.selectTodo(1);

      page.todos()
        .eq(1)
        .find('.fa-eye')
        .should('not.exist');

      page.todos()
        .eq(1)
        .find('.fa-eye-slash')
        .should('exist');
    });
  });

  describe('Modal', () => {
    beforeEach(() => {
      page.mockTodos();
      cy.visit('/');
    });

    it('should not be visible by default', () => {
      page.modal().should('not.exist');
    });

    it('should appear when todo is selected', () => {
      page.mockUser1();
      page.selectTodo(1);

      page.modal().should('exist');
    });

    it('should show loader when loading a user', () => {
      page.mockUser1();
      cy.clock();
      page.selectTodo(1);
  
      page.modal().byDataCy('loader').should('exist');
    });

    it('should hide loader when user is loaded', () => {
      page.mockUser1();
      page.selectTodo(1);

      cy.wait('@user1');
      cy.wait(10);
  
      page.modal().byDataCy('loader').should('not.exist');
    });

    it('should show correct data for a not completed todo', () => {
      page.mockUser1();
      page.selectTodo(0);
  
      cy.byDataCy('modal-header')
        .should('have.text', 'Todo #1');
  
      cy.byDataCy('modal-title')
        .should('have.text', 'Delectus aut autem');
  
      cy.byDataCy('modal-user')
        .should('have.text', 'Planned by Leanne Graham');
    });
  
    it('should show correct data for a completed todo', () => {
      page.mockUser2();
      page.selectTodo(4);
  
      cy.byDataCy('modal-header')
        .should('have.text', 'Todo #22');
  
      cy.byDataCy('modal-title')
        .should('have.text', 'Distinctio vitae autem nihil ut molestias quo');
  
      cy.byDataCy('modal-user')
        .should('have.text', 'Done by Ervin Howell');
    });
  
    it('should closes with close button', () => {
      page.mockUser2();
      page.selectTodo(4);
  
      cy.byDataCy('modal-close')
        .click();
  
      page.modal()
        .should('not.exist');
  
      cy.get('.fa-eye-slash')
        .should('have.length', 0);
    });
  });

  describe('Filter', () => {
    beforeEach(() => {
      page.mockTodos();
      cy.visit('/');
    });

    it('should have an empty query by default', () => {
      page.searchInput().should('have.value', '');
    });

    it('should allow to enter a query', () => {
      page.searchInput()
        .type('tem')
        .should('have.value', 'tem');
    });

    it('should show only todos matching the entered query', () => {
      page.searchInput().type('tem')

      page.todos().should('have.length', 4);
      page.todos().eq(0).should('contain.text', 'Delectus aut autem');
      page.todos().eq(1).should('contain.text', 'Et porro tempora');
    });

    it('should ignore query case when filtering', () => {
      page.searchInput().type('TeM')

      page.todos().should('have.length', 4);
    });

    it('should ignore todo title case when filtering', () => {
      page.searchInput().type('d')

      page.todos().should('have.length', 3);
      page.todos().eq(0).should('contain.text', 'Delectus aut autem');
      page.todos().eq(1).should('contain.text', 'Suscipit repellat esse quibusdam vuptatem incidunt');
      page.todos().eq(2).should('contain.text', 'Distinctio vitae autem nihil ut molestias quo');
    });

    it('should show no todos if nothing matches the query', () => {
      page.searchInput().type('xxx')

      page.todos().should('have.length', 0);
    });

    it('should show all the todos after clearing the query', () => {
      page.searchInput()
        .type('xxx')
        .type('{selectAll}{backspace}')
        .should('have.value', '')

      page.todos().should('have.length', 5);
    });

    it('should not show clear button by default', () => {
      page.clearSearchButton().should('not.exist')
    });

    it('should show clear button when seach query is not empty', () => {
      page.searchInput().type('d')

      page.clearSearchButton().should('exist')
    });

    it('should hide clear button when seach query becomes empty', () => {
      page.searchInput()
        .type('d')
        .type('{selectAll}{backspace}')

      page.clearSearchButton().should('not.exist')
    });

    it('should allow to clear search query using clear button', () => {
      page.searchInput().type('tem');
      page.clearSearchButton().click();

      page.searchInput().should('have.value', '')
      page.todos().should('have.length', 5);
    });

    it('should have status "all" selected by default', () => {
      page.statusSelect().should('have.value', 'all')
    });

    it('should allow to select "active" status', () => {
      page.statusSelect()
        .select('active')
        .should('have.value', 'active');
    });

    it('should allow to select "completed" status', () => {
      page.statusSelect()
        .select('completed')
        .should('have.value', 'completed');
    });

    it('should show only active todos when "active" status is selected', () => {
      page.statusSelect().select('active');

      page.todos().should('have.length', 3);
      page.todos().eq(0).should('contain.text', 'Delectus aut autem');
      page.todos().eq(1).should('contain.text', 'Quis ut nam facilis et officia qui');
      page.todos().eq(2).should('contain.text', 'Suscipit repellat esse quibusdam vuptatem incidunt');
    });

    it('should show only completed todos when "completed" status is selected', () => {
      page.statusSelect().select('completed');

      page.todos().should('have.length', 2);
      page.todos().eq(0).should('contain.text', 'Et porro tempora');
      page.todos().eq(1).should('contain.text', 'Distinctio vitae autem nihil ut molestias quo');
    });

    it('should allow to reset the status', () => {
      page.statusSelect()
        .select('completed')
        .select('all')
        .should('have.value', 'all');

      page.todos().should('have.length', 5);
    });

    it('should allow to filter active todos', () => {
      page.statusSelect().select('active');
      page.searchInput().type('ut')

      page.todos().should('have.length', 2);
      page.todos().eq(0).should('contain.text', 'Delectus aut autem');
      page.todos().eq(1).should('contain.text', 'Quis ut nam facilis et officia qui');
    });

    it('should allow to filter completed todos', () => {
      page.statusSelect().select('completed');
      page.searchInput().type('Distinctio');

      page.todos().should('have.length', 1);
      page.todos().eq(0).should('contain.text', 'Distinctio vitae autem nihil ut molestias quo');
    });
  });
});
