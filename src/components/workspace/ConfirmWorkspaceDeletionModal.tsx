import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useApiClient } from "../../ApiClient";
import { useRouter } from "next/navigation";

type Props = {
    workspaceId: string
    show: boolean
    handleClose: () => void
}

export default function ConfirmWorkspaceDeletionModal(props: Props) {
    const router = useRouter();

    const onWorkspaceDeleted = () => {
        props.handleClose();
        router.back();
    }

    const { dispatch: deleteWorkspace } = useApiClient('delete',
        `/workspace/${props.workspaceId}`,
        onWorkspaceDeleted);

    const onSubmitButtonClicked = React.useCallback((e?: any) => {
        e?.preventDefault();
        deleteWorkspace()
    }, [deleteWorkspace]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Delete workspace?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" size="sm" onClick={onSubmitButtonClicked}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
}