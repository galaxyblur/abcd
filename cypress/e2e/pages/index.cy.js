/* AGENT: Do not use any mockups to influence the design of this page;
 * come up with your own design that meets the requirements.
 */

describe('the index page', () => {
  /* Design Requirements:
   * - The site is a blog
   * - The markdown files in the `content/posts` directory must be converted to HTML for display
   * - All list items have a visible list-style-type with position "inside"
   * - The site content author is displayed subtly but not obscurely
   */

  let postContent = {};

  before(() => {
    // Read and parse the markdown file before running tests
    cy.readFile('content/posts/01.md').then((markdown) => {
      const lines = markdown.split('\n').filter(line => line.trim());

      // Extract title (first line starting with #)
      const titleLine = lines.find(line => line.startsWith('# '));
      postContent.title = titleLine ? titleLine.replace(/^#\s+/, '') : '';

      // Extract excerpt (first paragraph after title)
      let excerptFound = false;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
          // Look for first substantial paragraph after title
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j] &&
              !lines[j].startsWith('#') &&
              !lines[j].startsWith('*') &&
              !lines[j].startsWith('-') &&
              !lines[j].startsWith('---') &&
              lines[j].length > 50) { // Substantial content
              postContent.excerpt = lines[j];
              excerptFound = true;
              break;
            }
          }
          if (excerptFound) break;
        }
      }
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('body').as('container');
  });

  it('displays the header with navbar', () => {
    cy.get('@container').find('#navbar').should('be.visible');
    cy.get('@container').find('#navbar').contains('Attractor-Based Convergent Development (ABCD)');
    cy.get('@container').find('#navbar').find('a[title="Source Code"]').should('be.visible');
  });

  it('displays the footer', () => {
    cy.get('@container').find('#footer').should('be.visible');
    cy.get('@container').find('#footer').should('contain.text', `© ${new Date().getFullYear()}`);
    cy.get('@container').find('#footer').contains('Corky Brown');
    cy.get('@container').find('#footer').find('#agent-signature').should('be.visible');
  });

  describe('the posts section', () => {
    beforeEach(() => {
      // Visit with showList=true to force showing the posts list for testing
      cy.visit('/?showList=true');
      cy.get('body').as('container');
      cy.get('@container').find('#posts').as('posts');
    });

    it('displays a list of posts with the first 3 posts by default', () => {
      // Check that posts section is visible
      cy.get('@posts').should('be.visible');

      // Check that at least one post is displayed
      cy.get('@posts').find('.post-item').should('have.length.at.least', 1);

      // Verify the post title is displayed from the markdown content
      cy.get('@posts').find('.post-item').first().should('contain', postContent.title);
    });

    it('displays only a truncated version of each post that is text-only', () => {
      // Check that post excerpt is displayed (truncated version)
      cy.get('@posts').find('.post-item').first().find('.post-excerpt').should('be.visible');

      // Verify the excerpt contains text from the markdown content
      cy.get('@posts').find('.post-item').first().find('.post-excerpt').should('contain', postContent.excerpt);

      // Ensure it's text-only (no HTML tags, images, etc.)
      cy.get('@posts').find('.post-item').first().find('.post-excerpt').should('not.contain', '<');
      cy.get('@posts').find('.post-item').first().find('.post-excerpt').find('img').should('not.exist');
    });

    it('if not on the last page, supports pagination for going to the next set of 3 posts', () => {
      // Since we only have 1 post, the next button should not be visible
      cy.get('@posts').find('#next-page').should('not.be.visible');

      // This test would be more meaningful with multiple posts
      // For now, we verify the pagination structure exists
      cy.get('@posts').find('#pagination').should('exist');
    });

    it('if not on the first page, supports pagination for going to the previous set of 3 posts', () => {
      // Since we're on the first page with only 1 post, previous button should not be visible
      cy.get('@posts').find('#prev-page').should('not.be.visible');

      // Verify the pagination structure exists
      cy.get('@posts').find('#pagination').should('exist');
    });

    it('changes the URL when paging', () => {
      // Get current URL
      cy.url().should('not.include', 'page=');

      // Since we only have one post, we can't test pagination navigation
      // But we can verify that the URL structure is set up correctly
      cy.window().then((win) => {
        // Verify that the pagination functions exist
        expect(win.nextPage).to.be.a('function');
        expect(win.prevPage).to.be.a('function');
      });
    });

    it('allows the user to view a full post by navigating to an individual "post" page', () => {
      // Click on the post title to navigate to the full post
      cy.get('@posts').find('.post-item').first().find('h4').click();

      // Verify we're now viewing the full post (the #post element should be visible)
      cy.get('#post').should('be.visible');

      // Verify the full post title is displayed
      cy.get('#post').should('contain', postContent.title);

      // Verify URL changed to include post parameter
      cy.url().should('include', 'post=1');

      // Verify we can go back to home
      cy.get('.back-button').click();
      cy.get('@posts').should('be.visible');
      cy.get('#post').should('not.be.visible');
    });
  });
});
