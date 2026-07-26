import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ReviewCard from './ReviewCard';

describe('ReviewCard', () => {
  it('renders its children', () => {
    render(<ReviewCard side="front">What is mitochondria?</ReviewCard>);

    expect(screen.getByText('What is mitochondria?')).toBeInTheDocument();
  });

  // TODO: update when i18n is added - will need t() mock
  it.each(['front', 'back'] as const)('shows the %s badge', (side) => {
    render(<ReviewCard side={side}>Review Card Data</ReviewCard>);

    expect(screen.getByText(side)).toBeInTheDocument();
  });
});
