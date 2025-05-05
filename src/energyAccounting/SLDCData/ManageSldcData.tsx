 
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

import { CellEditorComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { CRM_ENERGY_ACCOUNTING, DATE_TIME_FORMAT } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { SldcHelp } from './SldcHelp';



const actionInputs =[
  'id','site','sitename','assetType','assetid','status','substationname',
  'capacity','generationyear','generationPeriod','transactiondate','transactiontime','shareOfWind','shareOfSolar',
  'notes','attachmentldcgrid',''

]
    const onEnterEvent: IRFEventParams = {
        input: ['id'],
        moduleName: CRM_ENERGY_ACCOUNTING,
        serviceName: 'RCRM_ONENTER_SLDC_DATA_MST',
      };
     
      const helpComponents = {
        SldcHelp:SldcHelp,
      };
 
const generalSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'id',
        label: 'ID',
        //required:true,
        event: onEnterEvent,
        help: {
          panelTitle: 'Help On SLDC Data',
          componentName: 'SldcHelp',
          receiveParams: [{parentField: 'id', childField: 'id'},
                   ],
          event: onEnterEvent
        }
   
      },
      {
        type: ControlType.COMBOBOX,
        name: 'site',
        label: 'Site Code',
        required:true,
        masterField:'site',
        event :{
          serviceName:'RCRM_SLDCDATA_ONCHANGE_SITE',
          moduleName :CRM_ENERGY_ACCOUNTING,
          input:['site']
          }
        
       
      },
      {
        type: ControlType.DISPLAY,
        name: 'sitename',
        label: 'Site Name',
      },
      {
        type: ControlType.COMBOBOX,
        name: 'assetType',
        label: 'Asset Type',
        masterField:'assetType',
        hidden:true,
        required:true,
        event :{
          serviceName:'RCRM_SLDCDATA_ONCHANGE_ASSET_TYPE',
          moduleName :CRM_ENERGY_ACCOUNTING,
          input:['assetType', 'site']
          }
      },
      {
        type: ControlType.COMBOBOX,
        name: 'assetid',
        label: 'Asset ID',
        masterField:'assetid',
        required:true,
        hidden:true,
        event :{
          serviceName:'RCRM_SLDCDATA_ONCHANGE_ASSET',
          moduleName :CRM_ENERGY_ACCOUNTING,
          input:['assetid']
          }
      },
      
     
      {
        type: ControlType.DISPLAY,
        name: 'substationname',
        label: 'Asset Name',
        hidden:true,
  
      },
      {
        type: ControlType.DISPLAY,
        name: 'capacity',
        label: 'Capacity',
        hidden:true,
  
      },
      {
        type: ControlType.COMBOBOX,
        name: 'generationyear',
        label: 'Generation Year',
        masterField:'generationyear',
        required:true,
        event :{
          serviceName:'RCRM_GENERATION_YEAR_SDLC_ONCHANGE',
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
        // event :{
        //   serviceName:'RCRM_LDC_DATA_ONCHANGE_DATE',
        //   moduleName :CRM_ENERGY_ACCOUNTING,
        //   input:['generationPeriod','assetid']
        //   }

        event :{
          serviceName:'RCRM_SLDCDATA_ONCHANGE_GEN_PERIOD',
          moduleName :CRM_ENERGY_ACCOUNTING,
          input:['site','generationPeriod']
          }
      },

      {
        type: ControlType.DISPLAY,
        name: 'status',
        label: 'Status',
      },
     
  {
    type: ControlType.DATEPICKER,
    name: 'transactiondate',
    label: 'Transaction Date',
    required:true
  },
 
  {
    type: ControlType.TIMEPICKER,
    name: 'transactiontime',
    label: 'Transaction Time',
    required:true
    
  },
 

];

const CustomerAssetSummary: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'CustomerAssetSummaryGrid',
    isPrimeReactTable: true,
      pageSize:7,

    columns: [
        {
          title: 'Customer Code',
          dataField: 'CUSTOMER_CODE',     
        },
        
        {
          title: 'Customer Name',
          dataField: 'CUSTOMER_NAME',  
          
        },
        {
          title: 'HTSC#',
          dataField: 'HTSC',  
        },
        {
          title: 'Asset ID',
          dataField: 'ASSET_ID',  
    
        },
        {
          title: 'MW Share',
          dataField: 'MW_SHARE',
        },
  ],
},
] ;

