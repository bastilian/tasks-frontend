import React from 'react';
import { render } from '@testing-library/react';

import TasksTables from '../TasksTables';
import { completedTasksTableItems } from './TasksTable.fixtures';
import columns from '../../../../../PresentationalComponents/CompletedTasksTable/Columns';

describe('TasksTables', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'table',
      ouiaId: 'ouia-table',
      items: completedTasksTableItems,
      columns: columns,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(<TasksTables {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  // This test will be updated in future PR with empty state
  it('should render empty', () => {
    props.items = undefined;
    props.columns = undefined;
    const { asFragment } = render(<TasksTables {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
