import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellEditorType
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const actionInputs = ['costcentergrid'];


  const tableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'costcentergrid',
      isPrimeReactTable: true,
      column: 12,
      editorProps:{
        isEditable:true,
        hideAdd:false,
        hideDelete:false,
    },
      columns: [
        {
          title: 'Cost Center Code',
          dataField: 'COST_CENTER_CODE',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:80
          }
          
        },
        {
          title: 'Description',
          dataField: 'DESCRIPTION',
          cellEditor: TableCellEditorType.TEXTBOX,
          cellEditorParams:{
            required:true,
            maxLength:100
          }
        },
        {
          title: 'Active',
          dataField: 'Status',
          cellEditor: TableCellEditorType.COMBOBOX,
          cellEditorParams:{
            required:true,
            masterField:'Status'
          }
        },
     
        
        ] 

    }    
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'RCRM_SAVE_COSTCENTER_MST',
        moduleName: 'CRM_Master',
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
  serviceName: 'RCRM_COSTCENTER_INIT_MST',
  moduleName: 'CRM_Master',
 // input: actionInputs,
};

export const CostCenter:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn'} prompt>
      <RFCRMToolbar/>
      <ScrollabeContainer hasHeader={true}>
       <RFSection controls={tableSection}  columns={1} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons}/>
    </RetinaFormBuilder>
  );
};
