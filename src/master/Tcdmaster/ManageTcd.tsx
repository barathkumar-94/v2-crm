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
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
//import { IPageBaseProps } from '../../common/objects';
import { UomMasterHelp } from '../UomMaster/UomMasterHelp';
import { TcdMasterHelp } from './TcdMasterHelp';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { TcdDetailsModal } from './TcdDetails';

const actionInputs = ['TCDCode', 'description','type','state','status','Tcddetailsgrid','group'];


const onEnterEvent: IRFEventParams = {
  input: ['TCDCode'],
  moduleName: 'CRM_Master',
  serviceName: 'RCRM_TCD_ONENTER_MST',
};

const helpComponents = {
  TcdMasterHelp: TcdMasterHelp,
  TcdDetailsModal:TcdDetailsModal
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'TCDCode',
    label: 'TCD Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Tcd Master',
      componentName: 'TcdMasterHelp',
      receiveParams: [{parentField: 'TCDCode', childField: 'TCD_CODE'},
                      {parentField: 'description', childField: 'DESCRIPTION'},
                      {parentField: 'type', childField: 'TYPE'},
                      {parentField: 'state', childField: 'STATE'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
    maxLength:100,
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'type',
    label: 'Type',
    masterField:'type',
    required:true
  },  
  
  {
    type: ControlType.COMBOBOX,
    name: 'group',
    label: 'TCD Group',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    masterField:'state',
    required:true
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },

  { type: ControlType.DISPLAY,
    name: 'Value_JSON',
    label: 'VALUE_json',
    hidden:true
  },
];

const TCDDetailstableSection: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    name: 'addBtn',
    label: 'Add TCD Details',
    isPrimary: true,
    iconName: 'CirclePlus',
    event: {
      openModal: true,
      modalProps: {
        title: 'Configure TCD Details',
        componentName: 'TcdDetailsModal',
        popupProps:{
          width:650,
          height:'90%'
        }
      },
    },
    className: 'text-right'
  },
  {
    type: ControlType.TABLE,
    name: 'Tcddetailsgrid',
    isPrimeReactTable: true,
    column: 12,
    excelExport: false,
    columns: [
      {
     
        title: 'Key',
        dataField: 'KEY',
        hidden:true
      },
      {
     
        title: 'Nature',
        dataField: 'NATURE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          masterField: 'NATURE',
          disable:true
        }
      },

    
      {
        title: 'Value',
        dataField: 'VALUE',
      },

      
      {
        title: 'Value_JSON',
        dataField: 'VALUE_json',
        hidden:true
      },


      {
        title:'Effective From',
        dataField:'EFFECTIVE_FROM',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:'DD-MM-YYYY'
        },
       // cellEditor: TableCellEditorType.DATE_PICKER,
            
      },
      {
        title:'Effective To',
        dataField:'EFFECTIVE_TO',
        cellRenderer:TableCellRendererType.TEXT,
        cellRendererParams:{
          format:'DD-MM-YYYY'
        }       
      },
      {
        title: 'Active',
        dataField: 'STATUS',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'ACTIVE',
        }
      },
      {
        title: 'Action',
        dataField: null,
        cellRenderer: TableCellRendererType.DYNAMIC_CONTROL,
        conditionalControls: [
          {
            canRenderControl: () => true,
            control: {
              dataField: null,
              cellRenderer: TableCellRendererType.BUTTON,
              cellClass:'mr-1',
              cellRendererParams: {
                iconName: 'Edit',
                iconTooltipText:'Edit Detail',
                event: {
                  getEventProps: (rowData, pageData) => {
                    return {
                      openModal: true,
                      modalProps: {
                        title: 'Configure TCD Details',
                        componentName: 'TcdDetailsModal',
                        sendParams: [{customData: rowData}],
                        popupProps:{
                          width:650,
                          height:'90%'
                        }
                      },
                    };
                  },
                },
              },
            },
          },
          // {
          //   canRenderControl: () => true,
          //   control: {
          //     dataField: null,
          //     cellRenderer: TableCellRendererType.BUTTON,
          //     cellRendererParams: {
          //       iconName: 'Delete',
          //       iconTooltipText:'Delete Detail',
          //       event: {
          //         confirmationDialog:{
          //           message:'Are you sure you want to delete this detail?'
          //         },
          //         deleteRow: true,
          //       },
          //     },
          //   },
          // },
        ],
      },
     
    ],
    
  },

];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_TCD_CREATE_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'RCRM_TCD_ACTIVATE_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'RCRM_TCD_INACTIVATE_MST',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
  ];
export const DataSection: IControlDefinition[] = [
    
    {
      type: ControlType.LABEL,
      name: 'dtCreatedDate',
      isStatic: false,
      prefixText: 'Created Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    
    {
      type: ControlType.LABEL,
      name: 'dtModifiedDate',
      isStatic: false,
      prefixText: 'Modified Date : ',
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'RCRM_TCD_INIT_MST',
  moduleName: 'CRM_Master',
    input: ['TCDCode']
};


export const Managetcd:React.FC<IPageBaseProps> = (props) => {
    const{code} = usePageQueryParam();

    const initialData: IRFData = {
      TCDCode: code,
       
      };

  return (
    <RetinaFormBuilder initialValues={initialData}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} title={'General'} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={TCDDetailstableSection}  title={'TCD Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
