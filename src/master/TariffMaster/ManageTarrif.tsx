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
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { DatePickerMode } from '@retina360-ai/core-ui-library-v2';
import { TarrifMasterHelp } from './TarrifMasterHelp';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['tariffCode', 'tariffName','state','agencyName','tariffOrder','version','releaseDate','effectiveFrom','effectiveTo','status','tarrifgridsummary'];
const onEnterEvent: IRFEventParams = {
  input: ['tariffCode'],
  moduleName: CRM_MASTER,
  serviceName: 'ONENTER_TARRIF_MST',
};

const helpComponents = {
  TarrifMasterHelp: TarrifMasterHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'tariffCode',
    label: 'Tariff Code',
    required:true,
    maxLength:80,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Tarrif Master',
      componentName: 'TarrifMasterHelp',
      receiveParams: [{parentField: 'tariffCode', childField: 'TARRIF_CODE'},
                      {parentField: 'tariffName', childField: 'TARRIF_NAME'},
                      {parentField: 'State', childField: 'STATE'},
                      {parentField: 'agencyName', childField: 'AGENCY_NAME'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'tariffName',
    label: 'Tariff Name',
    maxLength:100,
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'state',
    label: 'State',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'agencyName',
    label: 'Agency Name',
    required:true
  },
  {
    type: ControlType.TEXTBOX,
    name: 'tariffOrder',
    label: 'Tariff Order #',
    required:true,
    maxLength:80
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'version',
    label: 'Version',
    inputType:'number',
    required:true


  },
  {
    type: ControlType.DATEPICKER,
    name: 'releaseDate',
    label: 'Release Date',
    required:true
  },
  {
    type: ControlType.DATEPICKER,
    name: 'effectiveFrom',
    label: 'Effective From',
    required:true
  },
  {
    type: ControlType.DATEPICKER,
    name: 'effectiveTo',
    label: 'Effective To',
   // required:true
  },

];
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'tarrifgridsummary',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
      resetFieldsOnRowDuplicate:['KEY']
    },

    columns: [
      {
        title: 'Key',
        dataField: 'KEY',
        hidden:true
      },
      {
        title: 'Generation Type',
        dataField: 'GENERATION_TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'GENERATION_TYPE',
        }
      },
      {
        title: 'Tariff Type',
        dataField: 'TARRIFF_TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'TARRIFF_TYPE',
        }
      },
      {
        title: 'Tariff ID',
        dataField: 'TARIFF_ID',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          maxLength:80
        }
      },
      {
        title: 'Tariff Description',
        dataField: 'TARIFF_DESCRIPTION',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          maxLength:100,
        }
      },
      {
        title: 'UOM',
        dataField: 'UOM',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'UOM',
        }
      },
      {
        title: 'Base Rate',
        dataField: 'RATE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          required:true,
          inputType:'number'
        }
      },
      {
        title: 'Remarks',
        dataField: 'REMARKS',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:{
          maxLength:400
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
        }
    ]
  
    },

    ];
    
const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_CREATE_TARRIF_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'activate',
      label: 'Activate',
      event: {
        serviceName: 'ACTIVATE_TARIFF_MST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'inactivate',
      label: 'InActivate',
      event: {
        serviceName: 'INACTIVATE_TARIFF_MST',
        moduleName: CRM_MASTER,
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
  serviceName: 'INIT_TARRIF_MST',
  moduleName: CRM_MASTER,
    input: ['tariffCode']
    
};

export const ManageTarrif:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
      tariffCode: code
      };

  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} title={'General'} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={tableSection}  title={'Tariff Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
