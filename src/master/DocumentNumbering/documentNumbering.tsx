import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
// import { truncate } from 'lodash';
// import { ComboBox } from 'office-ui-fabric-react';

const actionInputs = ['COMPONENT','iVersionNo','dtEffectiveFrom','dtEffectiveTo','iAutoLength','iLevel','iStartingNo','iEndingNo','strPreview','documentgrid'];

const HdrSection: IControlDefinition[] = [
  {type: ControlType.COMBOBOX,"label":"Component",name:"COMPONENT",required:true,masterField:"COMPONENT",
    event :{
      serviceName:'ONCHANGE_COMPONENT_DOCUMENT',
      moduleName :'CRM_Master',
      input:['COMPONENT']
      }
  },
  {type: ControlType.COMBOBOX,"label":"Version No",name:"iVersionNo",
    event :{
      serviceName:'ONCHANGE_VERSION_DOCUMENT',
      moduleName :'CRM_Master',
      input:['COMPONENT','iVersionNo']
      }
  },
  {type: ControlType.DATEPICKER,"label":"Effective From",name:"dtEffectiveFrom",required:true},
  {type: ControlType.DATEPICKER,"label":"Effective To",name:"dtEffectiveTo",required:true},
  {type: ControlType.TEXTBOX,"label":"Auto Length",name:"iAutoLength",required:true,inputType:"integer"},
  {type: ControlType.TEXTBOX,"label":"Level",name:"iLevel",required:true,inputType:"integer"},			
  {type: ControlType.TEXTBOX,"label":"Starting No",name:"iStartingNo",required:true,inputType:"integer"},
  {type:ControlType.TEXTBOX,"label":"Ending No",name:"iEndingNo",inputType:"integer",required:true},
  {type: ControlType.DISPLAY,"label":"Preview",name:"strPreview"}
]
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'documentgrid',
    isPrimeReactTable: true,
    editorProps:{
        isEditable:true,
        hideAdd:false,
        hideDelete:false
    },
    columns: [
      {
        title: 'Sequence',
        dataField: 'SEQUENCE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required:true,
          inputType:"integer"
        }
      },
      {
        title: 'Element',
        dataField: 'ELEMENT',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField:"ELEMENT"
        }        
      },
      {
        title: 'Data',
        dataField: 'DATA',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField:"DATA"
        }        
      },
      {
        title: 'Value',
        dataField: 'VALUE',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required:true,
          maxLength:20
        }        
      },
      {
        title: 'Length',
        dataField: 'LENGTH',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams: {
          required:false,
          inputType:"integer"
        }
      },
      {
        title: 'Type',
        dataField: 'TYPE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:false,
          masterField:"TYPE"
        }        
      },
      {
        title: 'Separator',
        dataField: 'SEPARATOR',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
          required:true,
          masterField:"SEPARATOR"
        }        
      },
    ],
  },
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'SAVE_DOCUMENT_NUM',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_DOCUMENT_NUM',
  moduleName: 'CRM_Master',
//   input: searchInputs,
};

export const DocumentNumbering :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn'}>
      <RFCRMToolbar/>
      <ScrollabeContainer hasHeader={true}>        
      <RFSection  controls={HdrSection}  columns={6} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection controls={tableSection} columns={1} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons}/>
    </RetinaFormBuilder>
  );
};
