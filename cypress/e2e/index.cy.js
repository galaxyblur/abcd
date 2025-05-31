describe('the index page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the site title', () => {
    cy.get('h1').contains('ABCD: Attractor-Based Convergent Development');
  });

  describe('overview section', () => {
    beforeEach(() => {
      cy.get('#site-overview').as('overview');
    });

    it('displays the site overview', () => {
      cy.get('@overview').find('p').contains(
        'Attractor-Based Convergent Development (ABCD) is a software development methodology where multiple AI agents independently explore different implementation approaches while being pulled toward the same success criteria, like scattered explorers all finding their own paths to the same destination.',
      );
    });
  });

  describe('scaffolding section', () => {
    beforeEach(() => {
      cy.get('#site-scaffolding').as('scaffolding');
    });

    it('is displayed', () => {
      cy.get('@scaffolding').should('be.visible')
        .find('h2')
        .contains('Scaffolding');
    });

    it('displays the scaffolding description', () => {
      cy.get('@scaffolding').find('p').contains(
        'In ABCD, the human software engineer(s) are responsible for providing sensible project scaffolding to the agents to avoid development iterations on basic needs.',
      );
    });

    it('displays the scaffolding list', () => {
      cy.get('@scaffolding').find('li').contains(
        'Agent Guide: an entrypoint markdown file for agents to use as a reference. Includes info on design, and the rules of engagement.',
      );
      cy.get('@scaffolding').find('li').contains(
        'Live Project Instance: a web server, build, or app deployment runnable by the agents as needed',
      );
      cy.get('@scaffolding').find('li').contains(
        'Testing Setup: a standard means for testing the project that all agents will share and use to validate changes',
      );
      cy.get('@scaffolding').find('li').contains(
        'Design Guidelines: basic specification for how the project UI should be designed',
      );
    });
  });
})
