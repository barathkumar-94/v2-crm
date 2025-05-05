import * as React from 'react';

import {
ScrollabeContainer,
ControlType,
RetinaFormBuilder,
RFSection,
IControlDefinition,
IRFEventParams,
TableCellRendererType,
TableColDef,
} from '@retina360-ai/core-ui-library-v2';
import { IPageBaseProps } from '../../common/objects';
import { Dictionary, truncate } from 'lodash';
import { CRM_BILLING, CRM_MASTER, DATE_FORMAT, HH_MM } from '../../common/constants';
import { RFCRMToolbar } from '../../common/components/toolbar';
import { UpdateColumnsToMergeCoumnDefWithDynamicColumn } from '../../common/utils/table';

const PrintInputs = ['generationyear','generationperiod','gctype'];

const PrintSection: IControlDefinition[] = [

{
type: ControlType.COMBOBOX,
name: 'generationyear',
label: 'Generation Year',
masterField:'generationyear',
event :{
serviceName:'RCRM_SYSTEM_ALLOTMENT_YEAR_ONCHANGE',
moduleName :CRM_BILLING,
input:['generationyear']
}
},

{
type: ControlType.COMBOBOX,
name: 'generationperiod',
label: 'Generation Period',
//required:true,
masterField:'generationperiod'
},
{
type: ControlType.COMBOBOX,
name: 'gctype',
label: 'GC Type',
masterField:'gctype',
required:true,
},
//   {
//     type: ControlType.COMBOBOX,
//     name: 'wtg',
//     label: 'WTG',
//     masterField:'wtg',
//     //required:true,
//   },

{
type: ControlType.BUTTON,
name: 'SearchBtn',
label: 'Search',
isPrimary: true,
event: {
moduleName:CRM_BILLING,
serviceName: 'RCRM_SYSTEM_ALLOTMENT_SEARCH',
input: PrintInputs,
},
},
];

const cols: Dictionary<TableColDef[]> = {
  '': [
    {
      title: 'Seq No',
      dataField: 'sort_order' ,
      hidden:true     
    },
    {
      title: 'Customer Name',
      dataField: 'CUSTOMER_NAME'
    },
     {
       title: 'Service Number',
       dataField: 'SERVICE_NUMBER'
              
     },
     
  ]
 } 

const WTGGridSection: IControlDefinition[] = [
{
type: ControlType.TABLE,
name: 'WTGwiseallocationGrid',
isPrimeReactTable: true,
isDynamicColumn:true,
column: 12,
editorProps:{
isEditable:false,
hideAdd:false,
hideDelete:false,
},
pivotProps: {
indexVariable: ['CUSTOMER_NAME','SERVICE_NUMBER'],
columnVariable: ['HEADING', 'GRID_COLUMN_NAME'],
},
columns: UpdateColumnsToMergeCoumnDefWithDynamicColumn(cols)
},
]






const onLoadEventParams: IRFEventParams = {
serviceName: 'RCRM_INIT_SYSTEM_ALLOTMENT',
moduleName: CRM_BILLING,
};


export const SystemAllotment :React.FC<IPageBaseProps> = (props) => {
return (
<RetinaFormBuilder  scrollKey={props.scrollKey} onLoadEventParams={onLoadEventParams}>
<RFCRMToolbar />
<ScrollabeContainer hasHeader={true}>
<RFSection  controls={PrintSection} columns={6} /> 
<RFSection controls={WTGGridSection} columns={1} className={'table-absolute-toolbar'}/>
</ScrollabeContainer>
</RetinaFormBuilder>
);
};
