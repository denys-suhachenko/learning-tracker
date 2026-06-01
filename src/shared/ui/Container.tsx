type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => (
  <div className="min-h-full p-8">{children}</div>
);
