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
//import { IPageBaseProps } from '../../common/objects';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { CRM_MASTER } from '../../common/constants';
import { TemplateBuilderHelp } from './TemplateBuilderHelp';

const actionInputs = ['templateCode', 'templateDescription','templateType','status','templateGridDtl','documentList','fileName','fileReference'];


const onEnterEvent: IRFEventParams = {
  input: ['templateCode'],
  moduleName: 'CRM_Master',
  serviceName: 'RCRM_TEMPLATE_BUILDER_ONENTER_MST',
};

const helpComponents = {
  TemplateBuilderHelp:TemplateBuilderHelp
};

const Section: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'templateCode',
    label: 'Template Code',
    maxLength:80,
    required:true,
    event: onEnterEvent,
    help: {
      panelTitle: 'Help On Template',
      componentName: 'TemplateBuilderHelp',
      receiveParams: [{parentField: 'templateCode', childField: 'TEMPLATE_CODE'}],
      event: onEnterEvent
    }
  },
  {
    type: ControlType.TEXTBOX,
    name: 'templateDescription',
    label: 'Template Description',
    maxLength:100,
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'templateType',
    label: 'Template Type',
    required:true
  },
  {
    type: ControlType.FILE_UPLOADER,
    label:'File Upload',
    name: 'fileName',
    required:true,
    //isIconButton: false,
    //buttonText: 'Select File',
    className: 'template-builder-file-upload',
    allowedFileTypes: ['docx'],
    event: {
      api: 'Files/Template/parseDocument',
      apiParams: {
        tableName: 'documentList',
      },
      moduleName: CRM_MASTER,
      serviceName: 'RCRM_TEMPLATE_UPLOAD',
      input: [
        'templateType',
        'tableName',
        'templateCode'
      ],
    },
    showFileDownloadButton:true,
    isEditable:true,
    isUploadOnChange:true,
    downloadFileConfig:{
      input:['fileReference']
    },
    column:'auto',
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
];

const DetailstableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'templateGridDtl',
    isPrimeReactTable: true,
    column: 12,
    columns: [
      {
        title: 'From System',
        dataField: 'FROM_SYSTEM'
      },
      {
        title: 'Description',
        dataField: 'FROM_SYSTEM_DESC'
      },
      {
        title: 'From File',
        dataField: 'FROM_FILE',
        cellEditor: TableCellEditorType.COMBOBOX,
        cellEditorParams: {
        required:true,
        masterField: 'FROM_FILE',
        }
      },
      {
        title: 'Sample Data',
        dataField: 'SAMPLE_DATA',
        cellEditor: TableCellEditorType.TEXTBOX,
        cellEditorParams:
        {
          required:true
        }
      }
      ] 

  }    
];

const actionBarButtons: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'create',
      label: 'Create',
      event: {
        serviceName: 'RCRM_TEMPLATE_BUILDER_CREATE',
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
        serviceName: 'RCRM_TEMPLATE_BUILDER_ACTIVATE',
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
        serviceName: 'RCRM_TEMPLATE_BUILDER_INACTIVATE',
        moduleName: 'CRM_Master',
        input: [...actionInputs],
      },
    },
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'preview',
      label: 'Preview',
      event: {
        previewFile:{
          api: 'Files/Template/previewDocument/',
          fileType:'docx',
          apiMethodType:'POST',
          apiParams: {
            tableName: 'documentList',
          },
          moduleName: CRM_MASTER,
          serviceName: 'RCRM_TEMPLATE_BUILDER_PREVIEW',
          input: [...actionInputs],
        }
      // getEventProps:(pagedata)=>{
      //   return {
      //     downloadFile:{          
      //       api: 'Files/Template/previewDocument/',
      //       fileName:pagedata.fileName,
      //       apiMethodType:'POST',
      //       apiParams: {
      //         tableName: 'documentList',
      //       },
      //       moduleName: CRM_MASTER,
      //       serviceName: 'RCRM_TEMPLATE_BUILDER_PREVIEW',
      //       input: [...actionInputs],
      //     }
      //   }
      // }
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
  serviceName: 'RCRM_TEMPLATE_BUILDER_INIT_MST',
  moduleName: 'CRM_Master',
    input: ['templateCode']
};


export const TemplateBuilder:React.FC<IPageBaseProps> = (props) => {
  const {templateCode} = usePageQueryParam();

  const initialData: IRFData = {
    templateCode: templateCode,
    };

  return (
    <RetinaFormBuilder initialValues={initialData}  onLoadEventParams={onLoadEventParams} components={helpComponents} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={Section} columns={6} title={'General'} className={'section-header-bg-primary'} collapse={false}/>
        <RFSection  controls={DetailstableSection}  title={'Mapping Details'} columns={1} className={'section-header-bg-primary'} collapse={false}/>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
