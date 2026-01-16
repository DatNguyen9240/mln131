"use client";

import { ReactNode } from "react";

interface GameLayoutProps {
  header?: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}

export function GameLayout({ header, sidebar, children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {header && <div className="flex-shrink-0">{header}</div>}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1800px] mx-auto w-full">
        {/* Sidebar - Fixed on desktop, collapsible on mobile */}
        <aside className="lg:w-80 xl:w-96 lg:sticky lg:top-0 lg:h-[calc(100vh-60px)] lg:overflow-y-auto border-r border-border bg-card/50">
          <div className="p-4 lg:p-6 space-y-6">
            {sidebar}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:overflow-y-auto">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
