import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useApiClient } from "../../ApiClient";

type Props = {
    datasourceId: string
    show: boolean
    handleClose: () => void
    handleDatasourceDeleted: () => void
}

export default function ConfirmDatasourceDeletionModal(props: Props) {
    const onDatasourceDeleted = () => {
        props.handleClose();
        props.handleDatasourceDeleted()
    }

    const { dispatch: deleteDatasource } = useApiClient('delete',
        `/datasource/${props.datasourceId}`,
        onDatasourceDeleted);

    const onSubmitButtonClicked = React.useCallback((e?: any) => {
        e?.preventDefault();
        deleteDatasource();
    }, [deleteDatasource]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Delete datasource?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" size="sm" onClick={onSubmitButtonClicked}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
}