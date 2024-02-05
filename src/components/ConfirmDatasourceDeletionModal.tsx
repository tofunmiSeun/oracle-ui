import React from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Delete } from "../ApiClient";

type Props = {
    datasourceId: string
    show: boolean
    handleClose: () => void
    handleDatasourceDeleted: () => void
}

export default function ConfirmDatasourceDeletionModal(props: Props) {
    const deleteDatasource = React.useCallback((e?: any) => {
        e?.preventDefault();
        Delete(`/datasource/${props.datasourceId}`).then(() => {
            props.handleClose();
            props.handleDatasourceDeleted()
        })
    }, [props]);

    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Delete datasource?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" size="sm" onClick={deleteDatasource}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
}