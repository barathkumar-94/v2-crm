 
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
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { CRM_ENERGY_ACCOUNTING, DATE_FORMAT, DATE_TIME_FORMAT, HH_MM } from '../../../common/constants';
import { IPageBaseProps } from '../../../common/objects';
import { RFCRMToolbar } from '../../../common/components/toolbar';
import { RFFooter } from '../../../common/components/footer';
import { CustomerAccountHelp } from '../../CustomerAccount/CustomerAccountHelp';
import { Helpldcdata } from './Helpldcdata';



const actionInputs =[
  'id','customercode','Customer Code','customername','htsc','date','time','assetid','assetname','generationyear','generationPeriod','perofshare','netenergykWhmonth',
 'Net Energy (kWh)','netkvarhmonth','netkvahmonth','netenergykwhtodmonth','mf_exp_kwh','lastreadingExp_kwh','lastreadingdateexp_kwh',
 'lastreadingtimeExp_kwh','currentreadingexp_kwh','netreadingExp_kwh','powerfactorExp_kwh','voltageExp_kwh','mf_exp_kvarh','lastreadingExp_kvarh','lastreadingdateExp_kvarh','currentreadingExp_kvarh','netreadingExp_kvarh','lastreadingtimeExp_kvarh',
 'voltageExp_kvarh',
'powerfactorExp_kvarh','Voltage','mf_imp_kwh','lastreadingImp_kwh','lastreadingdateexp_kwh','lastreadingtimeImp_kwh','currentreadingImp_kwh','netreadingImp_kwh','powerfactorImp_kwh','voltageImp_kwh',
'mf_imp_kvarh','lastreadingImp_kvarh','lastreadingdateImp_kvarh','lastreadingtimeImp_kvarh','currentreadingImp_kvarh','netreadingImp_kvarh','powerfactorImp_kvarh','voltageImp_kvarh','notes','exportGrid','importGrid','attachmentgrid','strCreatedBy',
'strModifiedBy','dtModifiedDate','dtCreatedDate','ldcexportGrid','ldcimportGrid', 'NET_READING_EXP', 'NET_READING_IMP','attachmentldcgrid'];
 
    const onEnterEvent: IRFEventParams = {
        input: ['id'],
        moduleName: CRM_ENERGY_ACCOUNTING,
        serviceName: 'RCRM_ONENTER_LDC_DATA_MST',
      };
     
      const helpComponents = {
        Helpldcdata:Helpldcdata,
        CustomerAccountHelp:CustomerAccountHelp
      };
 
const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'id',
        label: 'ID',
        required:true,
        event: onEnterEvent,
        help: {
          panelTitle: 'Help On LDC Data',
          componentName: 'Helpldcdata',
          receiveParams: [{parentField: 'id',                childField: 'id'},
                   ],
          event: onEnterEvent
        }
   
      },
      {
        type: ControlType.TEXTBOX,
        name: 'customercode',
        label: 'Customer Code',
        integerLength:20,
        event :{
          serviceName:'RCRM_CUSTOMER_NAME_ONCHANGE',
          moduleName :CRM_ENERGY_ACCOUNTING,
          input:['customercode']
          },
        help: {
          panelTitle: 'Help On Customer Account',
          componentName: 'CustomerAccountHelp',
          receiveParams: [{parentField: 'customercode', childField: 'CUSTOMER_CODE'},
                    ],
          event :{
            serviceName:'RCRM_CUSTOMER_NAME_ONCHANGE',
            moduleName :CRM_ENERGY_ACCOUNTING,
            input:['customercode']
            },
        },
        
        required:true,
       
      },
      {
        type: ControlType.DISPLAY,
        name: 'customername',
        label: 'Customer Name',
      },
      {
        type: ControlType.COMBOBOX,
        name: 'htsc',
        label: 'HT SC#',
        masterField:'htsc',
        required:true,
       
      },
  
  {
    type: ControlType.DATEPICKER,
    name: 'date',
    label: 'Date',
    required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TIMEPICKER,
    name: 'time',
    label: 'Time',
    required:true
    
  },
  /*
  {
    type: ControlType.COMBOBOX,
    name: 'site',
    label: 'Site',
    masterField:'site',
    required:true,
    event :{
      serviceName:'RCRM_MONTHLYMETER_ONCHANGE_ASSET',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['site']
      }
  },
  */
  {
    type: ControlType.COMBOBOX,
    name: 'assetid',
    label: 'Asset ID',
    required:true,
    event :{
      serviceName:'RCRM_LDC_ONCHANGE_ASSET',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['assetid']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'assetname',
    label: 'Asset Name'
   
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationyear',
    label: 'Generation Year',
    masterField:'generationyear',
    required:true,
    event :{
      serviceName:'RCRM_GENERATION_YEAR_ONCHANGE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationyear']
      }
  },
  {
    type: ControlType.COMBOBOX,
    name: 'generationPeriod',
    label: 'Generation Period',
    masterField:'generationPeriod',
    required:true,
    event :{
      serviceName:'RCRM_LDC_DATA_ONCHANGE_DATE',
      moduleName :CRM_ENERGY_ACCOUNTING,
      input:['generationPeriod','assetid']
      }
  },
  {
    type: ControlType.DISPLAY,
    name: 'perofshare',
    label: '% of Share'
  }
];
const MonthlySection: IControlDefinition[] = [
{
  type: ControlType.DISPLAY,
    name: 'netenergykWhmonth',
    label: 'Net Energy (kWh)'
},
{
  type: ControlType.DISPLAY,
    name: 'netkvarhmonth',
    label: 'Net kVARh'
},
{
  type: ControlType.DISPLAY,
    name: 'netkvahmonth',
    label: 'Net kVAh'
},
{
  type: ControlType.DISPLAY,
    name: 'netenergykwhtodmonth',
    label: 'Net Energy (kWh) (TOD)'
}

];

