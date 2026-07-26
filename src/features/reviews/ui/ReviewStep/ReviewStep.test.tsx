import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { makeCard } from '../../test/factories';
import ReviewStep, { type ReviewStepProps } from './ReviewStep';
import { GRADES } from '../../lib/scheduler';

const renderStep = (props: Partial<ReviewStepProps> = {}) => {
  const card = makeCard();

  const user = userEvent.setup();

  const onReveal = vi.fn();
  const onGrade = vi.fn();

  render(
    <ReviewStep
      card={card}
      isRevealed={false}
      onReveal={onReveal}
      onGrade={onGrade}
      {...props}
    />,
  );

  return { card, user, onReveal, onGrade };
};

describe('ReviewStep', () => {
  it('hides the answer when not revealed', () => {
    const { card } = renderStep();

    expect(screen.queryByText(card.answer)).not.toBeInTheDocument();
  });

  it('shows the answer when revealed', () => {
    const { card } = renderStep({ isRevealed: true });

    expect(screen.getByText(card.answer)).toBeInTheDocument();
  });

  it('calls onReveal when the show answer button is clicked', async () => {
    const { user, onReveal } = renderStep();

    await user.click(screen.getByRole('button', { name: /show answer/i }));

    expect(onReveal).toHaveBeenCalledOnce();
  });

  it.each(GRADES)('calls onGrade with %s when clicked', async (grade) => {
    const { user, onGrade } = renderStep({ isRevealed: true });

    await user.click(
      screen.getByRole('button', { name: new RegExp(grade, 'i') }),
    );

    expect(onGrade).toHaveBeenCalledExactlyOnceWith(grade);
  });
});
