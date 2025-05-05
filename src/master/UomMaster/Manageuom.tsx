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
import { UomMasterHelp } from './UomMasterHelp';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { CRM_MASTER, DATE_TIME_FORMAT } from '../../common/constants';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['unitCode','description', 'status', 'uommastergrid', 'rsperday', 'rspermw','rsperkwh' ];

const onEnterEvent: IRFEventParams = {
  input: ['unitCode'],
  moduleName: 'CRM_Master',
  serviceName: 'ONENTER_UOM_MST',
};

const helpComponents = {
  UomMasterHelp: UomMasterHelp
};

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'unitCode',
    label: 'Unit Code',
    required:true,
    event: onEnterEvent,
    maxLength:80,
    help: {
      panelTitle: 'Help On Uom Master',
      componentName: 'UomMasterHelp',
      receiveParams: [{parentField: 'unitCode', childField: 'UNIT_CODE'},
                      {parentField: 'description', childField: 'DESCRIPTION'},
                      {parentField: 'status', childField: 'STATUS'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'description',
    label: 'Description',
    required:true,
    maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'rsperday',
    label: 'Rs/Day',
    required:true,
    // maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'rspermw',
    label: 'Rs/Mw/Day',
    required:true,
    // maxLength:100
  },
  {
    type: ControlType.TEXTBOX,
    name: 'rsperkwh',
    label: 'Rs/Kwh',
    required:true,
    // maxLength:100
  },

  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
];
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'uommastergrid',
    isPrimeReactTable: true,
    editorProps:{
      isEditable:true,
      hideAdd:true,
      hideDelete:true,
      hideRowDuplicate:true
  },
    columns: [
      {
        title: 'Convert To',
        dataField: 'CONVERT_TO',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField: 'CONVERT_TO',
        }
        
    },
      {
        title: 'Conversion Factor',
        dataField: 'CONVERSION_FACTOR',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required:true,
          inputType:"number",
       
        }
        
      },
    ]
  
    },

    ];
export const DataSection: IControlDefinition[] = [
  {
    type: ControlType.LABEL,
    name: 'dtCreatedDate',
    isStatic: false,
    prefixText: 'Created Date : ',
    format:DATE_TIME_FORMAT
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
      format:DATE_TIME_FORMAT
    },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
  ];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_UOM_MST',
  moduleName: CRM_MASTER,
    input: ['unitCode']
};

export const ManageUom:React.FC<IPageBaseProps> = (props) => {
    const {code} = usePageQueryParam();

    const initialData: IRFData = {
      unitCode: code
      };

  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} title={'UOM Details'} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={tableSection}  title={'Conversion Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
    
    </RetinaFormBuilder>
  );
};
