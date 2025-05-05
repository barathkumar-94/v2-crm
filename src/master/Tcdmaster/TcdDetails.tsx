import {
  generateRandomSequence,
  isQueryApiAllMessageLevelSuccess,
  NOTIFICATION_LEVEL,
} from '@retina360-ai/core-ui-library-v2';
import {
  ControlType,
  IControlDefinition,
  IRFData,
  IRFEventParams,
  isAllMessageLevelSuccess,
  RetinaFormBuilder,
  RetinaFormParentContext,
  RFActionBar,
  RFSection,
  ScrollabeContainer,
} from '@retina360-ai/core-ui-library-v2';
import {rowKeyColumn} from '@retina360-ai/core-ui-library-v2/lib/form-components/objects/constants';
import {FormikProps} from 'formik';
import {Dictionary} from 'lodash';
import * as React from 'react';

const baseInputSection: IControlDefinition[] = [

  {
    label: 'Nature',
    name: 'NATURE',
    type: ControlType.COMBOBOX,
    required: true,
  },
  {
    label: 'Value',
    name: 'VALUE',
    type: ControlType.TEXTBOX,
    inputType: 'number',
    required: true,
    hidden: (pageData) => pageData.NATURE === 'FORMULA',
  },

  {
    label: 'Value_JSON',
    name: 'VALUE_json',
    hidden:true,
    type: ControlType.TEXTBOX,
    inputType: 'number',
    required: true,
    },

  {
    label:'Effective From',
    name:'EFFECTIVE_FROM',
    type: ControlType.DATEPICKER,
    required: true,
    dateRangeProps:{
      dateType:'startDate',
      dependentControl:'EFFECTIVE_TO'
    }
  },
  
  {
    label:'Effective To',
    name:'EFFECTIVE_TO',
    type: ControlType.DATEPICKER,
    required: true,
    dateRangeProps:{
      dateType:'endDate',
      dependentControl:'EFFECTIVE_FROM'
    }
  },
 


];

const formulaBuilderSection: IControlDefinition[] = [
  {
    type: ControlType.ARITHMATIC_OPERATION_BUILDER,
    name: 'formula',
    masterField: 'column',
    label: 'Formula',
    required: true,
    hidden: (pageData) => pageData.NATURE != 'FORMULA',
  },
];

const input = ['NATURE', 'VALUE', 'formula','EFFECTIVE_FROM','EFFECTIVE_TO','KEY'];

interface ITcdDetailsModalProps {
  NATURE?: string;
  VALUE?: string;
  $ckey?: string;
}

export const TcdDetailsModal: React.FC<ITcdDetailsModalProps> = (props) => {
  const parentContext = React.useContext(RetinaFormParentContext);

  //console.log('props', props);

  const actionBar = React.useMemo((): IControlDefinition[] => {
    return [
      {
        type: ControlType.BUTTON,
        isPrimary: true,
        name: 'save',
        label: 'Save',
        event: {
          input,
          closeModal: true,
          callbackMethod: (pageData) => {
            updateTableRowItem(
              parentContext.getParentFormikContext(),
              'Tcddetailsgrid',
              pageData,
              props,
              !!props.NATURE
            );
          },
        },
      },
    ];
  }, []);

  const masters = {
    // NATURE: [
    //   {
    //     id: 'FLAT',
    //     value: 'Flat',
    //   },
    //   {
    //     id: 'FORMULA',
    //     value: 'Formula',
    //   },
    //   {
    //     id: 'PERCENTAGE',
    //     value: 'Percentage',
    //   },
    // ],
    // column: [
    //   {id: 'column1', value: 'Column 1'},
    //   {id: 'column2', value: 'Column 2'},
    //   {id: 'column3', value: 'Column 3'},
    // ],
  };
  const onLoadEventParams: IRFEventParams = {
    serviceName: 'RCRM_CONFIGURE_TCD_INIT_MST',
    moduleName: 'CRM_Master',
      input: [' ']
  };

  console.log('props', props);
  const initialData = getPageValidValues(props);

  return (
    <RetinaFormBuilder
      initialValues={initialData}
      onLoadEventParams={onLoadEventParams}
      initialRetinaFormState={{
        masters,
      }} className={'page-with-footer-btn'}>
      {({values}) => (
        <>
          <ScrollabeContainer hasHeader={false}>
            <RFSection controls={baseInputSection} columns={3} transparent />
            <RFSection
              controls={formulaBuilderSection}
              columns={1}
              transparent={true}
              className={values.NATURE === 'FORMULA' ? 'hidden' : ''}
            />
          </ScrollabeContainer>
          <RFActionBar controls={actionBar} className={'rf-footer-btn'} />
        </>
      )}
    </RetinaFormBuilder>
  );
};

const getPageValidValues = (rowData: IRFData): Dictionary<string> => {
  let value = rowData['NATURE'] == 'FORMULA' ? null : rowData['VALUE'];
  let formula = rowData['NATURE'] == 'FORMULA' ? rowData['VALUE'] : null;
  let formula_json = rowData['NATURE'] == 'FORMULA' ? rowData['VALUE_json'] : null;

  return {
    NATURE: rowData['NATURE'] ?? null,
    VALUE: value ?? null,
    formula: formula ?? null,
    formula_json: formula_json ?? null,
    EFFECTIVE_FROM: rowData['EFFECTIVE_FROM'] ?? null,
    EFFECTIVE_TO: rowData['EFFECTIVE_TO'] ?? null,
    KEY: rowData['KEY'] ?? null,
    STATUS: rowData['STATUS'] ?? null,
    //VALUE_json: rowData['VALUE_json'] ?? null

  };
};

const getRowValidValues = (pageData: IRFData): Dictionary<string> => {
  let value = pageData['NATURE'] == 'FORMULA' ? pageData['formula'] : pageData['VALUE'];
  let value_json = pageData['NATURE'] == 'FORMULA' ? pageData['formula_json'] : null;
  return {
    NATURE: pageData['NATURE'] ?? null,
    VALUE: value ?? null,
    VALUE_json: value_json ?? null,
    EFFECTIVE_FROM: pageData['EFFECTIVE_FROM'] ?? null,
    EFFECTIVE_TO: pageData['EFFECTIVE_TO'] ?? null,
    KEY: pageData['KEY'] ?? null,
    STATUS: pageData['STATUS'] ?? null,
    //VALUE_json: pageData['VALUE_json'] ?? null
  };
};

const updateTableRowItem = (
  formikContext: FormikProps<any>,
  tableName: string,
  pageData: IRFData,
  rowData: ITcdDetailsModalProps,
  isEdit: boolean
) => {
  const {values} = formikContext;
  const tableData: any[] = Array.isArray(values[tableName]) ? values[tableName] : [];

  if (isEdit) {
    let tableRowIndex = tableData.findIndex((x) => x[rowKeyColumn] === rowData[rowKeyColumn]);
    formikContext.setFieldValue(`${tableName}[${tableRowIndex}]`, {...rowData, ...getRowValidValues(pageData)});
  } else {
    //adding the new row to formik
    formikContext.setFieldValue(`${tableName}[${tableData.length}]`, {
      ...getRowValidValues(pageData),
      recStatus: 'I',
      [rowKeyColumn]: generateRandomSequence(),
    });
  }
};
