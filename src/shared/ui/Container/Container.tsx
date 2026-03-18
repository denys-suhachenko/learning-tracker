type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => (
  <div className="h-full px-8 py-6">{children}</div>
);
