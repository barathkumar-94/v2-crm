import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { truncate } from 'lodash';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';

const searchInputs = ['Code', 'Description', 'Component','Status','Effective From','Effective To','Subject'];

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
  },
  {
    type: ControlType.COMBOBOX,
    name: 'Component',
    label: 'Component',
  },
  {
    type: ControlType.DATEPICKER,
    name: 'EffectiveFrom',
    label: 'Effective From'
  },
  {
    type: ControlType.DATEPICKER,
    name: 'EffectiveTo',
    label: 'Effective To'
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'Subject',
    label: 'Subject',
  },
  {
    type: ControlType.COMBOBOX,
    name: 'status',
    label: 'Status',
    masterField: 'status',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_EMAIL_SUMMARY',
      input: searchInputs,
    },
  },
];


const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'EmailNotificationgridsummary',
    isPrimeReactTable: true,
    filter:true,
    columns: [
      {
        title: 'Notification Code',
        dataField: 'NOTIFICATION_CODE',
        cellRendererParams: {
          event: {
            linkTo: '/ManageEmailNotification',
            linkParams: ['NOTIFICATION_CODE'],
            queryParams:[{sourceField:'NOTIFICATION_CODE', targetField:"code"}]
          },
        },
      },
      {
        title: 'Description',
        dataField: 'DESCRIPTION',
        
        
      },
      {
        title: 'Component ',
        dataField: 'COMPONENT',
      },
      {
        title: 'Effective From ',
        dataField: 'EFFECTIVE_FROM',
      },
      {
        title: 'Effective To',
        dataField: 'EFFECTIVE_TO',
      },
      {
        title: 'Subject',
        dataField: 'SUBJECT',
      },
      {
        title: 'Status',
        dataField: 'STATUS',
      },

    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Email Notification',
      event: {
        linkTo: '/ManageEmailNotification',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: '',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const EmailNotificationSummary:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <RFCRMToolbar toolbarControls={toolbarControls} filterControls={searchSection}/>
      <ScrollabeContainer hasHeader={true}>
        {/* <RFSection  controls={searchSection} columns={6} /> */}
        <RFSection controls={tableSection} title={'Search Results'} columns={1} className={'table-absolute-toolbar'}/>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
