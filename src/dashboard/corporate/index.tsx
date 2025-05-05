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
    name: 'totalOpportunities',
    label: 'Total Opportunities',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalOpportunitiesValue',
    label: 'Total Opportunities Value',
    //https://www.htmlsymbols.xyz/unicode/U+20B9
    prefixText: '\u20B9',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalLOI',
    label: 'Total LOI',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalLOIValue',
    label: 'Total LOI Value',
    prefixText: '\u20B9',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalPPA',
    label: 'Total PPA',
    format: '2',
    valueMaxFontSize: 24,
  },
];

const tileSection_2: IControlDefinition[] = [
  {
    type: ControlType.VALUE_TILE,
    name: 'totalPPAValue',
    label: 'Total PPA Value',
    prefixText: '\u20B9',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'salesleadconverter',
    label: 'Sales Team Top Lead Converter',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'leadConversionRate',
    label: 'Lead Conversion Rate',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'netRealizationWithSurplus',
    label: 'Net Realization (With Surplus) - YTD',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'netRealizationWithoutSurplus',
    label: 'Net Realization (Without Surplus)',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalRevenue',
    label: 'Total Revenue - YTD and Gross Margin',
    format: '2',
    valueMaxFontSize: 24,
  },
];

const actualGenerationChartSection: IControlDefinition[] = [
  {
    type: ControlType.WATERFALL_CHART,
    name: 'actualGeneration',
    variables: [
      {
        name: 'generation',
        description: 'Actual Generation',
        xAxisVariable: 'month',
        xAxisDescription: 'Month',
        textVariable: 'generation',
        measureVariable: 'measure',
        dataSetName: 'actualGeneration',
      },
    ],
    options: {
      showLegend: false,
      yAxis: {
        title: 'MW',
      },
    },
  },
];

const annualCommitmentChartSection: IControlDefinition[] = [
  {
    type: ControlType.BAR_CHART,
    name: 'annualCommitment',
    variables: [
      {
        name: 'commitment',
        description: 'Commitment',
        xAxisVariable: 'month',
        xAxisDescription: 'Month',
        textVariable: 'commitment',
        dataSetName: 'annualCommitment',
      },
    ],
    options: {
      showLegend: false,
      yAxis: {
        title: 'MW',
      },
    },
  },
];

const salesForceByStateChartSection: IControlDefinition[] = [
  {
    type: ControlType.PIE_CHART,
    name: 'salesForceByState',
    labelField: 'state',
    valueField: 'salesForce',
    options: {
      legendPosition: ChartLegendPositionEnum.RIGHT,
      textMode: 'percent',
    },
  },
];

const totalOperationCapacityChartSection: IControlDefinition[] = [
  {
    type: ControlType.BAR_CHART,
    name: 'totalOperationCapacity',
    variables: [
      {
        name: 'wind',
        description: 'Wind',
        textVariable: 'wind',
        xAxisVariable: 'state',
        xAxisDescription: 'State',
        dataSetName: 'totalOperationCapacity',
      },
      {
        name: 'solar',
        description: 'Solar',
        textVariable: 'solar',
        xAxisVariable: 'state',
        xAxisDescription: 'State',
        dataSetName: 'totalOperationCapacity',
      },
    ],
    options: {
      barMode: 'stack',
      yAxis: {
        title: 'Capacity (MW)',
      },
    },
  },
];

const totalOperationCapacitySoldChartSection: IControlDefinition[] = [
  {
    type: ControlType.BAR_CHART,
    name: 'totalOperationCapacitySold',
    variables: [
      {
        name: 'wind',
        description: 'Wind',
        textVariable: 'wind',
        xAxisVariable: 'state',
        xAxisDescription: 'State',
        dataSetName: 'totalOperationCapacitySold',
      },
      {
        name: 'solar',
        description: 'Solar',
        textVariable: 'solar',
        xAxisVariable: 'state',
        xAxisDescription: 'State',
        dataSetName: 'totalOperationCapacitySold',
      },
    ],
    options: {
      barMode: 'stack',
      yAxis: {
        title: 'Capacity (MW)',
      },
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_CORPORATE_DASHBOARD',
  moduleName: CRM_TRANSACTION,
  input: [],
};

export const CorporateDashboard: React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder
      scrollKey={props.scrollKey}
      onLoadEventParams={onLoadEventParams}
      // isSimulation
      simulationDataFileName="corporateDashboard.json">
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection
          controls={tileSection}
          transparent
          columns={'EQUAL_WIDTH'}
          className={'sales-dashboard-tile-section'}
        />

        <RFSection
          controls={tileSection_2}
          transparent
          columns={'EQUAL_WIDTH'}
          className={'sales-dashboard-tile-section corporate-dashboard-second-tile-section'}
        />

        <Container fluid className="pb-3">
          <Row>
            <Col xs={4} style={{paddingLeft: 0}}>
              <RFSection
                controls={actualGenerationChartSection}
                columns={1}
                title={'Actual Generation (YTD)'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={4} style={{padding: 0}}>
              <RFSection
                controls={annualCommitmentChartSection}
                columns={1}
                title={'Annual Commitment'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={4} style={{paddingRight: 0}}>
              <RFSection
                controls={salesForceByStateChartSection}
                columns={1}
                title={'Sales Force # by State'}
                className="eq-height-section-col"
              />
            </Col>
          </Row>
        </Container>

        <Container fluid className="pb-3">
          <Row>
            <Col xs={6} className="section-first">
              <RFSection
                controls={totalOperationCapacityChartSection}
                columns={1}
                title={'Total Operational Capacity'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={6} className="section-second">
              <RFSection
                controls={totalOperationCapacitySoldChartSection}
                columns={1}
                title={'Total Operation Capacity Sold'}
                className="eq-height-section-col"
              />
            </Col>
          </Row>
        </Container>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
