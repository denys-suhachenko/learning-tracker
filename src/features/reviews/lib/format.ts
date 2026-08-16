import type { ReviewCardApi } from '../model/types';

export const formatStatus = (card: ReviewCardApi) => {
  if (card.is_due) {
    return 'Due Today';
  }

  return card.status.charAt(0).toUpperCase() + card.status.slice(1);
};

export const formatDueDate = (dueAt: string | null) => {
  if (!dueAt) {
    return 'Not scheduled';
  }

  const dueDate = new Date(dueAt);
  const today = new Date();

  const isToday =
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate();

  if (isToday) {
    return 'Today';
  }

  return dueDate.toLocaleDateString();
};
