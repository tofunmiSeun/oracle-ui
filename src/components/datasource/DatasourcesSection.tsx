import React from "react"
import Button from 'react-bootstrap/Button';
import { useApiClient } from '@/src/ApiClient';
import { Datasource } from "../../types/Datasource";
import DatasourceTableRow from "./DatasourceTableRow";
import CreateDatasourceModal from "./CreateDatasourceModal";
import { FileEarmarkPlusFill } from "react-bootstrap-icons";

type Props = {
    workspaceId: string
}

export default function DatasourcesSection(props: Props) {
    const [showCreateDatasourceModal, setShowCreateDatasourceModal] = React.useState(false);

    const onShowCreateDatasourceModalButtonClicked = (e?: any) => {
        e?.preventDefault();
        setShowCreateDatasourceModal(true);
    }
    const hideCreateDatasourceModal = () => setShowCreateDatasourceModal(false);

    const { data: datasources, dispatch: fetchDatasources } = useApiClient<Array<Datasource>>('get', `/datasource/${props.workspaceId}`);

    React.useEffect(() => {
        fetchDatasources();
    }, [fetchDatasources]);

    return <div>
        <div className="d-flex">
            <p className="h4">Datasources</p>
            <div className="ms-2">
                <Button variant="outline-secondary" size='sm'
                    onClick={onShowCreateDatasourceModalButtonClicked}>
                    <FileEarmarkPlusFill />
                </Button>
            </div>
        </div>

        {datasources && <table className="table">
            <tbody>
                {datasources.map((d, i) => (<DatasourceTableRow key={d.id}
                    datasource={d}
                    handleDatasourceDeleted={fetchDatasources} />
                ))}
            </tbody>
        </table>}

        <CreateDatasourceModal show={showCreateDatasourceModal}
            workspaceId={props.workspaceId}
            handleClose={hideCreateDatasourceModal}
            onDatasourceCreated={fetchDatasources} />
    </div>
}