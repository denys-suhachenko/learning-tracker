import { describe, it } from 'vitest';

describe('CourseFormPage', () => {
  it('');
});

// import { http, HttpResponse } from 'msw';
// import { describe, it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { MemoryRouter, Routes, Route } from 'react-router';
// import { Toaster } from 'sonner';

// import { baseApi } from '@/shared/api/baseApi';
// import { env } from '@/shared/config/env';
// import { server } from '@/test/server';
// import authReducer from '@/features/auth/model/slice';
// import type { Course } from '@/features/courses/model/types';

// import CourseFormPage from './CourseFormPage';

// const COURSE_URL = `${env.apiUrl}/courses/course-123`;

// const createTestStore = () =>
//   configureStore({
//     reducer: {
//       [baseApi.reducerPath]: baseApi.reducer,
//       auth: authReducer,
//     },
//     middleware: (gDM) => gDM().concat(baseApi.middleware),
//   });

// const renderCreatepage = () => {
//   const store = createTestStore();

//   return render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={['/courses/create']}>
//         <Routes>
//           <Route path="/courses/create" element={<CourseFormPage />} />
//           <Route path="/courses" element={<div>Courses list page</div>} />
//         </Routes>
//       </MemoryRouter>
//       <Toaster />
//     </Provider>,
//   );
// };

// const renderEditPage = () => {
//   const store = createTestStore();

//   return render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={['/courses/course-123/edit']}>
//         <Routes>
//           <Route path="/courses/:courseId/edit" element={<CourseFormPage />} />
//           <Route path="/courses" element={<div>Courses list page</div>} />
//         </Routes>
//       </MemoryRouter>
//       <Toaster />
//     </Provider>,
//   );
// };

// describe('CourseFormPage: Create', () => {
//   it('creates a course and navigates to the course list', async () => {
//     const user = userEvent.setup();

//     renderCreatepage();

//     await user.type(screen.getByLabelText('title.label'), 'New Physics Course');
//     await user.type(screen.getByLabelText('slug.label'), 'new-physics-course');
//     await user.type(
//       screen.getByLabelText('description.label'),
//       'A great course',
//     );

//     await user.click(screen.getByLabelText('studyArea.label'));
//     await user.click(
//       await screen.findByRole('option', {
//         name: 'Physics',
//       }),
//     );

//     await user.click(screen.getByRole('button', { name: /create course/i }));

//     expect(await screen.findByText('Course created')).toBeInTheDocument();
//     expect(await screen.findByText('Courses list page')).toBeInTheDocument();
//   });

//   it('shows backend error message and stays on the page when the server returns 400', async () => {
//     server.use(
//       http.post(`${env.apiUrl}/courses/`, () =>
//         HttpResponse.json(
//           {
//             slug: ['Slug already exists.'],
//           },
//           {
//             status: 400,
//           },
//         ),
//       ),
//     );

//     const user = userEvent.setup();

//     renderCreatepage();

//     await user.type(screen.getByLabelText('title.label'), 'Duplicate Course');
//     await user.type(screen.getByLabelText('slug.label'), 'existing-slug');
//     await user.type(screen.getByLabelText('description.label'), 'A course');
//     await user.click(screen.getByLabelText('studyArea.label'));
//     await user.click(await screen.findByRole('option', { name: 'Physics' }));
//     await user.click(screen.getByRole('button', { name: /create course/i }));

//     expect(
//       await screen.findByText('slug: Slug already exists.'),
//     ).toBeInTheDocument();

//     expect(screen.queryByText('Courses list page')).not.toBeInTheDocument();
//   });

//   it('prefills the form, updates the course, and navigates after save', async () => {
//     server.use(
//       http.get(COURSE_URL, () =>
//         HttpResponse.json(
//           {
//             id: 'course-123',
//             title: 'Original title',
//             description: 'Original description',
//             slug: 'original-slug',
//             study_area: {
//               id: 'area-1',
//               name: 'Physics',
//               slug: 'physics',
//             },
//             modules: [],
//             status: 'draft',
//             created_at: '2026-01-01T00:00:00Z',
//             updated_at: '2026-01-01T01:00:00Z',
//           },
//           {
//             status: 200,
//           },
//         ),
//       ),
//       http.put(COURSE_URL, async ({ request }) => {
//         const body = (await request.json()) as Course;
//         return HttpResponse.json({
//           ...body,
//           id: 'course-123',
//         });
//       }),
//     );

//     const user = userEvent.setup();

//     renderEditPage();

//     // check prefill
//     expect(
//       await screen.findByDisplayValue('Original title'),
//     ).toBeInTheDocument();

//     const titleInput = screen.getByLabelText('title.label');
//     await user.clear(titleInput);
//     await user.type(titleInput, 'Updated title');
//     await user.click(screen.getByRole('button', { name: /save changes/i }));

//     expect(await screen.findByText('Course updated')).toBeInTheDocument();
//     expect(await screen.findByText('Courses list page')).toBeInTheDocument();
//   });
// });
