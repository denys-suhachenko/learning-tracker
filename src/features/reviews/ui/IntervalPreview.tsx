const IntervalPreview = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="font-medium">
        <span className="text-red-600">Again:</span> 10 min
      </div>
      <div className="font-medium">
        <span className="text-orange-600">Hard:</span> 1 day
      </div>
      <div className="font-medium">
        <span className="text-green-600">Good:</span> 2 days
      </div>
      <div className="font-medium">
        <span className="text-blue-600">Easy:</span> 5 days
      </div>
    </div>
  );
};

export default IntervalPreview;
