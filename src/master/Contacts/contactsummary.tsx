import * as React from 'react';

import {
  ScrollabeContainer,
  ControlType,
  RetinaFormBuilder,
  RFSection,
  IControlDefinition,
  IRFEventParams,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { CRM_MASTER } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
// import { truncate } from 'lodash';

const searchInputs = ['companyname','firstname', 'lastname','mobile','email','crn'];

const searchSection: IControlDefinition[] = [
 
  {
    type: ControlType.TEXTBOX,
    name: 'companyname',
    label: 'Company Name',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'crn',
    label: 'CIN',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'firstname',
    label: 'First Name',
  
  },
  {
    type: ControlType.TEXTBOX,
    name: 'lastname',
    label: 'Last Name',
  },
  {
    type: ControlType.TEXTBOX,
    name: 'mobile',
    label: 'Mobile',
    inputType:"number",
  },
  {
    type: ControlType.TEXTBOX,
    name: 'email',
    label: 'Email',
  },
  {
    type: ControlType.BUTTON,
    name: 'searchBtn',
    label: 'Search',
    isPrimary: true,
    event: {
      moduleName: CRM_MASTER,
      serviceName: 'SEARCH_CONTACT_MASTER',
      input: searchInputs,
    },
  },
];

1
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ContactSummary',
    isPrimeReactTable: true,
    columns: [


      {
        title: 'CIN',
        dataField: 'CRN',
        cellRenderer:TableCellRendererType.TEXT,

        cellRendererParams: {
          event: {
            linkTo: '/ManageContact',
          //  linkParams: ['FIRST_NAME'],
            queryParams:[{sourceField:'CRN', targetField:"name"}]
          },
        },
       
      },
      {
        title: 'Company Name',
        dataField: 'COMPANY_NAME',
        // cellRenderer:TableCellRendererType.TEXT,

        // cellRendererParams: {
        //   event: {
        //     linkTo: '/ManageContact',
        //   //  linkParams: ['FIRST_NAME'],
        //     queryParams:[{sourceField:'CRN', targetField:"name"}]
        //   },
        // },
      },

     

      {
        title: 'First Name',
        dataField: 'FIRST_NAME',
       
      },
      {
        title: 'Last Name',
        dataField: 'LAST_NAME',
      },
      {
        title: 'Mobile',
        dataField: 'MOBILE',
        
      },
      {
        title: 'Phone',
        dataField: 'PHONE',
       

        
      },
      {
        title: 'Email',
        dataField: 'EMAIL',
      },
      {
        title: 'Department',
        dataField: 'DEPARTMENT',
      },
      {
        title: 'Designation',
        dataField: 'DESIGNATION',
      },
     
    ],
  },
];

const toolbarControls: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      name: 'managebtn',
      isPrimary: true,
      label: 'Manage Contact',
      event: {
        linkTo: '/ManageContact',
      },
    },
  ];

const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_CONTACT_SUM',
  moduleName: CRM_MASTER,
  input: searchInputs,
};

export const ContactSummary:React.FC<IPageBaseProps> = (props) => {
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
