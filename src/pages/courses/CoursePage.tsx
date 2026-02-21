import { NoteEditor } from '@/widgets';

const CoursePage = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div className="text-2xl leading-9 font-semibold text-gray-900">
          Number theory
        </div>
      </div>

      <NoteEditor />
    </>
  );
};

export default CoursePage;
