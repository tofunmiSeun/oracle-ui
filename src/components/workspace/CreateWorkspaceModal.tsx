import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useApiClient } from "../../ApiClient";
import { useRouter } from "next/navigation";

type Props = {
    show: boolean
    handleClose: () => void
}

export default function CreateWorkspaceModal(props: Props) {
    const router = useRouter();

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const isSubmitButtonDisabled = React.useMemo(() => {
        return title.length < 3;
    }, [title]);

    const onWorkspaceCreated = (workspaceId: string) => {
        props.handleClose();
        router.push(`/workspace/${workspaceId}`);
    }
    const createWorkspaceApiClient = useApiClient<string>('post', '/workspace', onWorkspaceCreated);
    const { dispatch: createWorkspace } = createWorkspaceApiClient;

    const onSubmitButtonClicked = React.useCallback((e?: any) => {
        e?.preventDefault();
        createWorkspace({ title, description })
    }, [title, description, createWorkspace]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create new workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="createWorkspaceForm.title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Favourite coursework"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="createWorkspaceForm.description">
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