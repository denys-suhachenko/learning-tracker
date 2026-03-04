const metrics = [
  {
    id: '1',
    title: 'Topics left today',
    value: '5',
    subvalue: 'from 8',
  },
  {
    id: '2',
    title: 'Active Courses',
    value: '3',
    subvalue: '',
  },
  {
    id: '3',
    title: 'Finished Courses',
    value: '12',
    subvalue: 'from 54',
  },
  {
    id: '4',
    title: 'This Week Progress',
    value: '66%',
  },
];

const DashboardPage = () => {
  return (
    <>
      <header>
        <div className="grid grid-cols-4 gap-0 divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300 bg-white text-gray-900 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
          {metrics.map((metric) => (
            <div key={metric.id} className="px-8 py-6">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {metric.title}
              </p>
              <p className="mt-2">
                <span className="mr-2 text-3xl font-semibold tracking-tight">
                  {metric.value}
                </span>
                {metric.subvalue && (
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {metric.subvalue}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </header>
    </>
  );
};

export default DashboardPage;
