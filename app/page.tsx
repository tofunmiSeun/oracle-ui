'use client'

import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { Get } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';
import WorkspaceCardView from '@/src/components/WorkspaceCardView';
import CreateWorkspaceModal from '@/src/components/CreateWorkspaceModal';

export default function Home() {
  const [workspaces, setWorkspaces] = React.useState(Array<Workspace>())
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = React.useState(false);

  const hideCreateWorkspaceModal = () => setShowCreateWorkspaceModal(false);

  const onShowWorkspaceModalButtonClicked = (e?: any) => {
    e?.preventDefault();
    setShowCreateWorkspaceModal(true);
  }

  React.useEffect(() => {
    Get('/namespace').then((response: AxiosResponse) => {
      const data = response.data as Array<Workspace>
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title.toLowerCase()));
      setWorkspaces(sorted);
    });
  }, []);

  return (
    <>
      <div className='d-flex flex-column mb-4'>
        <p className="h1 mb-0">Workspaces</p>
        <div className='mt-2'>
          <button type="button" className="btn btn-primary btn-sm"
            onClick={onShowWorkspaceModalButtonClicked}>
            New workspace
          </button>
        </div>
      </div>

      <div className="row g-4">
        {workspaces.map((w) => <WorkspaceCardView key={w.id} workspace={w} />)}
      </div>

      <CreateWorkspaceModal show={showCreateWorkspaceModal}
        handleClose={hideCreateWorkspaceModal} />
    </>
  );
}
