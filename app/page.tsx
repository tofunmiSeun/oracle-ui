'use client'

import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { Get } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';

export default function Home() {
  const [workspaces, setWorkspaces] = React.useState(Array<Workspace>())

  React.useEffect(() => {
    Get('/namespace').then((response: AxiosResponse) => {
      const data = response.data as Array<Workspace>
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title.toLowerCase()));
      setWorkspaces(sorted);
    });
  }, []);

  return (
    <main className="p-24">
      <div className="grid grid-cols-4 gap-4">
        {workspaces.map((w) => <div key={w.id}
          className="rounded-lg border border-transparent 
            px-5 py-4 transition-colors 
            hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 
            hover:dark:bg-neutral-800/30 cursor-pointer">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {w.title}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {w.description}
          </p>
        </div>
        )}
      </div>
    </main>
  );
}
