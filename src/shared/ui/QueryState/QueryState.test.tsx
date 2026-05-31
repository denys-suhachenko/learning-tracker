import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { QueryState } from './QueryState';

describe('QueryState', () => {
  it('renders children when not loading and not error', () => {
    render(
      <QueryState
        isLoading={false}
        isError={false}
        skeleton={<div>Loading skeleton</div>}
      >
        <div>Actual content</div>
      </QueryState>,
    );

    expect(screen.getByText('Actual content')).toBeInTheDocument();
    expect(screen.queryByText('Loading skeleton')).not.toBeInTheDocument();
  });

  it('renders the skeleton when loading', () => {
    render(
      <QueryState
        isLoading={true}
        isError={false}
        skeleton={<div>Loading skeleton</div>}
      >
        <div>Expected content</div>
      </QueryState>,
    );

    expect(screen.getByText('Loading skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Expected content')).not.toBeInTheDocument();
  });

  it('renders error message when in error state', () => {
    render(
      <QueryState
        isLoading={false}
        isError={true}
        errorMessage="Given error message"
        skeleton={<div>Loading skeleton</div>}
      >
        <div>Expected content</div>
      </QueryState>,
    );

    expect(screen.getByText('Given error message')).toBeInTheDocument();
    expect(screen.queryByText('Expected content')).not.toBeInTheDocument();
  });

  it('renders the default error message when none is provided', () => {
    render(
      <QueryState
        isLoading={false}
        isError={true}
        skeleton={<div>Loading skeleton</div>}
      >
        <div>content</div>
      </QueryState>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('calls onRetry when the retry button is clicked', async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryState
        isLoading={false}
        isError={true}
        skeleton={<div>Loading skeleton</div>}
        onRetry={onRetry}
      >
        <div>content</div>
      </QueryState>,
    );

    await user.click(
      screen.getByRole('button', {
        name: /try again/i,
      }),
    );

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('does not render the retry button when onRetry is not provided', () => {
    render(
      <QueryState
        isLoading={false}
        isError={true}
        skeleton={<div>Loading skeleton</div>}
      >
        <div>content</div>
      </QueryState>,
    );

    expect(
      screen.queryByRole('button', {
        name: /try again/i,
      }),
    ).not.toBeInTheDocument();
  });
});
