import { z } from 'zod';

const baseApiUrl = 'http://localhost:3000';

const UsersDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const api = {
  getUsers() {
    return fetch(`${baseApiUrl}/users`)
      .then((res) => res.json())
      .then((users) => UsersDtoSchema.array().parse(users));
  },
  getUser(id: string) {
    return fetch(`${baseApiUrl}/users/${id}`)
      .then((res) => res.json())
      .then((user) => UsersDtoSchema.parse(user));
  },
  deleteUser(id: string) {
    return fetch(`${baseApiUrl}/users/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  },
};
