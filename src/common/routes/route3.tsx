import {Dictionary} from 'lodash';
import * as React from 'react';
import {StateSummary} from '../../master/State/statesummary';
import {ContactSummary} from '../../master/Contacts/contactsummary';
import {ManageContact} from '../../master/Contacts/managecontacts';
import {ManageAgreement} from '../../master/Agreement/manageagreement';
import {AgreementSummary} from '../../master/Agreement/agreementsummary';
import {AssetSummary} from '../../master/Assets/assetSummary';
import {ManageAsset} from '../../master/Assets/manageAsset';
import {TODBreakupSummary} from '../../master/TodBreakup/todBreakupSummary';
import {ManageTodBreakup} from '../../master/TodBreakup/manageTodBreak';
import {FinalBillSummary} from '../../billing/FinalBillAuthorization/FinalBillSummary';
import {Finaldirectbill} from '../../billing/FinalBillAuthorization/FinalDirectBill';
import {ICRMRouteComponent} from './objects';
import { ResourceSummary } from '../../master/ResourceMaster/resourcesummary';
import { ManageResource } from '../../master/ResourceMaster/manageresource';
import { ResourceGrouping } from '../../master/ResourceMaster/resourcegrouping';
import { DailyMeterReadingRecon } from '../../energyAccounting/DailyMeterReading/DailyMeterReadingRecon';
import { ConsumerBillData } from '../../energyAccounting/ConsumerDiscomData/consumerBillData';
import { ConsumerDiscomSummary } from '../../energyAccounting/ConsumerDiscomData/consumerBillDataSummary';
import { ProvisionalBillSummary } from '../../billing/ProvisionalBillGeneration/ProvisionalBillSummary';
import { ProvisionalBillGeneration } from '../../billing/ProvisionalBillGeneration/ProvisionalBillGeneration';
import { FinalManageBill } from '../../billing/FinalBillAuthorization/FinalDirectBillPPA';
import { ProvisionalViewBills } from '../../billing/ProvisionalBillGeneration/ViewBills';
import { ProvisionalErrorLog } from '../../billing/ProvisionalBillGeneration/ErrorLog';
import { ManageProvisionalBill } from '../../billing/ProvisionalBillGeneration/ManageProvisionalBill';
import { SldcSummary } from '../../energyAccounting/SLDCData/SldcSummary';
import { ManageSldcData } from '../../energyAccounting/SLDCData/ManageSldcData';
import { ConsumerCreditDataSummary } from '../../energyAccounting/ConsumerCreditData/consumerCreditDataSummary';
import { ConsumerCreditData } from '../../energyAccounting/ConsumerCreditData/consumerCreditData';
import { CRM_BILLING } from '../constants';
import { WindElectricalShareReport } from '../../Reports/WindElectricalShare/WindShare';
import { SolarElectricalShareReport } from '../../Reports/SolarElectricalShare/SolarShare';
import { MGR15min } from '../../Reports/MGR15/MGR15min';
import { HTSCWiseDemandPlan } from '../../Reports/HTSCAllocation/HTSCAllocation';
import { LineLoss } from '../../Reports/LineLoss/LineLoss';
import { WTGWiseReport } from '../../Reports/WTGwiseStatement/WTGWiseStatement';
import { Allocation } from '../../Reports/CustomerAllocation/allocation';
import { WTGGeneration } from '../../Reports/WTGGeneration/WTGGeneration';
import { WTGConsumerAllocation } from '../../Reports/WTGConsumerAllocation/WTGConsumerAllocation';

