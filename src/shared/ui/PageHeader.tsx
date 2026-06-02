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
    <header className="relative">
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h1 className="text-3xl leading-9 font-semibold -tracking-wide">
            {title}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>

        {actions}
      </div>
    </header>
  );
};
