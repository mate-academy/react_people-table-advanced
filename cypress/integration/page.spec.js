const page = {
  getByDataCy: (name) => cy.get(`[data-cy="${name}"]`),
  mockTodos: () => cy.intercept('**/todos.json', { fixture: 'todos' }),
  mockUser1: () => cy.intercept('**/users/1.json', { fixture: 'userOne' }),
  mockUser2: () => cy.intercept('**/users/2.json', { fixture: 'userTwo' }),

  todos: () => page.getByDataCy('todo'),
  modal: () => page.getByDataCy('modal'),
  loader: () => page.getByDataCy('loader'),
  searchInput: () => page.getByDataCy('searchInput'),
  statusSelect: () => page.getByDataCy('statusSelect'),
  clearSearchButton: () => page.getByDataCy('clearSearchButton'),

  selectTodo: (index) => {
    return page.todos()
      .eq(index)
      .find(`[data-cy="selectButton"]`)
      .click();
  },
};

describe('Page', () => {
  beforeEach(() => {
    page.mockTodos();
    cy.visit('/');
  });

  it('should show loader before loading todos', () => {
    cy.clock();

    page.loader()
      .should('exist');

    page.todos()
      .should('not.exist');
  });

  it('should have an empty filter by default', () => {
    page.searchInput()
      .should('have.value', '');

    page.statusSelect()
      .should('have.value', 'all')
  });

  it('should show all the loaded todos', () => {
    cy.clock();
    cy.tick(5000);

    page.loader()
      .should('not.exist');
    
    page.todos()
      .should('have.length', 5);

    page.todos()
      .first()
      .should('contain.text', 'Delectus aut autem')
      .find('td')
      .first()
      .should('have.text', '1');

    page.todos()
      .last()
      .should('contain.text', 'Distinctio vitae autem nihil ut molestias quo')
      .find('td')
      .first()
      .should('have.text', '22');
  });

  it('should show completed icons only for completed todos', () => {
    page.todos().eq(0).find('[data-cy="iconCompleted"]').should('not.exist');
    page.todos().eq(1).find('[data-cy="iconCompleted"]').should('not.exist');
    page.todos().eq(2).find('[data-cy="iconCompleted"]').should('exist');
    page.todos().eq(3).find('[data-cy="iconCompleted"]').should('not.exist');
    page.todos().eq(4).find('[data-cy="iconCompleted"]').should('exist');
  });

  it('should allow to select only active todos', () => {
    page.statusSelect()
      .select('active')
      .should('have.value', 'active');

    page.todos()
      .should('have.length', 3)

    page.todos().eq(0).should('contain.text', 'Delectus aut autem')
    page.todos().eq(1).should('contain.text', 'Quis ut nam facilis et officia qui')
    page.todos().eq(2).should('contain.text', 'Suscipit repellat esse quibusdam vuptatem incidunt')
  });

  it('should allow to select only completed todos', () => {
    page.statusSelect()
      .select('completed')
      .should('have.value', 'completed');

    page.todos()
      .should('have.length', 2)

    page.todos().eq(0).should('contain.text', 'Et porro tempora')
    page.todos().eq(1).should('contain.text', 'Distinctio vitae autem nihil ut molestias quo')
  });

  it('should allow to reset the status', () => {
    page.statusSelect()
      .select('completed')
      .select('all')
      .should('have.value', 'all');

    page.todos()
      .should('have.length', 5);
  });

  it('should allow to filter todos by query', () => {
    page.searchInput()
      .type('tem')
      .should('have.value', 'tem');

    page.todos()
      .should('have.length', 4);

    page.todos().eq(0).should('contain.text', 'Delectus aut autem');
    page.todos().eq(1).should('contain.text', 'Et porro tempora');
  });

  it('should ignore search case', () => {
    page.searchInput()
      .type('TeM')

    page.todos()
      .should('have.length', 4);
  });

  it('should ignore todo title case', () => {
    page.searchInput()
      .type('d')

    page.todos()
      .should('have.length', 3);

    page.todos().eq(0).should('contain.text', 'Delectus aut autem');
    page.todos().eq(1).should('contain.text', 'Suscipit repellat esse quibusdam vuptatem incidunt');
    page.todos().eq(2).should('contain.text', 'Distinctio vitae autem nihil ut molestias quo');
  });

  it('should show no todos if nothing matches the search query', () => {
    page.searchInput()
      .type('xxx')

    page.todos()
      .should('have.length', 0);
  });

  it('should allow to reset search query', () => {
    page.searchInput()
      .type('xxx')
      .type('{selectAll}{backspace}')
      .should('have.value', '')

    page.todos()
      .should('have.length', 5);
  });

  it('should how show clear button by default', () => {
    page.clearSearchButton()
      .should('not.exist')
  });

  it('should show clear button when seach query is not empty', () => {
    page.searchInput()
      .type('xxx')

    page.clearSearchButton()
      .should('exist')
  });

  it('should hide clear button when seach query becomes empty', () => {
    page.searchInput()
      .type('xxx')
      .type('{selectAll}{backspace}')

    page.clearSearchButton()
      .should('not.exist')
  });

  it('should allow to clear search query using clear button', () => {
    page.searchInput()
      .type('tem');

    page.clearSearchButton()
      .click();

    page.searchInput()
      .should('have.value', '')

    page.todos()
      .should('have.length', 5);
  });

  it('should have only show buttons by default', () => {
    cy.get('.fa-eye')
      .should('have.length', 5);

    cy.get('.fa-eye-slash')
      .should('have.length', 0);
  });

  it('should not show modal by default', () => {
    page.modal()
      .should('not.exist');
  });

  it('should show modal when todo is selected', () => {
    page.mockUser1();
    page.selectTodo(1);
      
    page.modal()
      .should('exist');
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

  it('should show loader when loading a user', () => {
    page.mockUser1();
    page.selectTodo(1);

    cy.clock();

    page.modal()
      .find('[data-cy="loader"]')
      .should('exist');
  });

  it('should hide loader when user is loaded', () => {
    page.mockUser1();
    page.selectTodo(1);

    page.modal()
      .find('[data-cy="loader"]')
      .should('not.exist');
  });

  it('should show correct data for a not completed todo', () => {
    page.mockUser1();
    page.selectTodo(0);

    page.getByDataCy('modal-header')
      .should('have.text', 'Todo #1');

    page.getByDataCy('modal-title')
      .should('have.text', 'Delectus aut autem');

    page.getByDataCy('modal-user')
      .should('have.text', 'Planned by Leanne Graham');
  });

  it('should show correct data for a completed todo', () => {
    page.mockUser2();
    page.selectTodo(4);

    page.getByDataCy('modal-header')
      .should('have.text', 'Todo #22');

    page.getByDataCy('modal-title')
      .should('have.text', 'Distinctio vitae autem nihil ut molestias quo');

    page.getByDataCy('modal-user')
      .should('have.text', 'Done by Ervin Howell');
  });

  it('should close a modal with close button', () => {
    page.mockUser2();
    page.selectTodo(4);

    page.getByDataCy('modal-close')
      .click();

    page.modal()
      .should('not.exist');

    cy.get('.fa-eye-slash')
      .should('have.length', 0);
  });
});
