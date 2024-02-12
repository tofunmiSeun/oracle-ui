import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useApiClient } from "../../ApiClient";
import { Workspace } from "../../types/Workspace";

type Props = {
    workspace: Workspace
    show: boolean
    handleClose: () => void
    onWorkspaceEdited: () => void
}

export default function EditWorkspaceModal(props: Props) {
    const [title, setTitle] = React.useState(props.workspace.title);
    const [description, setDescription] = React.useState(props.workspace.description);

    const isSubmitButtonDisabled = React.useMemo(() => {
        const titleTooShort = title.trim().length < 3;

        const noDetailsUpdated = title.trim() === props.workspace.title.trim() &&
            description.trim() === props.workspace.description.trim()

        return titleTooShort || noDetailsUpdated;

    }, [title, description, props.workspace]);

    const onWorkspaceEdited = () => {
        props.handleClose();
        props.onWorkspaceEdited();
    }

    const { dispatch: editWorkspace } = useApiClient('post', `/workspace/${props.workspace.id}`, onWorkspaceEdited);

    const onSubmitButtonClicked = React.useCallback((e?: any) => {
        e?.preventDefault();
        editWorkspace({ title, description })
    }, [title, description, editWorkspace]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit workspace details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="editWorkspaceForm.title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Favourite coursework"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="editWorkspaceForm.description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" size="sm"
                disabled={isSubmitButtonDisabled}
                onClick={onSubmitButtonClicked}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
}