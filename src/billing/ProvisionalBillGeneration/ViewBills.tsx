import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_BILLING, CRM_ENERGY_ACCOUNTING, CRM_MASTER, DATE_FORMAT } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
import { RFFooter } from '../../common/components/footer';


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'viewBills',
    isPrimeReactTable: true,
    editorProps: {
    isEditable: false,
    hideRowDuplicate:true,
    enableBulkUpload:true,
    bulkUploadTemplateFileName:"Bulk_upload_billing_internal_ref.xls"
},
    columns: [
      {
        title: 'Batch Id',
        dataField: 'BATCH_ID',
        hidden:true,
      },
      {
        title: 'Bill #',
        dataField: 'BILL_ID',
        cellRenderer: TableCellRendererType.TEXT,
        cellRendererParams: {
            event: {
                  linkTo: '/ManageProvisionalBill',
                  queryParams: [{ sourceField: 'BILL_ID', targetField: "code" }]
                }
         } 
      },

      {
        title: 'Bill Reference#',
        dataField: 'BILL_REF',
        cellEditor: TableCellEditorType.TEXTBOX,
       
        
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

const actionInputs = ['viewBills'];


  const actionBarButtons: IControlDefinition[] = [


    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_BULK_UPLOAD_BILLING_REFNO',
        moduleName: CRM_BILLING,
         input: [...actionInputs],
      },
    }
]

// const toolbarControls: IControlDefinition[] = [
//     {
//       type: ControlType.BUTTON,
//       name: 'managebtn',
//       isPrimary: true,
//     //   iconName:'Circleplus',
//       label: 'Provisional Bill Generation',
//       event: {
//         linkTo: '/ProvisionalBillGeneration',
        
//       },
//     },
//   ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'RCRM_VIEWBILL_PROVISIONAL_BILL',
  moduleName: CRM_BILLING,
  input: ['BATCH_ID']
};

export const ProvisionalViewBills:React.FC<IPageBaseProps> = (props) => {
  const {code} = usePageQueryParam();
 
 
  const initialData: IRFData = {
    BATCH_ID:code

    };
  return (
    <RetinaFormBuilder  initialValues={initialData} scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'}>
             <RFCRMToolbar hasBackButton/>

      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={tableSection}  title={'View Bills'}  columns={1} className={'table-absolute-toolbar'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
};
