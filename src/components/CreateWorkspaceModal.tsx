import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Post } from "../ApiClient";
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

    const createWorkspace = React.useCallback((e?: any) => {
        e?.preventDefault();
        Post('/workspace', { title, description }).then((response) => {
            const workspaceId = response.data as string;
            props.handleClose();
            router.push(`/workspace/${workspaceId}`);
        })
    }, [title, description, props, router]);

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
                onClick={createWorkspace}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
}