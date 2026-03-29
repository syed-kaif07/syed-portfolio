import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main className="mx-auto max-w-content px-l">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;