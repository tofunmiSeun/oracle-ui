import React from 'react'
import { Datasource } from '../types/Datasource';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ConfirmDatasourceDeletionModal from './ConfirmDatasourceDeletionModal';

type Props = {
    datasource: Datasource
    handleDatasourceDeleted: () => void
}

export default function DatasourceCardView(props: Props) {
    const datasource = props.datasource;

    const [showDeleteDatasourceModal, setShowDeleteDatasourceModal] = React.useState(false);
    const hideDeleteDatasourceModal = () => setShowDeleteDatasourceModal(false);

    const onShowDeleteDatasourceModalButtonClicked = (e?: any) => {
        e?.preventDefault();
        setShowDeleteDatasourceModal(true);
    }

    return (
        <div key={datasource.id} className="col-lg-4 ">
            <div className='border border-1 border-secondary rounded rounded-1 p-3'>
                <a href={datasource.website} target='blank'>
                    {datasource.website}
                </a>

                <div className='d-flex w-100'>
                    <div className='ms-auto'>
                        <Stack direction="horizontal" gap={2}>
                            <Button variant="outline-danger" size='sm'
                                onClick={onShowDeleteDatasourceModalButtonClicked}>
                                Delete
                            </Button>
                        </Stack>
                    </div>
                </div>

                <ConfirmDatasourceDeletionModal datasourceId={datasource.id}
                    show={showDeleteDatasourceModal}
                    handleClose={hideDeleteDatasourceModal}
                    handleDatasourceDeleted={props.handleDatasourceDeleted} />
            </div>
        </div>
    );
}
