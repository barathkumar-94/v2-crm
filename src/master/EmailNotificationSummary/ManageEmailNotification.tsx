import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  RFTabs,
  RFTabItem,
  usePageQueryParam,
  IRFData,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';

const searchInputs = ['AlertCode', 'Description', 'status'];

const searchSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'NotificationCode',
    label: 'Notification Code',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Description',
    label: 'Description',
    required:true
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Component',
    label: 'Component',
    required:true,
    masterField:'Component',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField: 'status',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'On',
    label: 'On',
    required:true,
    masterField:'On',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'EffectiveFrom ',
    label: 'Effective From',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'EffectiveTo',
    label: 'Effective To',
  },
  
];

const Emailsection: IControlDefinition[] = [
    {
      type: ControlType.TEXTBOX,
      name: 'To',
      label: 'To',
      required:true,
    },
    {
        type: ControlType.TEXTBOX,
        name: 'CC',
        label: 'CC',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'BCC',
        label: 'BCC',
      },
      {
        type: ControlType.TEXTBOX,
        name: 'Subject',
        label: 'Subject',
      },
    ]

    
const Mailbodysection: IControlDefinition[] = [
  {
    type: ControlType.HTML_EDITOR,
    name: 'Variable',
    label:'',
  },
 
  ]

const MailParameterssection: IControlDefinition[] = [
  {
    type: ControlType.COMBOBOX,
    name: 'Variable',
    label:'Variable',
    masterField:'Variable',
    event :{
      moduleName: CRM_MASTER,
      serviceName:'',
      input:['NotificationCode'] 
  }
  }
  ]

  const actionBarButtons:IControlDefinition[]=[
    {
      type:ControlType.BUTTON,
      name:'saveBtn',
      label:'Save',
      isPrimary:true
    }
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
   serviceName: '',
  moduleName: CRM_MASTER,
  input: ['NotificationCode']
};

export const ManageEmailNotification:React.FC<IPageBaseProps> = (props) => {

  const {code} = usePageQueryParam();
  

  const initialData: IRFData = {
    NotificationCode: code,

    };
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} /> 
        <RFSection controls={Emailsection} columns={1} />
       <RFTabs>
        <RFTabItem headerText='Mail Body'>
        <RFSection controls={Mailbodysection} columns={2} />
        </RFTabItem>
        <RFTabItem headerText='Mail Parameters'>
        <RFSection controls={MailParameterssection} title={''}columns={2} />
        </RFTabItem>
       </RFTabs>
      </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} metaData={DataSection}/>
    </RetinaFormBuilder>
  );
};
