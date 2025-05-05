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
import { CRM_MASTER } from '../../common/constants';
// import { truncate } from 'lodash';

const searchInputs = ['firstname', 'lastname','mobile','email'];

const searchSection: IControlDefinition[] = [
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
      serviceName: 'SEARCH_CONTACT_SUM',
      input: searchInputs,
    },
  },
];

1
const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'ContactSummary',
    isHelpTable: true,
    columns: [
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
      {
        title: 'Company Name',
        dataField: 'COMPANY_NAME',
      },

    ],
  },
];



const onLoadEventParams: IRFEventParams = {
   serviceName: 'INIT_CONTACT_SUM',
  moduleName: CRM_MASTER,
  
};

export const contactHelp:React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={true}>
        <RFSection  controls={searchSection} columns={6} />
        <RFSection controls={tableSection}columns={1} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
