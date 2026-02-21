import NoteEditor from '@/widgets/NoteEditor/NoteEditor';

const KnowledgeBasePage = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl leading-9 font-semibold text-gray-900">
          Knowledge Base
        </h1>
      </div>

      <NoteEditor />
    </>
  );
};

export default KnowledgeBasePage;
