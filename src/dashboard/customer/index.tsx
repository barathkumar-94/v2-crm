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
    name: 'totalPPA',
    label: 'Total PPA',
    format: '2',
    valueMaxFontSize: 24,
  },
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
    name: 'paymentSecurityValue',
    label: 'Payment Security Value',
    prefixText: '\u20B9',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalGenerationUnits',
    label: 'Total Generation Units - YTD',
    suffixText: 'MW',
    format: '2',
    valueMaxFontSize: 24,
    className:'customer-dashboard-total-gen-tile'
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalConsumptionUnits',
    label: 'Total Consumption Units - YTD',
    suffixText: 'MW',
    format: '2',
    valueMaxFontSize: 24,
    className:'customer-dashboard-total-consumption-tile'
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'totalBillValue',
    label: 'Total Bill Value',
    prefixText: '\u20B9',
    format: '2',
    valueMaxFontSize: 24,
  },
  {
    type: ControlType.VALUE_TILE,
    name: 'lastBillValue',
    label: 'Last Bill Value',
    prefixText: '\u20B9',
    format: '2',
    valueMaxFontSize: 24,
  },
];

const monthlyDemandChartSection: IControlDefinition[] = [
  {
    type: ControlType.BAR_CHART,
    name: 'monthlyDemand',
    variables: [
      {
        name: 'demand',
        description: 'Demand',
        xAxisVariable: 'month',
        xAxisDescription: 'Month',
        textVariable: 'demand',
        dataSetName: 'monthlyDemand',
      },
    ],
    options: {
      showLegend: false,
      yAxis:{
        title:'MW'
      }
    },
  },
];

const consumptionTrendChartSection: IControlDefinition[] = [
  {
    type: ControlType.TREND_CHART,
    name: 'consumptionTrend',
    variables: [
      {
        name: 'consumption',
        description: 'Consumption',
        xAxisVariable: 'month',
        xAxisDescription: 'Month',
        textVariable: 'consumption',
        dataSetName: 'consumptionTrend',
      },
    ],
    options: {
      showLegend: false,
      yAxis:{
        title:'MW'
      }
    },
  },
];

const consumptionBySourceChartSection: IControlDefinition[] = [
  {
    type: ControlType.PIE_CHART,
    name: 'consumptionBySource',
    labelField: 'source',
    valueField: 'consumption',
    options: {
      legendPosition: ChartLegendPositionEnum.RIGHT,
      textMode: 'percent',
    },
  },
];

const onLoadEventParams: IRFEventParams = {
  serviceName: 'INIT_CUSTOMER_DASHBOARD',
  moduleName: CRM_TRANSACTION,
  input: [],
};

export const CustomerDashboard: React.FC<IPageBaseProps> = (props) => {
  return (
    <RetinaFormBuilder
      scrollKey={props.scrollKey}
      onLoadEventParams={onLoadEventParams}
      isSimulation
      simulationDataFileName="customerDashboard.json">
      <RFCRMToolbar />
      <ScrollabeContainer hasHeader={true}>
        <RFSection
          controls={tileSection}
          transparent
          columns={'EQUAL_WIDTH'}
          className={'sales-dashboard-tile-section'}
        />

        <Container fluid className="pb-3">
          <Row>
            <Col xs={4} style={{paddingLeft: 0}}>
              <RFSection
                controls={monthlyDemandChartSection}
                columns={1}
                title={'Monthly Demand'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={4} style={{padding: 0}}>
              <RFSection
                controls={consumptionTrendChartSection}
                columns={1}
                title={'Consumption Trend'}
                className="eq-height-section-col"
              />
            </Col>

            <Col xs={4} style={{paddingRight: 0}}>
              <RFSection
                controls={consumptionBySourceChartSection}
                columns={1}
                title={'Consumption by Generation Source'}
                className="eq-height-section-col"
              />
            </Col>
          </Row>
        </Container>
      </ScrollabeContainer>
    </RetinaFormBuilder>
  );
};
