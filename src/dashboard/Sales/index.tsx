import * as React from 'react';
import {IPageBaseProps} from '../../common/objects';
import {
  ControlType,
  IControlDefinition,
  IRFEventParams,
  RFSection,
  RetinaFormBuilder,
  ScrollabeContainer,
} from '@retina360-ai/core-ui-library-v2';
import {RFCRMToolbar} from '../../common/components/toolbar';
import {CRM_TRANSACTION} from '../../common/constants';
import {Col, Container, Row} from 'reactstrap';
import {ChartLegendPositionEnum, PieChartTextFormatType} from '@retina360-ai/core-ui-library-v2';

const tileSection: IControlDefinition[] = [
  {
    type: ControlType.VALUE_TILE,
    name: 'totalLeads',
    label: 'Total Leads',
    format:'2',
    valueMaxFontSize:24
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalOpportunities',
    label: 'Total Opportunities',
    format:'2',
    valueMaxFontSize:24
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalOpportunitiesValue',
    label: 'Total Opportunities Value',
    //https://www.htmlsymbols.xyz/unicode/U+20B9
    prefixText:"\u20B9",
    format:'2',
    valueMaxFontSize:24
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalLOI',
    label: 'Total LOI',
    format:'2',
    valueMaxFontSize:24
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalLOIValue',
    label: 'Total LOI Value',
    prefixText:"\u20B9",
    format:'2',
    valueMaxFontSize:24
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalPPA',
    label: 'Total PPA',
    format:'2',
    valueMaxFontSize:24
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalPPAValue',
    label: 'Total PPA Value',
    prefixText:"\u20B9",
    format:'2',
    valueMaxFontSize:24
  },
];

const leadSourceChartSection: IControlDefinition[] = [
  {
    type: ControlType.PIE_CHART,
    name: 'leadSource',
    labelField: 'source',
    valueField: 'value',
    options: {
      legendPosition: ChartLegendPositionEnum.RIGHT,
      textMode:'percent'
    },
  },
];

const salesStagesChartSection: IControlDefinition[] = [
  {
    type: ControlType.FUNNEL_AREA_CHART,
    name: 'salesStages',
    labelField: 'stage',
    valueField: 'value',
    options: {
      legendPosition: ChartLegendPositionEnum.RIGHT,
    },
  },
];

const opportunityByIndustrySection: IControlDefinition[] = [
  {
    type: ControlType.PIE_CHART,
    name: 'opportunityByIndustry',
    labelField: 'industry',
    valueField: 'value',
    options: {
      legendPosition: ChartLegendPositionEnum.RIGHT,
      textMode:'percent'
    },
  },
];

const installationCapacityByStateSection: IControlDefinition[] = [
  {
    type: ControlType.BAR_CHART,
    name: 'installationCapacity',
    variables: [
      {
        name: 'wind',
        description: 'Wind',
        textVariable:'wind',
        xAxisVariable: 'state',
        xAxisDescription: 'State',
        dataSetName: 'installationCapacity',
      },
      {
        name: 'solar',
        description: 'Solar',
        textVariable:'solar',
        xAxisVariable: 'state',
        xAxisDescription: 'State',
        dataSetName: 'installationCapacity',
      },
    ],
    options:{
      barMode:'stack',
      yAxis:{
        title:'Capacity (MW)'
      }
    }
  },
];

const schemeDetailsChartSection: IControlDefinition[] = [
  {
    type: ControlType.BAR_CHART,
    name: 'schemeDetails',
    variables: [
      {
        name: 'count',
        description: 'Count',
        xAxisVariable: 'scheme',
        xAxisDescription: 'Scheme',
        textVariable: 'count',
        dataSetName: 'schemeDetails',
      },
    ],
    options: {
      showLegend:false
      //legendPosition: ChartLegendPositionEnum.RIGHT,
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_SALES_DASHBOARD',
  moduleName: CRM_TRANSACTION,
  input: [],
};

export const SalesDashboard: React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder
      scrollKey={props.scrollKey}
      onLoadEventParams={onLoadEventParams}
      //isSimulation
      simulationDataFileName="salesDashboard.json">
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection controls={tileSection} transparent columns={'EQUAL_WIDTH'} className={'sales-dashboard-tile-section'}/>

        <Container fluid className="pb-3">
          <Row>
            <Col xs={4} style={{paddingLeft: 0}}>
              <RFSection
                controls={leadSourceChartSection}
                columns={1}
                title={'Lead Source'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={4} style={{padding: 0}}>
              <RFSection
                controls={salesStagesChartSection}
                columns={1}
                title={'Opportunity Stages'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={4} style={{paddingRight: 0}}>
              <RFSection
                controls={opportunityByIndustrySection}
                columns={1}
                title={'Customer Segmentation'}
                className="eq-height-section-col"
              />
            </Col>
          </Row>
        </Container>

        <Container fluid className="pb-3">
          <Row>
            <Col xs={6} className="section-first">
              <RFSection
                controls={installationCapacityByStateSection}
                columns={1}
                title={'Installation Capacity By Site'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={6} className="section-second">
              <RFSection
                controls={schemeDetailsChartSection}
                columns={1}
                title={'Scheme Count'}
                className="eq-height-section-col section-title-text-secondary-900"
              />
            </Col>
          </Row>
        </Container>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
