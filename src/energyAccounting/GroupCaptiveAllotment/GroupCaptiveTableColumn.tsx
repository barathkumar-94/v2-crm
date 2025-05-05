import {TableCellRendererType, TableColDef} from '@retina360-ai/core-ui-library-v2';
import {Dictionary} from 'lodash';

const HeaderName = 'Allocation Details';

export const TableColumn: Dictionary<TableColDef[]> = {
  [HeaderName]: [
    {
      title: 'Asset ID',
      dataField: 'ASSET_ID',
      cellRenderer: TableCellRendererType.DYNAMIC_CONTROL,
      conditionalControls: [
        {
          canRenderControl: () => true,
          control: {
            dataField: 'ASSET_ID',
            cellRenderer: TableCellRendererType.BUTTON,
            cellRendererParams: {
              iconName: 'Edit',
              iconTooltipText: 'Click here to update banking details',
              event: {
                openModal: true,
                modalProps: {
                  title: 'Update Banking Details',
                  componentName: 'UpdateBankingDetails',
                  sendParams: [
                    {parentField: 'generationyear', parentSource: 'page', childField: 'generationyear'},
                    {parentField: 'generationPeriod', parentSource: 'page', childField: 'generationPeriod'},
                    {parentField: 'site', parentSource: 'page', childField: 'site'},
                    {
                      parentField: `('${HeaderName}', 'ASSET_ID')`,
                      parentSource: 'rowData',
                      childField: 'ASSET_ID',
                    },
                  ],
                  receiveParams: [
                    {parentField: 'BankingDetails', childField: 'BankingDetails'},
                    {parentField: 'BankingDetails_columns', childField: 'BankingDetails_columns'},
                    {parentField: 'ClosingBankingUnits',childField: 'ClosingBankingUnits'},
                    {parentField: 'OpeningBankingUnitsGrid',childField: 'OpeningBankingUnitsGrid'},
                    {parentField: 'ReturnBankingUnitsGrid',childField: 'ReturnBankingUnitsGrid'},
                    {parentField: 'CreditUsedGrid',childField: 'CreditUsedGrid'},
                    {parentField: 'ClosingBankingUnitGrid',childField: 'ClosingBankingUnitGrid'},
                    {parentField: 'GenerationNetEnergyGrid',childField: 'GenerationNetEnergyGrid'},
                    {parentField: 'ConsumptionGrid',childField: 'ConsumptionGrid'},
                    {parentField: 'ExcessEnergyGrid',childField: 'ExcessEnergyGrid'}
                  ],
                },
              },
            },
          },
        },
        {
          canRenderControl: () => true,
          control: {
            dataField: 'ASSET_ID',
            cellRenderer: TableCellRendererType.TEXT,
          },
        },
      ],
    },
    {
      title: 'Asset Name',
      dataField: 'ASSET_NAME',
    },
  ],
};
