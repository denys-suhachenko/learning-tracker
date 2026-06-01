type PageHeaderProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export const PageHeader = ({
  title,
  description,
  actions,
}: PageHeaderProps) => {
  return (
    <header className="relative border-b border-gray-200/70 bg-white shadow-xs">
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h1 className="text-3xl leading-9 font-semibold">{title}</h1>
          <p className="mt-2 text-base font-medium text-gray-500">
            {description}
          </p>
        </div>

        {actions}
      </div>
    </header>
  );
};
