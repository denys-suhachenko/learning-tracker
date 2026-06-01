import { describe, it, expect } from 'vitest';

import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('returns the provided fallback when the error is not a known shape', () => {
    const error = null;
    const fallback = 'Something went wrong';

    const result = getErrorMessage(error, fallback);

    expect(result).toBe(fallback);
  });

  it('returns the field error message when the error related to required field', () => {
    const error = {
      data: {
        title: ['This field may not be blank.'],
      },
      status: 400,
    };
    const message = 'title: This field may not be blank.';

    const result = getErrorMessage(error);

    expect(result).toBe(message);
  });

  it('returns the fallback when the error is a string', () => {
    const error = 'Field is required';
    const message = 'Something went wrong';

    const result = getErrorMessage(error);

    expect(result).toBe(message);
  });

  it.each([
    {
      data: {
        detail: 'Authentication credentials were not provided.',
      },
      status: 401,
    },
    {
      status: 404,
      data: {
        detail: 'Not found.',
      },
    },
  ])('returns the detail message (status $status)', ({ status, data }) => {
    const result = getErrorMessage({ status, data });
    expect(result).toBe(data.detail);
  });

  it('returns the default fallback message when error object has unexpected format', () => {
    const error = {
      details: 'Details',
      status: 500,
    };
    const fallback = 'Something went wrong';

    const result = getErrorMessage(error);

    expect(result).toBe(fallback);
  });
});
