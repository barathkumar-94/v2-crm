import * as React from 'react';
import {
  ScrollabeContainer,
  RFActionBar,
  RetinaFormBuilder,
  IControlDefinition,
  IRFEventParams,
  ControlType,
  TableCellEditorType,
  IRFData, 
  RFSection,
  RFScreenToolbar,
  WithConfiguratorPageContainer,
  usePageQueryParam,
} from '@retina360-ai/core-ui-library-v2';;
import {WorkFlowHelp} from '../Workflow/workflowHelp';
import { CRM_MASTER, CRM_USER, DATE_TIME_FORMAT } from '../../common/constants';
import { IPageBaseProps } from '../../common/objects';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { RFFooter } from '../../common/components/footer';
import { usermasterHelp } from '../UserMaster/usermasterHelp';
import { DataSection } from '../Rolemaster/managerole';



const tableSection: IControlDefinition[] = [
  {
    type: ControlType.TABLE,
    name: 'workFlowDetails',
    isPrimeReactTable: true,
    columns: 
    [      
      {
        title: 'Component',
        dataField: 'COMPONENT',
        hidden:true
      },
      {
        title: 'Component',
        dataField: 'COMPONENT_DESC'
      },
      {
        title: 'Is Enable?',
        dataField: 'IS_ENABLE',
        cellEditor: TableCellEditorType.COMBOBOX,
        
        cellEditorParams: {
          masterField: 'IS_ENABLE',
        }
      }
    ],
  },
];

const actionInputs = [
    'workFlowDetails'   
];

const actionBarButtons: IControlDefinition[] = [
  {
    type: ControlType.BUTTON,
    isPrimary: true,
    name: 'save',
    label: 'Save',
    event: {
      serviceName: 'SAVE_WORKFLOW_ACCESS',
      moduleName: CRM_MASTER,
      input: [...actionInputs],
    },
  }
];


const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_WORKFLOW_ACCESS',
  moduleName: CRM_MASTER,
  input: [],
};



export const WorkflowAccess:React.FC<IPageBaseProps> = (props) => {
  const {code} = usePageQueryParam();
  const initialData: IRFData = {
    workFlowCode: code
    };
  return (
    <RetinaFormBuilder initialValues={initialData}  scrollKey={props.scrollKey}  onLoadEventParams={onLoadEventParams} className={'page-with-footer-btn-meta'} prompt>
      <RFCRMToolbar hasBackButton/>
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={tableSection} columns={1} className={'section-header-bg-primary'} collapse={false}/>
            </ScrollabeContainer>
      <RFFooter buttons={actionBarButtons} />
    </RetinaFormBuilder>
  );
};