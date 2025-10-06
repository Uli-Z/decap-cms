import '../utils/dismiss-local-backup';
import { login, goToCollections } from '../utils/steps';

const backend = 'test';

const encodePath = path => path.split('/').map(segment => encodeURIComponent(segment)).join('/');

function assertEntryLink(title, encodedPath) {
  cy.contains('a', title)
    .should('have.attr', 'href')
    .and('include', `#/collections/posts/entries/${encodedPath}`);
}

describe('Test Backend Collection Subfolders', () => {
  before(() => {
    Cypress.config('defaultCommandTimeout', 4000);
    cy.task('setupBackend', { backend });
  });

  after(() => {
    cy.task('teardownBackend', { backend });
  });

  it('lists nested entries and preserves encoded routes', () => {
    login();
    goToCollections();

    cy.url().should('include', '#/collections/posts');

    assertEntryLink('Nested Post 2024', encodePath('posts/2024-08-19-nested-post'));
    assertEntryLink('Shared Entry (posts)', encodePath('posts/shared-entry'));
    assertEntryLink('Shared Entry (deep space)', encodePath('deep space/shared-entry'));
    assertEntryLink('Countdown 🚀', encodePath('deep space/rocket 🚀/countdown'));
    assertEntryLink('Edge Case #100%', encodePath('edge cases/100% #hash?'));
    assertEntryLink('雨の中のエントリ', encodePath('unicode 子目录/雨'));
  });

  it('loads and saves nested entries with encoded slugs', () => {
    login();
    goToCollections();

    cy.contains('a', 'Edge Case #100%').click();
    cy.url().should(
      'include',
      `#/collections/posts/entries/${encodePath('edge cases/100% #hash?')}`,
    );

    cy.get('input[name="title"]').should('have.value', 'Edge Case #100%');
    cy.get('textarea[name="body"]').type('\nUpdated body', { parseSpecialCharSequences: false });
    cy.contains('button', /Publish/i).click({ force: true });
    cy.contains('div', 'Entry saved');
  });
});
