import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CARDS } from '../../test/mocks';

import ReviewSession from './ReviewSession';

const renderSession = () => {
  const user = userEvent.setup();

  render(<ReviewSession cards={CARDS} />);

  return { user };
};

describe('ReviewSession', () => {
  it('shows the next card when a grade is given', async () => {
    const { user } = renderSession();

    expect(screen.getByText(CARDS[0].question)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /show answer/i }));
    expect(screen.getByText(CARDS[0].answer)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /good/i }));
    expect(screen.getByText(CARDS[1].question)).toBeInTheDocument();
    expect(screen.queryByText(CARDS[1].answer)).not.toBeInTheDocument();
  });
});
