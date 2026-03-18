type SpinnerProps = {
  size?: number;
  borderWidth?: number;
};

export const Spinner = ({ size = 24, borderWidth = 4 }: SpinnerProps) => (
  <div className="flex justify-center">
    <div
      className={`animate-spin rounded-full border-${borderWidth} border-gray-300 border-t-gray-900 dark:border-gray-500 dark:border-t-gray-300`}
      style={{ width: size, height: size }}
    />
  </div>
);
