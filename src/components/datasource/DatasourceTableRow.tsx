import React from 'react'
import { Datasource } from '../../types/Datasource';
import Button from 'react-bootstrap/Button';
import ConfirmDatasourceDeletionModal from './ConfirmDatasourceDeletionModal';
import { Trash } from 'react-bootstrap-icons';

type Props = {
    datasource: Datasource
    handleDatasourceDeleted: () => void
}

export default function DatasourceTableRow(props: Props) {
    const datasource = props.datasource;

    const [showDeleteDatasourceModal, setShowDeleteDatasourceModal] = React.useState(false);
    const hideDeleteDatasourceModal = () => setShowDeleteDatasourceModal(false);

    const onShowDeleteDatasourceModalButtonClicked = (e?: any) => {
        e?.preventDefault();
        setShowDeleteDatasourceModal(true);
    }

    return (
        <>
            <tr>
                <td>
                    <a className='text-break' href={datasource.website} target='blank'>
                        {datasource.website}
                    </a>
                </td>
                <td>
                    <Button variant="outline-danger" size='sm'
                        onClick={onShowDeleteDatasourceModalButtonClicked}>
                        <Trash />
                    </Button>
                </td>
            </tr>

            <ConfirmDatasourceDeletionModal datasourceId={datasource.id}
                show={showDeleteDatasourceModal}
                handleClose={hideDeleteDatasourceModal}
                handleDatasourceDeleted={props.handleDatasourceDeleted} />
        </>
    );
}
