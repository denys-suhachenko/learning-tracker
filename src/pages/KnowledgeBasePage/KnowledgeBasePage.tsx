import { Container, PageHeader } from '@/shared/ui';

const baseItems = [
  {
    id: '1',
    title: 'React.memo pitfalls',
    subtitle: 'Senior React Interview - Performance optimization',
    description:
      'Explanation of React.memo, common mistakes, and best practices for performance optimization.',
  },
  {
    id: '2',
    title: 'How does the JavaScript event loop work?',
    subtitle: 'JavaScript Fundamentals - Async Programming',
    description: 'Explanation of JavaScript event loop.',
  },
];

const KnowledgeBasePage = () => {
  return (
    <>
      <PageHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl leading-9 font-semibold">Knowledge base</div>
        </div>
      </PageHeader>

      <Container>
        <div className="mb-4 flex items-center justify-between text-sm">
          <div>8 results &bull; 42 total</div>
          <div>
            <span className="font-medium">Sort by:</span> relevance
          </div>
        </div>

        <div className="mb-4 divide-y divide-gray-300 rounded-md bg-white shadow-sm outline outline-gray-200 dark:divide-gray-700 dark:bg-gray-800 dark:outline-gray-700">
          {baseItems.length ? (
            baseItems.map((item) => (
              <div key={item.id} className="p-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-white/75">
                  {item.subtitle}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-white/60">
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 text-sm font-medium text-gray-500 dark:text-white/75">
              No data
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default KnowledgeBasePage;
