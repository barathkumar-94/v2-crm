import {NOTIFICATION_LEVEL, generateRandomSequence} from '@retina360-ai/core-ui-library-v2';
import {
  ControlType,
  IControlDefinition,
  IRFData,
  IRFEventParams,
  RFActionBar,
  RFSection,
  RetinaFormBuilder,
  RetinaFormParentContext,
  ScrollabeContainer,
} from '@retina360-ai/core-ui-library-v2';
import {FormikProps} from 'formik';
import {Dictionary} from 'lodash';
import * as React from 'react';
import {CRM_MASTER, CRM_USER} from '../../common/constants';
import {rowKeyColumn} from "@retina360-ai/core-ui-library-v2/lib/form-components/objects/constants";

const ruleNameSection: IControlDefinition[] = [
  {
    type: ControlType.TEXTBOX,
    name: 'priority',
    label: 'Priority',
    required: true,
    inputType:'integer'
  },
  {
    type: ControlType.TEXTBOX,
    name: 'ruleName',
    label: 'Rule Name',
    required: true,
    maxLength:100
  },
  {
    type: ControlType.COMBOBOX,
    name: 'workFlowCode',
    label: 'Workflow Code',
    required: true
  },
  {
    type: ControlType.DATEPICKER,
    name: 'effectiveFrom',
    label: 'Effective From',
    required: true,
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'effectiveTo'
    }
  },
  {
    type: ControlType.DATEPICKER,
    name: 'effectiveTo',
    label: 'Effective To',
    required: true,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'effectiveFrom'
    }
  },
];

const queryBuildersection: IControlDefinition[] = [
  {
    type: ControlType.QUERY_BUILDER,
    name: 'rule',
    masterField: 'workflowrule',
    //valueEditorDecimalLimit : 2
    //required: true,
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_WORKFLOW_RULE_MODAL',
  moduleName: CRM_MASTER,
  input:['component']
};

const input = ['priority','component','workFlowCode','effectiveFrom','effectiveTo','ruleId', 'ruleName', 'rule', 'rule_query'];

interface IRuleBuilderModalProps {
  ruleId: string;
  ruleName: string;
}

export const WorkflowRuleBuilderModal: React.FC<IRuleBuilderModalProps> = (props) => {
  const parentContext = React.useContext(RetinaFormParentContext);

  const actionBar: IControlDefinition[] = [
    {
      type: ControlType.BUTTON,
      isPrimary: true,
      name: 'save',
      label: 'Save',
      event: {
        moduleName: CRM_MASTER,
        serviceName: 'SAVE_WORKFLOW_RULE',
        input: input,
        closeModal: true,
        callbackMethod: (pageData, notificationLevels) => {
          updateRuleTableRowItem(
            parentContext.getParentFormikContext(),
            notificationLevels,
            'workFlowRuleDetails',
            pageData,
            input,
            'ruleId',
            !!props.ruleName
          );
        },
      },
    },
  ];

  const initialData = {
    ...props,
    ruleId: props.ruleId ?? generateRandomSequence(),
  };

  return (
    <RetinaFormBuilder initialValues={initialData} onLoadEventParams={onLoadEventParams}>
      <ScrollabeContainer hasHeader={false} className="p-0">
        <RFSection controls={ruleNameSection} transparent />
        <RFSection controls={queryBuildersection} columns={1} transparent />
        <RFActionBar controls={actionBar} />
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};

const getRuleRowValidValues = (pageData: IRFData, fieldNames: string[]): Dictionary<string> => {
  return fieldNames.reduce((acc, field) => {
    acc[field] = pageData[field] ?? null;
    return acc;
  }, {} as Dictionary<string>);
};

const updateRuleTableRowItem = (
  formikContext: FormikProps<any>,
  notifications: NOTIFICATION_LEVEL[],
  tableName: string,
  pageData: IRFData,
  input: string[],
  keyColumn: 'ruleId' | 'id',
  isEdit: boolean
) => {
  if (!isSavedSuccessfully(notifications)) {
    return;
  }

  const {values} = formikContext;
  const tableData: any[] = Array.isArray(values[tableName]) ? values[tableName] : [];

  if (isEdit) {
    let tableRowIndex = tableData.findIndex((x) => x[keyColumn] === pageData[keyColumn]);
    formikContext.setFieldValue(`${tableName}[${tableRowIndex}]`, {...pageData});
  } else {
    //adding the new row to formik
    formikContext.setFieldValue(`${tableName}[${tableData.length}]`, {
      ...getRuleRowValidValues(pageData, input),
      recStatus: 'I',
      [rowKeyColumn]: generateRandomSequence(),
    });
  }
};

const isSavedSuccessfully = (notifications: NOTIFICATION_LEVEL[]) =>
  notifications.length > 0 && notifications.every((x) => x === 'success');
