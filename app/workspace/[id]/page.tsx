'use client'

import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { Get } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import EditWorkspaceModal from '@/src/components/EditWorkspaceModal';
import ConfirmWorkspaceDeletionModal from '@/src/components/ConfirmWorkspaceDeletionModal';
import DatasourcesListView from '@/src/components/DatasourcesListView';
import { Pencil, Trash } from 'react-bootstrap-icons';

export default function Page() {
    const { id } = useParams();
    const [workspace, setWorkspace] = React.useState(undefined as Workspace | undefined)
    const [showEditWorkspaceModal, setShowEditWorkspaceModal] = React.useState(false);
    const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] = React.useState(false);

    const hideEditWorkspaceModal = () => setShowEditWorkspaceModal(false);
    const hideDeleteWorkspaceModal = () => setShowDeleteWorkspaceModal(false);

    const onShowEditWorkspaceModalButtonClicked = (e?: any) => {
        e?.preventDefault();
        setShowEditWorkspaceModal(true);
    }

    const onShowDeleteWorkspaceModalButtonClicked = (e?: any) => {
        e?.preventDefault();
        setShowDeleteWorkspaceModal(true);
    }

    const fetchWorkspaceDetails = React.useCallback(() => {
        Get(`/namespace/${id}`).then((response: AxiosResponse) => {
            const data = response.data as Workspace
            setWorkspace(data);
        });
    }, [id]);

    React.useEffect(() => {
        fetchWorkspaceDetails();
    }, [fetchWorkspaceDetails]);

    return <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item cursor-pointer">
                    <Link href='/'>
                        Home
                    </Link>
                </li>
            </ol>
        </nav>

        {workspace && <div>
            <div className='d-flex w-100 mb-5'>
                <div>
                    <h1 className={`mb-2 text-3xl font-semibold`}>
                        {workspace.title}
                    </h1>
                    <p className={`m-0 text-sm opacity-50`}>
                        {workspace.description}
                    </p>
                </div>

                <div className='ms-3 mt-2'>
                    <Stack direction="horizontal" gap={2}>
                        <Button variant="outline-primary" size='sm'
                            onClick={onShowEditWorkspaceModalButtonClicked}>
                            <Pencil />
                        </Button>

                        <Button variant="outline-danger" size='sm'
                            onClick={onShowDeleteWorkspaceModalButtonClicked}>
                            <Trash />
                        </Button>
                    </Stack>
                </div>
            </div>

            <DatasourcesListView workspaceId={workspace.id} />

            <EditWorkspaceModal show={showEditWorkspaceModal}
                workspace={workspace}
                handleClose={hideEditWorkspaceModal}
                onWorkspaceEdited={fetchWorkspaceDetails} />

            <ConfirmWorkspaceDeletionModal workspaceId={workspace.id}
                show={showDeleteWorkspaceModal}
                handleClose={hideDeleteWorkspaceModal} />
        </div>}
    </div>;
}