const ExportReadingKWHSection: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'mf_exp_kwh',
  label: 'MF',

},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingExp_kwh',
  label: 'Last Reading',
},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingdateexp_kwh',
  label: 'Last Reading Date',
  format:DATE_FORMAT
},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingtimeExp_kwh',
  label: 'Last Reading Time',
  format:HH_MM
},
{
  type: ControlType.TEXTBOX,
  name: 'currentreadingexp_kwh',
  label: 'Current Reading',
  inputType:"number",
  required:true,
  onBlurEvent:
  {
    moduleName: CRM_ENERGY_ACCOUNTING,
   serviceName: 'LDC_EXPORT_KWH_NETREADING_ONENTER',
   input:['currentreadingexp_kwh','lastreadingExp_kwh','mf_exp_kwh']
 },
  event :{
    serviceName:'LDC_EXPORT_KWH_NETREADING_ONENTER',
    moduleName :CRM_ENERGY_ACCOUNTING,
    input:['currentreadingexp_kwh','lastreadingExp_kwh','mf_exp_kwh']
    }
},
{
  type: ControlType.DISPLAY,
  name: 'netreadingExp_kwh',
  label: 'Net Reading',
 // inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'powerfactorExp_kwh',
  label: 'Power Factor',
  inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'voltageExp_kwh',
  label: 'Voltage',
  inputType:"number",

}

];

const ExportReadingKVARHSection: IControlDefinition[] = [
  {
  type: ControlType.DISPLAY,
  name: 'mf_exp_kvarh',
  label: 'MF',

},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingExp_kvarh',
  label: 'Last Reading',
},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingdateExp_kvarh',
  label: 'Last Reading Date',
  format:DATE_FORMAT

},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingtimeExp_kvarh',
  label: 'Last Reading Time',
 format:HH_MM
},
{
  type: ControlType.TEXTBOX,
  name: 'currentreadingExp_kvarh',
  label: 'Current Reading',
  inputType:"number",
  required:true,
  onBlurEvent:
 {
   moduleName: CRM_ENERGY_ACCOUNTING,
  serviceName: 'LDC_EXPORT_KVARH_NETREADING_ONENTER',
  input:['currentreadingExp_kvarh','lastreadingExp_kvarh','mf_exp_kvarh']
},
  event :{
    serviceName:'LDC_EXPORT_KVARH_NETREADING_ONENTER',
    moduleName :CRM_ENERGY_ACCOUNTING,
    input:['currentreadingExp_kvarh','lastreadingExp_kvarh','mf_exp_kvarh']
    }
},
{
  type: ControlType.DISPLAY,
  name: 'netreadingExp_kvarh',
  label: 'Net Reading',
  //inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'powerfactorExp_kvarh',
  label: 'Power Factor',
  inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'voltageExp_kvarh',
  label: 'Voltage',
  inputType:"number",

}

];

