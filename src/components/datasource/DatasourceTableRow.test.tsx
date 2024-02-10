import React from 'react';
import { render } from '@testing-library/react';
import DatasourceTableRow from "./DatasourceTableRow";
import { Datasource } from '@/src/types/Datasource';

describe('DatasourceTableRow', () => {
    test('shows table rows information correctly', async () => {
        const datasource: Datasource = {
            id: 'datasource_123',
            workspace_id: 'workspace-id',
            website: 'example.website.com'
        };
        const handleDatasourceDeleted = () => { return };

        const { getByTestId } = render(<DatasourceTableRow datasource={datasource}
            handleDatasourceDeleted={handleDatasourceDeleted} />);

        const messageElement = getByTestId(/datasource_123_website/i);
        expect(messageElement).toBeTruthy();
    });
});