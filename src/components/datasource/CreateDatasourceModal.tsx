import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useApiClient } from "../../ApiClient";

type Props = {
    show: boolean
    workspaceId: string
    handleClose: () => void
    onDatasourceCreated: () => void
}

export default function CreateDatasourceModal(props: Props) {
    const [website, setWebsite] = React.useState('');

    const isSubmitButtonDisabled = React.useMemo(() => {
        const urlPattern =
            /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

        return !urlPattern.test(website);
    }, [website]);

    const onDatasourceCreated = () => {
        props.handleClose();
        props.onDatasourceCreated();
    }

    const { dispatch: createDatasource } = useApiClient<void>('post', '/datasource', onDatasourceCreated)

    const onSubmitButtonClicked = React.useCallback((e?: any) => {
        e?.preventDefault();

        const requestBody = { workspace_id: props.workspaceId, website }
        createDatasource(requestBody);

    }, [website, props, createDatasource]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create new datasource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="createDatasourceForm.website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)} />
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