const shareOfWind: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'shareOfWind',
      isPrimeReactTable: true,
      editorProps: {
        isEditable: true,
        hideDelete: false,
        hideAdd: false,
        enableBulkUpload: true,
        bulkUploadTemplateFileName: 'Share_Of_Wind_Farm_Owner_In_The_Electricity_Received.xlsx'
      },
 
      columns: [
        {
          title: 'Name of Wind Farm Owner',
          dataField: 'NAME_OF_WIND_FARM_OWNER',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true
        }      
          },
          
          {
            title: 'Asset ID',
            dataField: 'ASSET_ID_WIND',  
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
                masterField:'ASSET_ID_WIND',
                required:true,
                event :{
                  serviceName:'RCRM_SLDCDATA_ONCHANGE_ASSET_WIND',
                  moduleName :CRM_ENERGY_ACCOUNTING,
                  input:['ASSET_ID_WIND']
                  }
            },
           
      
          },
          {
            title: 'Asset Name',
            dataField: 'ASSET_NAME',  
          },
          {
            title: 'DISCOM Allocation',
            dataField: 'DISCOM_ALLOCATION',  
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
                masterField:'DISCOM_ALLOCATION',
                required:true
            }
      
          },
        {
          title: 'Installed Capacity(MW)',
          dataField: 'INSTALLED_CAPACITY',
          cellEditor: TableCellEditorType.TEXTBOX,
         
          cellEditorParams:{
            inputType:"number",
            required:true,
        }

        },
        {
          title: 'Share in Active Energy(Mwh)',
          dataField: 'SHARE_IN_ACTIVE_ENERGY',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType:"number",
            required:true
        }


        },
        {
          title: 'Share in Reactive Energy(Mvarh)',
          dataField: 'SHARE_IN_REACTIVE_ENERGY',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType:"number",
            required:true
        } 
        },
    ],
  },
  ] ;

  const shareOfSolar: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'shareOfSolar',
      isPrimeReactTable: true,
      editorProps: {
        isEditable: true,
        hideDelete: false,
        hideAdd: false,
        enableBulkUpload: true,
        bulkUploadTemplateFileName: 'Share_Of_Solar_Farm_Owner_In_The_Electricity_Received.xlsx'
      },
 
      columns: [
        {
          title: 'Name of Solar Farm Owner',
          dataField: 'NAME_OF_SOLAR_FARM_OWNER',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true
        }

                 
          },
          {
            title: 'Asset ID',
            dataField: 'ASSET_ID_SOLAR',  
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
                masterField:'ASSET_ID_SOLAR',
                required:true,
                event :{
                  serviceName:'RCRM_SLDCDATA_ONCHANGE_ASSET_SOLAR',
                  moduleName :CRM_ENERGY_ACCOUNTING,
                  input:['ASSET_ID_SOLAR']
                  }
            },
           
          },
          {
            title: 'Asset Name',
            dataField: 'ASSET_NAME',  
          },
          {
            title: 'DISCOM Allocation',
            dataField: 'DISCOM_ALLOCATION_SOLAR',  
            cellEditor: TableCellEditorType.COMBOBOX,
            cellEditorParams:{
                masterField:'DISCOM_ALLOCATION_SOLAR',
                required:true
            }
      
          },
        {
          title: 'Installed Capacity(MW)',
          dataField: 'INSTALLED_CAPACITY_SOLAR',
          cellEditor: TableCellEditorType.TEXTBOX,
         
          cellEditorParams:{
            inputType:"number",
            required:true,
        }

        },
        {
          title: 'Share in Active Energy Injection in MWh',
          dataField: 'SHARE_IN_ACTIVE_ENERGY_SOLAR',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType:"number",
            required:true
        }


        },
        {
          title: 'Share in Active Energy Drawl in MWh',
          dataField: 'SHARE_IN_ACTIVE_ENERGY_DRAWL',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            inputType:"number",
            required:true
        } 
        },
    ],
  },
  ] ;

  const SLDCSharebyCustomerHTSCSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'SLDCSharebyCustomerHTSCgrid',
      isPrimeReactTable: true,
      pageSize:7,
      columns: [
        {
          groupHeaderName: 'System Allotment based on SLDC Data',
          children: [
            {
              title: 'Generation Type',
              dataField: 'GENERATION_TYPE',
            },
            {
              title: 'Name of the Farm Owner',
              dataField: 'FARM_OWNER',
            },
            {
              title: 'Asset ID',
              dataField: 'ASSET_ID',
            },
            {
              title: 'Asset Name',
              dataField: 'ASSET_NAME',
            },
            {
              title: 'Asset Type',
              dataField: 'ASSET_TYPE',
            },
            {
              title: 'Asset Capacity in MW',
              dataField: 'ASSET_CAPACITY',
            },
            {
              title: 'Generation by Asset in MWh',
              dataField: 'GENERATION_ASSET_MWH',
            },
            {
              title: 'Generation by Asset in kWh',
              dataField: 'GENERATION_ASSET_KWH',
            },
            {
              title: 'PPA #',
              dataField: 'PPA_NO',
            },
            {
              title: 'HT SC #',
              dataField: 'HTSC_NO',
            },
            {
              title: 'Customer Name',
              dataField: 'CUSTOMER_NAME',
            },
            {
              title: 'DISCOM',
              dataField: 'DISCOM',
              
            },
         
            {
              title: '% of Share in Asset',
              dataField: 'SHARE_IN_ASSET',
            },

            {
              title: 'MW Share',
              dataField: 'MW_SHARE',
            },

            {
              title: 'Allocated Energy in MWh',
              dataField: 'ALLOCATED_ENERGY_MWH',
            },
            {
              title: 'Allocated Energy in kWh',
              dataField: 'ALLOCATED_ENERGY_KWH',
            },
          ],
        }       
      ],
    },
  ];


  const SLDCCustomerHTSCSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'SLDCCustomerHTSCGrid',
      isPrimeReactTable: true,
      pageSize:7,
  
      columns: [
          {
            title: 'Customer Code',
            dataField: 'CUSTOMER_CODE',     
          },
          
          {
            title: 'Customer Name',
            dataField: 'CUSTOMER_NAME',  
            
          },
          {
            title: 'PPA',
            dataField: 'PPA',  
          },
          {
            title: 'SBU',
            dataField: 'SBU',  
      
          },
          {
            title: 'HTSC#',
            dataField: 'HTSC',
          },
          {
            title: 'Total SLDC Units',
            dataField: 'TOTAL_SLDC_UNITS',
          },
    ],
  },
  ] ;

  const NotesSection: IControlDefinition[] = [
    {
        type: ControlType.TEXTBOX,
        name: 'notes',
        column: 10,  
        multiLine :true,
        multiLineRowLength:4
},
]  
 
const attachmentSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'attachmentldcgrid',
    isPrimeReactTable: true,
    editorProps: {
        isEditable: true,
     
      },
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
          serviceName: 'RCRM_CREATE_SLDC_DATA_MST',
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
          serviceName: 'RCRM_SAVE_SLDC_DATA_MST',
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
          serviceName: 'RCRM_SUBMIT_SLDC_DATA_MST',
          moduleName: CRM_ENERGY_ACCOUNTING,
          input: [...actionInputs],
          confirmationDialog:{
            message:'Are you sure about Submitting? Once data Submitted cannot be modified.'
          },
        },
      },

      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'rollback',
        label: 'Rollback',
        event: {
          serviceName: 'RCRM_ROLLBACK_LDC_DATA_MST',
          moduleName: CRM_ENERGY_ACCOUNTING,
          input: [...actionInputs],
        },
      },  

      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'print',
        label: 'Print',
        event: {
          serviceName: 'RCRM_PRINT_LDC_DATA_MST',
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
 serviceName: 'RCRM_INIT_SLDC_DATA_MST',
  moduleName: CRM_ENERGY_ACCOUNTING,
  input: ['id']
};
 
export const ManageSldcData:React.FC<IPageBaseProps> = (props) => {
    const {id} = usePageQueryParam();
 
    const initialData: IRFData = {
      id: id
       
      };
 
 
  return (
    <RetinaFormBuilder  initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={generalSection} title={'General'} columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFTabs>
       
        <RFTabItem headerText='Customer - Asset Summary' alwaysRender>
        <RFSection  controls={CustomerAssetSummary}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>
        </RFTabs>
        <RFTabs>
       
        <RFTabItem headerText='Share Of Wind Farm Owner In The Electricity Received' alwaysRender>
        <RFSection  controls={shareOfWind}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>
        <RFTabItem headerText='Share Of Solar Farm Owner In The Electricity Received' alwaysRender>
        <RFSection  controls={shareOfSolar}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>

        <RFTabItem headerText='SLDC Share by Customer HT SC #(Asset)' alwaysRender>
        <RFSection  controls={SLDCSharebyCustomerHTSCSection}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>
        <RFTabItem headerText='SLDC Share by Customer HT SC #' alwaysRender>
        <RFSection  controls={SLDCCustomerHTSCSection}  columns={1} className={'section-header-bg-primary'} collapse={false}/>
        </RFTabItem>
        </RFTabs>
        <RFSection controls={NotesSection} title={'Notes'}columns={1} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={attachmentSection} title={'Attachments'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
 