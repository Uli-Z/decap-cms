import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { fromJS, List, OrderedMap } from 'immutable';

import { WorkflowList } from '../WorkflowList';

jest.mock('../../UI', () => ({
  DragSource: ({ children }) => children(node => node),
  DropTarget: ({ children }) => children(node => node, { isHovered: false }),
  HTML5DragDrop: Component => Component,
}));

jest.mock('../WorkflowCard', () => ({
  __esModule: true,
  default: ({ editLink }) => <div data-testid="workflow-card" data-edit-link={editLink} />,
}));

function buildEntries(entry) {
  return OrderedMap({ draft: List([entry]) });
}

function translate(key, options = {}) {
  if (key === 'workflow.workflowList.dateFormat') {
    return 'YYYY-MM-DD';
  }
  if (key === 'workflow.workflowList.currentEntries') {
    return String(options.smart_count ?? '');
  }
  return key;
}

describe('WorkflowList', () => {
  const collections = fromJS({
    posts: {
      name: 'posts',
      label: 'Posts',
      fields: [{ name: 'title', widget: 'string' }],
    },
  });

  it('builds encoded edit links for nested slugs', () => {
    const entry = fromJS({
      slug: 'nested dir/child entry',
      collection: 'posts',
      status: 'draft',
      updatedOn: '2024-03-01T12:00:00.000Z',
      data: { title: 'Nested Entry', body: 'Body copy' },
      metaData: { user: 'user' },
      isPersisting: false,
      author: 'author',
    });

    render(
      <MemoryRouter>
        <WorkflowList
          entries={buildEntries(entry)}
          handleChangeStatus={jest.fn()}
          handlePublish={jest.fn()}
          handleDelete={jest.fn()}
          t={translate}
          isOpenAuthoring={false}
          collections={collections}
        />
      </MemoryRouter>,
    );

    const card = screen.getByTestId('workflow-card');
    expect(card.dataset.editLink).toBe(
      '/collections/posts/entries/nested%20dir/child%20entry?ref=workflow',
    );
  });
});
