import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { VectorFamilyIconEnum } from '@retina360-ai/core-ui-library-v2';
// import { truncate } from 'lodash';
// import { ComboBox } from 'office-ui-fabric-react';

const actionInputs = ['TRANSACTION_TYPE', 'LENGTH','PREFIX' ,'SUFFIX','EFFECTIVE_FROM','EFFECTIVE_TO'];

const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'userrolemappingsummary',
    isPrimeReactTable: true,
    pageSize: 12,
    noPagination:true,
    editorProps:{
        isEditable:true,
        hideAdd:true,
        hideDelete:true,
        hideRowDuplicate:true,
        sentEditedRowsOnly:true
    },
    excelExport:false,
    columns: [
      {
        title: 'Document Name',
        dataField: 'FILE_NAME',
      },
      {
        title: 'Author',
        dataField: 'AUTHOR',
      },
      {
        title: 'Time Stamp',
        dataField: 'TIMESTAMP',
        // cellEditor: TableCellEditorType.DATE_PICKER,
      },
      {
        title: 'Component',
        dataField: 'COMPONENT',
        // cellEditor: TableCellEditorType.COMBOBOX,
      },
      {
        title: 'Document Reference ',
        dataField: 'DOC_NO',
        // cellEditor: TableCellEditorType.TEXTBOX, 
      },
      {
        title: '',
        dataField: 'UPLOADED_DOCUMENT',
        cellRenderer: TableCellRendererType.ICON,
        cellClass:'user-manual-download-icon-cell',
        cellRendererParams: {
          //text: 'Download',
          iconName: 'Download',
          iconTooltipText: 'Click here to download',
          iconFamily: VectorFamilyIconEnum.FABRIC,
          event: {
            downloadFile: {
              input: ['UPLOADED_DOCUMENT'],
            },
          },
        },
      }

    ],
  },
];

const toolbarControls: IControlDefinition[] = [
  /*
  {
    type: ControlType.BUTTON,
    name: 'upload',
    isPrimary: true,
    label: 'Upload',
    event: {
    serviceName: 'Upload_DOCUMENTLIST',
        moduleName: CRM_MASTER,
        input: ['userrolemappingsummary'],
    },
  },
  */
];
const actionBarButtons: IControlDefinition[] = [
  /*
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        serviceName: 'SAVE_DOCUMENTLIST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },

    {
      type: ControlType.BUTTON,
      name: 'download',
      label: 'Download',
      event: {
        serviceName: 'BACK_DOCUMENTLIST',
        moduleName: CRM_MASTER,
        input: [...actionInputs],
      },
    },

    */
    
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
   serviceName: 'RCRM_DOCUMENTLIST_INIT',
  moduleName: CRM_MASTER,
//   input: searchInputs,
};

export const DocumentList :React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar toolbarControls={toolbarControls}/>
      <ScrollabeContainer hasHeader={true} >
      {/* <RFSection  controls={tableSection}  title={'General'} /> */}
        <RFSection controls={tableSection} columns={1} />
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
};
