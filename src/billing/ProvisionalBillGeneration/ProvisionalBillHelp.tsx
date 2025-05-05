import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_BILLING, DATE_FORMAT } from '../../common/constants';

const tableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'viewBills',
      isHelpTable: true,
      filter:true,
      columns: [
        {
          title: 'Batch Id',
          dataField: 'BATCH_ID',
          hidden:true,
        },
        {
          title: 'Bill #',
          dataField: 'BILL_ID',
        },
        {
          title: 'Bill Date',
          dataField: 'BILL_DATE',
          dataType :'dateTime',
                cellRenderer:TableCellRendererType.TEXT,
                cellRendererParams:{
                  format:DATE_FORMAT,
                },
          
        },
        {
          title: 'Bill Status',
          dataField: 'BILL_STATUS',
          
        },
        {
          title: 'Bill Category',
          dataField: 'BILL_CATEGORY',
          
        },
        {
          title: 'Bill Type',
          dataField: 'BILL_TYPE',
          
        },
        {
          title: 'Financial Year',
          dataField: 'FINANCIAL_YEAR',
          
        },
        {
          title: 'Billing Period',
          dataField: 'BILLING_PERIOD',
           
        },
        {
          title: 'Generation Period',
          dataField: 'GENERATION_PERIOD',
          
        },
        {
          title: 'PPA #',
          dataField: 'PPA',
          
        },
        {
          title: 'SBU',
          dataField: 'SBU',
          
        },
        {
          title: 'Scheme',
          dataField: 'SCHEME',
          
        },
        {
          title: 'Customer',
          dataField: 'CUSTOMER',
          
        },
        {
          title: 'HTSC #',
          dataField: 'HTSC',
          
        },
        {
          title: 'DISCOM',
          dataField: 'DISCOM',
          
        },
        // {
        //   title: 'UOM',
        //   dataField: 'UOM',
        // },
        // {
        //   title: 'Units',
        //   dataField: 'UNITS',
        // },
        // {
        //   title: 'Rate',
        //   dataField: 'RATE',
        // },
        {
          title: 'Value',
          dataField: 'VALUE',
        },
      ],
    },
  ];
  


const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_VIEWBILL_PROVISIONAL_BILL',
  moduleName: CRM_BILLING,
  input: ['BATCH_ID']
};

export const ProvisionalBillHelp:React.FC<IPageBaseProps> = (props) => {
    return (
      <RetinaFormBuilder initialValues={props} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
        <ScrollabeContainer hasHeader={true}>
          <RFSection controls={tableSection}  columns={1} />
        </ScrollabeContainer>
      </RetinaFormBuilder>
    );
  };
