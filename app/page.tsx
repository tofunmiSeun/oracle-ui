'use client'

import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { Get } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';
import CreateWorkspaceModal from '@/src/components/workspace/CreateWorkspaceModal';
import Button from 'react-bootstrap/Button';
import { BoxArrowInUpRight, FolderPlus } from 'react-bootstrap-icons';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [workspaces, setWorkspaces] = React.useState(Array<Workspace>())
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = React.useState(false);

  const hideCreateWorkspaceModal = () => setShowCreateWorkspaceModal(false);

  const onShowWorkspaceModalButtonClicked = (e?: any) => {
    e?.preventDefault();
    setShowCreateWorkspaceModal(true);
  }

  const viewWorkspace = (workspace: Workspace, e?: any) => {
    e?.preventDefault();
    router.push(`/workspace/${workspace.id}`);
  };

  React.useEffect(() => {
    Get('/workspace').then((response: AxiosResponse) => {
      const data = response.data as Array<Workspace>
      const sorted = data.sort((a, b) => a.title.localeCompare(b.title.toLowerCase()));
      setWorkspaces(sorted);
    });
  }, []);

  return (
    <div className='px-5 py-4'>
      <div className='d-flex flex-column mb-2'>
        <p className="h1 mb-0">Workspaces</p>
        <div className='mt-2'>
          <Button variant="primary" size='sm'
            onClick={onShowWorkspaceModalButtonClicked}>
            <FolderPlus />
            <span className='ms-2'>Add</span>
          </Button>
        </div>
      </div>

      <div className='w-75'>
        <table className="table">
          <tbody>
            {workspaces.map((w) => <tr key={w.id}>
              <td>
                <span>{w.title}
                  <span className='ms-3'><Button variant="outline-secondary" size='sm'
                    onClick={(e) => viewWorkspace(w, e)}>
                    <BoxArrowInUpRight />
                  </Button></span>
                </span>
              </td>
              <td>
                <p className={`small m-0 text-sm opacity-50`}>
                  {w.description}
                </p>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>

      <CreateWorkspaceModal show={showCreateWorkspaceModal}
        handleClose={hideCreateWorkspaceModal} />
    </div>
  );
}
