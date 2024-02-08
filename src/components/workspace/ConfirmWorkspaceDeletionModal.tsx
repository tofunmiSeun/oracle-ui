import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Delete } from "../../ApiClient";
import { useRouter } from "next/navigation";

type Props = {
    workspaceId: string
    show: boolean
    handleClose: () => void
}

export default function ConfirmWorkspaceDeletionModal(props: Props) {
    const router = useRouter();

    const deleteWorkspace = React.useCallback((e?: any) => {
        e?.preventDefault();
        Delete(`/workspace/${props.workspaceId}`).then(() => {
            props.handleClose();
            router.back();
        })
    }, [props, router]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Delete workspace?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" size="sm" onClick={deleteWorkspace}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
}