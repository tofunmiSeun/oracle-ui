import React from "react"
import Button from 'react-bootstrap/Button';
import { Get } from '@/src/ApiClient';
import { Datasource } from "../../types/Datasource";
import { AxiosResponse } from 'axios';
import DatasourceTableRow from "./DatasourceTableRow";
import CreateDatasourceModal from "./CreateDatasourceModal";
import { FileEarmarkPlusFill } from "react-bootstrap-icons";

type Props = {
    workspaceId: string
}

export default function DatasourcesSection(props: Props) {
    const [datasources, setDatasources] = React.useState(Array<Datasource>());
    const [showCreateDatasourceModal, setShowCreateDatasourceModal] = React.useState(false);

    const hideCreateDatasourceModal = () => setShowCreateDatasourceModal(false);

    const onShowCreateDatasourceModalButtonClicked = (e?: any) => {
        e?.preventDefault();
        setShowCreateDatasourceModal(true);
    }

    const fetchDatasources = React.useCallback(() => {
        Get(`/datasource/${props.workspaceId}`).then((response: AxiosResponse) => {
            const data = response.data as Array<Datasource>
            setDatasources(data);
        });
    }, [props.workspaceId])

    React.useEffect(() => {
        fetchDatasources()
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

        <table className="table">
            <tbody>
                {datasources.map((d, i) => (<DatasourceTableRow key={d.id}
                    datasource={d}
                    handleDatasourceDeleted={fetchDatasources} />
                ))}
            </tbody>
        </table>

        <CreateDatasourceModal show={showCreateDatasourceModal}
            workspaceId={props.workspaceId}
            handleClose={hideCreateDatasourceModal}
            onDatasourceCreated={fetchDatasources} />
    </div>
}