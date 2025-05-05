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
import { IPageBaseProps } from '../../common/objects';

import { RFCRMToolbar } from '../../common/components/toolbar';


const actionInputs = ['sitecode', 'sitename', 'x', 'siteoverallcapacity', 'uom', 
'creditrating','stage','status','address','city','state','district','pincode','country','lat',
'long','survey','village','taluk','region','schemeDetail','generationtype'
];


const siteDetailsSection: IControlDefinition[] = [
  {
    type: ControlType.DISPLAY,
    name: 'sitecode',
    label: 'Site Code',
 
   
  },
  {
    type: ControlType.DISPLAY,
    name: 'sitename',
    label: 'Site Name',
   
  },

  {
    type: ControlType.DISPLAY,
    name: 'generationtype',
    label: 'Site Category',
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'siteoverallcapacity',
    label: 'Site Overall Capacity',
    
  },
  {
    type: ControlType.DISPLAY,
    name: 'uom',
    label: 'UOM',
    
  
  },
  {
    type: ControlType.DISPLAY,
    name: 'status',
    label: 'Status',
  },
  {
    type: ControlType.DISPLAY,
    name: 'creditrating',
    label: 'Credit Rating',
  },
  {
    type: ControlType.DISPLAY,
    name: 'stage',
    label: 'Stage',
 
  },

];

const siteAddress: IControlDefinition[] = [
    {
      type: ControlType.DISPLAY,
      name: 'address',
      label: 'Address',
      
    },
    {
      type: ControlType.DISPLAY,
      name: 'city',
      label: 'City',
      
    },
    {
      type: ControlType.DISPLAY,
      name: 'state',
      label: 'State',
    },
    {
      type: ControlType.DISPLAY,
      name: 'district',
      label: 'District',

    },
    {
      type: ControlType.DISPLAY,
      name: 'pincode',
      label: 'Pincode',

    },
    {
      type: ControlType.DISPLAY,
      name: 'country',
      label: 'Country',
    },
    {
        type: ControlType.DISPLAY,
        name: 'lat',
        label: 'Lat',
       
      },
      {
        type: ControlType.DISPLAY,
        name: 'long',
        label: 'Long',
     
      },
      {
        type: ControlType.DISPLAY,
        name: 'survey',
        label: 'Survey',
      },
      {
        type: ControlType.DISPLAY,
        name: 'village',
        label: 'Village',
      },  
      {
        type: ControlType.DISPLAY,
        name: 'taluk',
        label: 'Taluk',
      }, 
      {
        type: ControlType.DISPLAY,
        name: 'region',
        label: 'Region',
      
      }, 
  ];
  
  const siteCapacityDetailstableSection: IControlDefinition[] = [
    {
      type: ControlType.TABLE,
      name: 'siteCapacitygrid',
      isPrimeReactTable: true,
      column: 12,
     
      columns: [
        {
          title: 'Generation Type',
          dataField: 'GENERATION_TYPE', 
        },
        {
            title: 'Make',
            dataField: 'MAKE',
    
        },
        {
        title: 'Model',
        dataField: 'MODEL',
        },
        {
          title: 'Manfacturer',
          dataField: 'MANUFACTURER',
          
       },
      
        {
            title: 'Capacity',
            dataField: 'CAPACITY',         
          },
      
        {
            title: 'UOM',
            dataField: 'UOM',          
          },
        {
            title: 'Quantity',
            dataField: 'QUANTITY',
           
        },
       {
          title: 'Remarks',
          dataField: 'REMARKS',
         
        },
    ],

    },
]
const additionalNotestableSection: IControlDefinition[] = [
    {
        type: ControlType.DISPLAY,
        name: 'schemeDetail',
        column: 10,
        multiLine:true,
        autoAdjustHeight:true
        
},
]   

  const onLoadEventParams: IRFEventParams = {
    serviceName: 'INIT_VIEWSITE_MST',
    moduleName: 'CRM_Master',
      input: ['sitecode','sitename']
  };
  
  export const ViewSite:React.FC<IPageBaseProps> = (props) => {
      // const {code,name} = usePageQueryParam();
  
      // const initialData: IRFData = {
      //   sitecode: code,
      //   sitename: name
      //   };
  
  
    return (
      <RetinaFormBuilder initialValues={props} onLoadEventParams={onLoadEventParams} >
        <ScrollabeContainer hasHeader={false}>
          <RFSection  controls={siteDetailsSection} title={'Site Details'} columns={6} />
          <RFSection   controls={siteAddress} title={'Site Address'} columns={6} />
          <RFSection controls={siteCapacityDetailstableSection} title={'Site Capacity Details'} columns={1} className={'table-absolute-toolbar'}/>
          <RFSection controls={additionalNotestableSection} title={'Additional Details'} columns={1} />  
        </ScrollabeContainer>
      </RetinaFormBuilder>
    );
  };