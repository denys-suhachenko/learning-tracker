import { baseApi } from '@/shared/api/baseApi';

import type {
  CreateReviewCardRequest,
  Grade,
  ReviewCardApi,
  ReviewDeck,
  ReviewSummary,
  ReviewTopic,
} from '../model/types';

export type ReviewCardsQueryParams = {
  status?: 'new' | 'learning' | 'review' | 'mastered';
  due?: boolean;
  topic?: string;
  deck?: string;
  search?: string;
};

export type UpdateReviewCardRequest = Partial<
  Omit<CreateReviewCardRequest, 'review_next_session'>
>;

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getReviewCards: create.query<ReviewCardApi[], ReviewCardsQueryParams>({
      query: ({ status, due, topic, deck, search }) => ({
        url: '/review-cards/',
        params: {
          ...(status && { status }),
          ...(due && { due: 'true' }),
          ...(topic && { topic }),
          ...(deck && { deck }),
          ...(search && { search }),
        },
      }),

      providesTags: ['Reviews'],
    }),

    getReviewCard: create.query<ReviewCardApi, string>({
      query: (cardId) => `/review-cards/${cardId}/`,
      providesTags: ['Reviews'],
    }),

    updateReviewCard: create.mutation<
      ReviewCardApi,
      {
        cardId: string;
        body: UpdateReviewCardRequest;
      }
    >({
      query: ({ cardId, body }) => ({
        url: `/review-cards/${cardId}/`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: ['Reviews'],
    }),

    deleteReviewCard: create.mutation<void, string>({
      query: (cardId) => ({
        url: `/review-cards/${cardId}/`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Reviews'],
    }),

    getReviewTopics: create.query<ReviewTopic[], void>({
      query: () => '/review-topics/',
      providesTags: ['Reviews'],
    }),

    getReviewDecks: create.query<ReviewDeck[], void>({
      query: () => '/review-decks/',
      providesTags: ['Reviews'],
    }),

    getReviewSummary: create.query<ReviewSummary, void>({
      query: () => '/review-cards/summary/',
      providesTags: ['Reviews'],
    }),

    createReviewCard: create.mutation<ReviewCardApi, CreateReviewCardRequest>({
      query: (body) => ({
        url: '/review-cards/',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Reviews'],
    }),

    getDueReviewCards: create.query<ReviewCardApi[], void>({
      query: () => '/review-cards/due/',
      providesTags: ['Reviews'],
    }),

    reviewCard: create.mutation<
      ReviewCardApi,
      {
        cardId: string;
        grade: Grade;
      }
    >({
      query: ({ cardId, grade }) => ({
        url: `/review-cards/${cardId}/review/`,
        method: 'POST',
        body: {
          grade,
        },
      }),

      invalidatesTags: ['Reviews'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetReviewCardsQuery,
  useGetReviewTopicsQuery,
  useGetReviewDecksQuery,
  useGetReviewSummaryQuery,
  useCreateReviewCardMutation,
  useGetDueReviewCardsQuery,
  useReviewCardMutation,
} = reviewsApi;
