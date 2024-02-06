import React from "react"
import Button from 'react-bootstrap/Button';
import { Get } from '@/src/ApiClient';
import { Datasource } from "../types/Datasource";
import { AxiosResponse } from 'axios';
import DatasourceCardView from "./DatasourceCardView";
import CreateDatasourceModal from "./CreateDatasourceModal";
import { FileEarmarkPlus } from "react-bootstrap-icons";

type Props = {
    workspaceId: string
}

export default function DatasourcesListView(props: Props) {
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
        <div className="d-flex flex-column mb-4">
            <p className="h4">Datasources</p>
            <div>
                <Button variant="secondary" size='sm'
                    onClick={onShowCreateDatasourceModalButtonClicked}>
                    <FileEarmarkPlus />
                    <span className="ms-2">Add datasource</span>
                </Button>
            </div>
        </div>

        <div className="row g-4">
            {datasources.map((d) => <DatasourceCardView key={d.id} datasource={d}
                handleDatasourceDeleted={fetchDatasources} />)}
        </div>

        <CreateDatasourceModal show={showCreateDatasourceModal}
            workspaceId={props.workspaceId}
            handleClose={hideCreateDatasourceModal}
            onDatasourceCreated={fetchDatasources} />
    </div>
}