export const route3: Dictionary<ICRMRouteComponent> = {
  '/StateSummary': {
    component: <StateSummary />,
    title:'State Summary',
    moduleName: 'SETUP',
  },
  '/ContactSummary': {
    component: <ContactSummary />,
    title:'Contact Summary',
    moduleName: 'CRM',
  },
  '/ManageContact': {
    component: <ManageContact />,
    title:'Manage Contact',
    moduleName: 'CRM',
    parentRoute:'/ContactSummary'
  },
  '/ManageAgreement': {
    component: <ManageAgreement />,
    title:'Manage Agreement',
    moduleName: 'CRM',
    parentRoute:'/AgreementSummary'
  },
  '/AgreementSummary': {
    component: <AgreementSummary />,
    title:'Agreement Summary',
    moduleName: 'CRM',
  },
  '/AssetSummary': {
    component: <AssetSummary />,
    title:'Asset Summary',
    moduleName: 'SETUP',
  },
  '/ManageAsset': {
    component: <ManageAsset />,
    title:'Manage Asset',
    moduleName: 'SETUP',
    parentRoute:'/AssetSummary'
  },
  '/TODBreakupSummary': {
    component: <TODBreakupSummary />,
    title:'TOD Breakup Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageTodBreakup': {
    component: <ManageTodBreakup />,
    title:'Manage TOD Breakup',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/TODBreakupSummary'
  },
  '/FinalBillSummary': {
    component: <FinalBillSummary />,
    title:'Bill Summary',
    moduleName: 'BILLING',
  },


 
  '/FinalDirectBill': {
    component: <Finaldirectbill />,
    title:'Manage Bill',
    moduleName: 'BILLING',
    parentRoute:'/FinalBillSummary'
  },
  '/FinalManageBill': {
    component: <FinalManageBill />,
    title:'Manage Bill',
    moduleName: 'BILLING',
    parentRoute:'/FinalBillSummary'
  } ,
   '/ResourceSummary': {
    component: <ResourceSummary />,
    title:'Resource Summary',
    moduleName: 'SETUP',
  },
  '/ManageResource': {
    component: <ManageResource />,
    title:'Manage Resource',
    moduleName: 'SETUP',
    parentRoute:'/ResourceSummary'
  },
  '/ResourceGrouping': {
    component: <ResourceGrouping />,
    title:'Resource Grouping',
    moduleName: 'SETUP',
    parentRoute:'/ResourceSummary'
  },
  '/DailyMeterReadingRecon': {
    component: <DailyMeterReadingRecon />,
    title:'Daily Meter Reading Reconciliation',
    moduleName: 'ENERGYACCOUNTING'
  },
  '/ConsumerDiscomSummary': {
    component: <ConsumerDiscomSummary />,
    title:'HT Bill Entry Summary',
    moduleName: 'ENERGYACCOUNTING'
  },
  '/ConsumerBillData': {
    component: <ConsumerBillData />,
    title:'Manage HT Bill Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/ConsumerDiscomSummary'
  },

  '/ConsumerCreditDataSummary': {
    component: <ConsumerCreditDataSummary />,
    title:'Consumer Credit Data Summary',
    moduleName: 'ENERGYACCOUNTING'
  },
  '/ConsumerCreditData': {
    component: <ConsumerCreditData />,
    title:'Manage Consumer Credit Data',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/ConsumerCreditDataSummary'
  },
  '/ProvisionalBillSummary': {
    component: <ProvisionalBillSummary />,
    title:'Batch Summary',
    moduleName: 'BILLING',
  },
  
  '/ProvisionalBillGeneration': {
    component: <ProvisionalBillGeneration />,
    title:'Bulk Bill Generation',
    moduleName: 'BILLING',
    parentRoute:'/ProvisionalBillSummary'
  },
  '/ProvisionalViewBills': {
    component: <ProvisionalViewBills />,
    title:'View Bills',
    moduleName: 'BILLING',
    parentRoute:'/ProvisionalBillSummary'
  },
  '/ProvisionalErrorLog': {
    component: <ProvisionalErrorLog />,
    title:'Error Log',
    moduleName: 'BILLING',
    parentRoute:'/ProvisionalBillSummary'
  },
  '/ManageProvisionalBill': {
    component: <ManageProvisionalBill />,
    title:'Manage Bill',
    moduleName: 'BILLING',
    parentRoute:'/ProvisionalViewBills'
  },


  '/SldcSummary': {
    component: <SldcSummary />,
    title:'SLDC Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageSldcData': {
    component: <ManageSldcData />,
    title:'Manage SLDC Data',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/SldcSummary'
  },
  '/WindElectricalShareReport': {
    component: <WindElectricalShareReport />,
    title:'Wind and Solar Electrical Share Report',
    moduleName: 'REPORTS'
  },
  '/SolarElectricalShareReport': {
    component: <SolarElectricalShareReport />,
    title:'Solar Electrical Share Report',
    moduleName: 'REPORTS'
  },
  '/MGR15min': {
    component: <MGR15min />,
    title:'MGR 15-Block',
    moduleName: 'REPORTS'
  },
  '/HTSCWiseDemandPlan': {
    component: <HTSCWiseDemandPlan />,
    title:'HTSC Wise Demand Plan',
    moduleName: 'REPORTS'
  },
  '/LineLoss': {
    component: <LineLoss />,
    title:'Line Loss Calculation',
    moduleName: 'REPORTS'
  },
  '/WTGWiseReport': {
    component: <WTGWiseReport />,
    title:'Line Loss Calculation',
    moduleName: 'REPORTS'
  },
  '/Allocation': {
    component: <Allocation />,
    title:'Allocation',
    moduleName: 'REPORTS'
  },
  '/WTGGeneration': {
    component: <WTGGeneration />,
    title:'WTG Generation',
    moduleName: 'REPORTS'
  },
  '/WTGConsumerAllocation': {
    component: <WTGConsumerAllocation />,
    title:'WTG & Consumer Allocation',
    moduleName: 'REPORTS'
  },
};
