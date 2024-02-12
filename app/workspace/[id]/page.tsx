'use client'

import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { useApiClient } from '@/src/ApiClient';
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import EditWorkspaceModal from '@/src/components/workspace/EditWorkspaceModal';
import ConfirmWorkspaceDeletionModal from '@/src/components/workspace/ConfirmWorkspaceDeletionModal';
import DatasourcesSection from '@/src/components/datasource/DatasourcesSection';
import { ArrowLeft, Pencil, Trash } from 'react-bootstrap-icons';
import WorkspaceChatView from '@/src/components/workspace/chat/WorkspaceChatView';

export default function Page() {
    const { id } = useParams();
    const [showEditWorkspaceModal, setShowEditWorkspaceModal] = React.useState(false);
    const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] = React.useState(false);

    const fetchWorkspaceDetailsApiClient = useApiClient<Workspace>('get', `/workspace/${id}`);
    const { data: workspace, dispatch: fetchWorkspaceDetails } = fetchWorkspaceDetailsApiClient;

    const hideEditWorkspaceModal = () => setShowEditWorkspaceModal(false);
    const hideDeleteWorkspaceModal = () => setShowDeleteWorkspaceModal(false);

    function onShowEditWorkspaceModalButtonClicked(e?: any) {
        e?.preventDefault();
        setShowEditWorkspaceModal(true);
    }

    function onShowDeleteWorkspaceModalButtonClicked(e?: any) {
        e?.preventDefault();
        setShowDeleteWorkspaceModal(true);
    }

    React.useEffect(() => {
        fetchWorkspaceDetails();
    }, [fetchWorkspaceDetails]);

    return <div>
        {workspace && <div>
            <div className='row g-0'>
                <div className="col-3 border-end overflow-scroll p-3"
                    style={{ height: 'calc(100vh - 46px)' }}>
                    <div className=''>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item cursor-pointer">
                                    <Link href='/'>
                                        <ArrowLeft />
                                        <span className='ms-1'>Home</span>
                                    </Link>
                                </li>
                            </ol>
                        </nav>

                        <div className='mb-4'>
                            <h4 className={`mb-2 text-3xl font-semibold`}>
                                <span className='me-3'>{workspace.title}</span>
                                <span className='me-2'>
                                    <Button variant="outline-secondary" size='sm'
                                        onClick={onShowEditWorkspaceModalButtonClicked}>
                                        <Pencil />
                                    </Button>
                                </span>
                                <span>
                                    <Button variant="outline-danger" size='sm'
                                        onClick={onShowDeleteWorkspaceModalButtonClicked}>
                                        <Trash />
                                    </Button>
                                </span>
                            </h4>

                            <p className={`m-0 text-sm opacity-50`}>
                                {workspace.description}
                            </p>
                        </div>
                    </div>

                    <div className='border-top mt-4 pt-4'>
                        <DatasourcesSection workspaceId={workspace.id} />
                    </div>
                </div>

                <div className='col'>
                    <WorkspaceChatView workspace={workspace} />
                </div>
            </div>

            <EditWorkspaceModal show={showEditWorkspaceModal}
                workspace={workspace}
                handleClose={hideEditWorkspaceModal}
                onWorkspaceEdited={fetchWorkspaceDetails} />

            <ConfirmWorkspaceDeletionModal workspaceId={workspace.id}
                show={showDeleteWorkspaceModal}
                handleClose={hideDeleteWorkspaceModal} />
        </div>
        }
    </div >;
}
