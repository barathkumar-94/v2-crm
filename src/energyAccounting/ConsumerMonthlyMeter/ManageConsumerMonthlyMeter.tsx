import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  usePageQueryParam,
  IRFData,
  TableCellEditorType,
  RFTabs,
  RFTabItem,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';



const actionInputs = [
    'id','site','meterid','metertype','assetid','assetname','status','takenby',
    'gencontrollerkwh','netreadingkwh','netreadingkvarh','date','time','generationperiod',
    'schemeDetail','attachmentgrid'];

    const onEnterEvent: IRFEventParams = {
        // input: ['companycode'],
        // moduleName: MASTER,
        // serviceName: 'ONENTER_CUSTOMER_ACCOUNT_MST',
      };
      
      const helpComponents = {
    
      };

const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'id',
        label: 'ID',
        required:true,
    //     event: onEnterEvent,
    // help: {
    //   panelTitle: 'Help On Customer Account',
    //   componentName: 'CustomerAccountHelp',
    //   receiveParams: [{parentField: 'customercode', childField: 'CUSTOMER_CODE'},
    //                   {parentField: 'customername', childField: 'CUSTOMER_NAME'},
    //                   {parentField: 'industry', childField: 'INDUSTRY'},
    //                   {parentField: 'ownership', childField: 'OWNERSHIP'},
    //                   {parentField: 'status', childField: 'STATUS'},
    //             ],
    //   event: onEnterEvent
    // }
      },
    {
    type: ControlType.TEXTBOX,
    name: 'customername',
    label: 'Customer Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'htsc',
    label: 'HTSC',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'timr',
    label: 'Time',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationperiod',
    label: 'Generation Period',
    masterField:'generationperiod'
  },
  
];

const ReadingDetailsSection: IControlDefinition[] = [
    {
    type: ControlType.DISPLAY,
    name: 'lastreading',
    label: 'Last Reading'
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingdate',
    label: 'Last Reading Date',
  },
  {
    type: ControlType.DISPLAY,
    name: 'lastreadingtime',
    label: 'Last Reading Time',
    format:HH_MM
  },
  {
    type: ControlType.TEXTBOX,
    name: 'currentreading',
    label: 'Current Reading',
  },
  {
    type: ControlType.DISPLAY,
    name: 'netreading',
    label: 'Net Reading',
  },
];


  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'schemeDetail',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4 
},
]   

  const attachmentSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'attachmentgrid',
      isPrimeReactTable: true,
      editorProps:{
        isEditable:true,
      },
      columns: [
        {
          title: 'Upload Document',
          dataField: 'UPLOAD_DOC',
          cellEditor: TableCellEditorType.TEXTBOX,        
        },
        {
          title: 'Remarks',
          dataField: 'REMARKS', 
          cellEditor: TableCellEditorType.TEXTBOX,
 
        },
    ],
},
  ] 
const actionBarButtons: IControlDefinition[] = [
   
    {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'create',
        label: 'Create',
        event: {
          serviceName: 'CREATE_CONSUMER_MONTHLY_METER_MST',
          moduleName: CRM_MASTER,
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',
        event: {
          serviceName: 'SAVE_CONSUMER_MONTHLY_METER__MST',
          moduleName: CRM_MASTER,
          input: [...actionInputs],
        },
      },
    
    
  ];
export const DataSection: IControlDefinition[] = [
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_CONSUMER_MONTHLY_METER_MST',
  moduleName: CRM_MASTER,
    input: ['']
};

export const ManageConsumerMonthlyMeter:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
        customercode:code,
        
      };


  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={ReadingDetailsSection} title={'Reading Details - KWH'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
