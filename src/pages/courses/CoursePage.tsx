import { NoteEditor } from '@/widgets';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router';

const CoursePage = () => {
  return (
    <>
      <div className="mb-8 flex items-center">
        <Link to="/courses">
          <ArrowLeftIcon className="mr-4 size-6" />
        </Link>

        <div className="text-2xl leading-9 font-semibold">Number theory</div>
      </div>

      <NoteEditor />
    </>
  );
};

export default CoursePage;