const ImportReadingKWHSection: IControlDefinition[] = [
{
  type: ControlType.DISPLAY,
  name: 'mf_imp_kwh',
  label: 'MF',

},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingImp_kwh',
  label: 'Last Reading',
},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingdateexp_kwh',
  label: 'Last Reading Date',
  format:DATE_FORMAT
},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingtimeImp_kwh',
  label: 'Last Reading Time',
 format:HH_MM
},
{
  type: ControlType.TEXTBOX,
  name: 'currentreadingImp_kwh',
  label: 'Current Reading',
  inputType:"number",
  required:true,
  onBlurEvent:
  {
    moduleName: CRM_ENERGY_ACCOUNTING,
   serviceName: 'LDC_IMPORT_KWH_NETREADING_ONENTER',
   input:['currentreadingImp_kwh','lastreadingImp_kwh','mf_imp_kwh']
 },
  event :{
    serviceName:'LDC_IMPORT_KWH_NETREADING_ONENTER',
    moduleName :CRM_ENERGY_ACCOUNTING,
    input:['currentreadingImp_kwh','lastreadingImp_kwh','mf_imp_kwh']
    }
},
{
  type: ControlType.DISPLAY,
  name: 'netreadingImp_kwh',
  label: 'Net Reading',
  //inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'powerfactorImp_kwh',
  label: 'Power Factor',
  inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'voltageImp_kwh',
  label: 'Voltage',
  inputType:"number",

}

];

const ImportReadingKVARHSection: IControlDefinition[] = [
{
  type: ControlType.DISPLAY,
  name: 'mf_imp_kvarh',
  label: 'MF',

},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingImp_kvarh',
  label: 'Last Reading',
},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingdateImp_kvarh',
  label: 'Last Reading Date',
  format:DATE_FORMAT

},
{
  type: ControlType.DISPLAY,
  name: 'lastreadingtimeImp_kvarh',
  label: 'Last Reading Time ',
  format:HH_MM
},
{
  type: ControlType.TEXTBOX,
  name: 'currentreadingImp_kvarh',
  label: 'Current Reading',
  inputType:"number",
  required:true,
  onBlurEvent:
  {
    moduleName: CRM_ENERGY_ACCOUNTING,
   serviceName: 'LDC_IMPORT_KVARH_NETREADING_ONENTER',
   input:['currentreadingImp_kvarh','lastreadingImp_kvarh','mf_imp_kvarh']
  },
  event :{
    serviceName:'LDC_IMPORT_KVARH_NETREADING_ONENTER',
    moduleName :CRM_ENERGY_ACCOUNTING,
    input:['currentreadingImp_kvarh','lastreadingImp_kvarh','mf_imp_kvarh']
    }
},
{
  type: ControlType.DISPLAY,
  name: 'netreadingImp_kvarh',
  label: 'Net Reading',
 // inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'powerfactorImp_kvarh',
  label: 'Power Factor',
  inputType:"number",

},
{
  type: ControlType.TEXTBOX,
  name: 'voltageImp_kvarh',
  label: 'Voltage',
  inputType:"number",

}

];
 
  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4
},
]  
 

 
  const exportGridSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'ldcexportGrid',
      isPrimeReactTable: true,
     
  editorProps: {
    isEditable: true,
    hideDelete:true,
    hideAdd:true,
    hideRowDuplicate:true
  },
 
      columns: [
        {
          title: 'TOD Code',
          dataField: 'TOD_CODE_EXP',
                 
          },
          {
            title: 'TOD Name',
            dataField: 'TOD_NAME_EXP',        
          },
        {
          title: 'From Time',
          dataField: 'FROM_TIME_EXP',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
             format:HH_MM
          }

        },
        {
          title: 'To Time',
          dataField: 'TO_TIME_EXP',
          cellRenderer:TableCellRendererType.TEXT,
          cellRendererParams:{
             format:HH_MM
          }
        },
        {
          title: 'MF',
          dataField: 'MF_EXP',        
        },
        {
          title: 'Seq No',
          dataField: 'SEQ_NO_EXP',   
          hidden:true,     
        },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_EXP',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_EXP',
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_EXP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Current Reading',
        dataField: 'CURRENT_READING_EXP',    
        cellEditor: TableCellEditorType.TEXTBOX
    
      },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_EXP',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_EXP',
      cellEditor: TableCellEditorType.TEXTBOX

    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_EXP',
      cellEditor: TableCellEditorType.TEXTBOX

    },
    ],
  },
  ] ;
 
  const importGridSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'ldcimportGrid',
      isPrimeReactTable: true,
     
  editorProps: {
    isEditable: true,
    hideDelete:true,
    hideAdd:true,
    hideRowDuplicate:true
  },
 
      columns: [
        {
          title: 'TOD Code',
          dataField: 'TOD_CODE_IMP',
                 
          },
          {
            title: 'TOD Name',
            dataField: 'TOD_NAME_IMP',        
          },
        {
          title: 'From Time',
          dataField: 'FROM_TIME_IMP',
          cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
        },
        {
          title: 'To Time',
          dataField: 'TO_TIME_IMP',
          cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
        },
        {
          title: 'MF',
          dataField: 'MF_IMP',        
        },
        {
          title: 'Seq No',
          dataField: 'SEQ_NO_IMP',
          hidden:true,             
        },
      {
        title: 'Last Reading',
        dataField: 'LAST_READING_IMP',
      },
      {
        title: 'Last Reading Date',
        dataField: 'LAST_READING_DATE_IMP',
      },
      {
        title: 'Last Reading Time',
        dataField: 'LAST_READING_TIME_IMP',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
           format:HH_MM
        }
      },
      {
        title: 'Current Reading',
        dataField: 'CURRENT_READING_IMP',    
        cellEditor: TableCellEditorType.TEXTBOX
    
      },
    {
      title: 'Net Reading',
      dataField: 'NET_READING_IMP',
    },
    {
      title: 'Power Factor',
      dataField: 'POWER_FACTOR_IMP',
      cellEditor: TableCellEditorType.TEXTBOX

    },
    {
      title: 'Voltage',
      dataField: 'VOLTAGE_IMP',
      cellEditor: TableCellEditorType.TEXTBOX

    },
    ],
  },
  ] ;
 
 
const attachmentSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'attachmentldcgrid',
    isPrimeReactTable: true,
    editorProps: {
        isEditable: true,
     
      },
   
// editorProps: {
//   isEditable: true,
//   enableBulkUpload:true,
//   bulkUploadTemplateFileName:'productDetails.xlsx'
// },
 
    columns: [
      {
        title: 'Upload Document',
        dataField: 'UPLOAD_DOC',
        cellRenderer: TableCellRendererType.FILE_UPLOADER,
        cellRendererParams:{
          maximumAllowedFileSizeInMB: 10,
          allowedFileTypes: ['jpg', 'png', 'pdf', 'csv', 'xls', 'xlsx', 'doc', 'docx'],
          originalFileNameField:'file_name'
        } ,        
        },
        {
          title: 'File Name',
          dataField: 'file_name',        
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
          serviceName: 'RCRM_CREATE_LDC_DATA_MST',
          moduleName: CRM_ENERGY_ACCOUNTING,
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',
        event: {
          serviceName: 'RCRM_SAVE_LDC_DATA_ENTRY_MST',
          moduleName: CRM_ENERGY_ACCOUNTING,
          input: [...actionInputs],
        },
      },
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'submit',
        label: 'Submit',
        event: {
          serviceName: 'RCRM_SUBMIT_LDC_DATA_MST',
          moduleName: CRM_ENERGY_ACCOUNTING,
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
      format:DATE_TIME_FORMAT
 
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
      format:DATE_TIME_FORMAT
 
    },
  ];
 
 
const onLoadEventParams: IRFEventParams = {
 serviceName: '',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id']
};
 
export const ManageLdcdata:React.FC<IPageBaseProps> = (props) => {
    const {id} = usePageQueryParam();
 
    const initialData: IRFData = {
      id: id
       
      };
 
 
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={MonthlySection} title={'Monthly Summary'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFTabs>
        <RFTabItem headerText='Export Reading Details - kWh'>
        <RFSection  controls={ExportReadingKWHSection}  columns={6} />
        </RFTabItem>
        <RFTabItem headerText='Export Reading Details - kVARh'>
        <RFSection  controls={ExportReadingKVARHSection}  columns={6} />
        </RFTabItem>
        </RFTabs>
        <RFTabs>
        <RFTabItem headerText='Import Reading Details - kWh'>
        <RFSection  controls={ImportReadingKWHSection}  columns={6} />
        </RFTabItem>
        <RFTabItem headerText='Import Reading Details - kVARh'>
        <RFSection  controls={ImportReadingKVARHSection}  columns={6} />
        </RFTabItem>
        </RFTabs>
        {/* <RFSection  controls={exportFifteenMinGridSection} title={'Export Reading Details - TOD Breakup - 15 Mins Block'} columns={1} className={'section-header-bg-primary'} collapse={false}/>  */}
        {/* {/* <RFSection  controls={importGridSectionFifteen} title={'Import Reading Details - TOD Breakup - 15 Mins Block'} columns={1} className={'section-header-bg-primary'} collapse={false}/> */}
        <RFSection  controls={exportGridSection} title={'Export Reading Details - TOD Breakup'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={importGridSection} title={'Import Reading Details - TOD Breakup'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
 