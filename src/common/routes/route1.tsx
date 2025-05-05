import {Dictionary} from 'lodash';
import {ManageLead} from '../../master/Leads/ManageLead';
import {DocumentList} from '../../master/DocumentList/DocumentList';
import * as React from 'react';
import {ManageBusinessPlan} from '../../master/BusinessPlan/ManageBusinessPlan';
import {BusinessPlanSummary} from '../../master/BusinessPlan/BusinessPlanSummary';
import {PayTermSummary} from '../../master/PayTerm/PayTermSummary';
import {ManagePayTerm} from '../../master/PayTerm/ManagePayTerm';
import {DailyMetersummary} from '../../energyAccounting/DailyMeterEntry/DailyMetersummary';
import {ManageDailyMeterEntry} from '../../energyAccounting/DailyMeterEntry/ManageDailyMeterEntry';
import {BillSummary} from '../../billing/DirectBillGeneration/BillSummary';
import {ICRMRouteComponent} from './objects';
import { ViewSite } from '../../master/BusinessPlan/ViewSite';
import { ConsumerDemandPlanningSummary } from '../../energyAccounting/EnergyDemandPlanning/ConsumerDemandPlanningSummary';//import { ViewSiteHelp } from '../../master/BusinessPlan/ViewSite';
import { LdcdataSummary } from '../../master/PasswordPolicy/SLDCData/SldcdataSummary';
import { ManageLdcdata } from '../../master/PasswordPolicy/SLDCData/Managesldcdata';
import { DirectBill } from '../../billing/DirectBillGeneration/DirectBill';
import { PPABasedDirectBill } from '../../billing/DirectBillGeneration/PPABasedDirectBill';

export const route1: Dictionary<ICRMRouteComponent> = {
  '/DocumentList': {
    component: <DocumentList />,
    title:'Document List',
    moduleName: 'COMMON',
  },
  '/ManageBusinessPlan': {
    component: <ManageBusinessPlan />,
    title:'Manage Business Plan',
    moduleName: 'CRM',
    parentRoute:'/BusinessPlanSummary'
  },
  '/BusinessPlanSummary': {
    component: <BusinessPlanSummary />,
    title:'Business Plan Summary',
    moduleName: 'CRM',
  },
  '/PayTermSummary': {
    component: <PayTermSummary />,
    title:'Pay Term Summary',
    moduleName: 'SETUP',
  },
  '/ManagePayTerm': {
    component: <ManagePayTerm />,
    title:'Manage Pay Term',
    moduleName: 'SETUP',
    parentRoute:'/PayTermSummary'
  },
  '/DailyMetersummary': {
    component: <DailyMetersummary />,
    title:'Daily Meter Entry Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageDailyMeterEntry': {
    component: <ManageDailyMeterEntry />,
    title:'Manage Daily Meter Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/DailyMetersummary'
  },
  '/BillSummary': {
    component: <BillSummary />,
    title:'Bill Summary',
    moduleName: 'BILLING',
  },
  '/DirectBillPPA': {
    component: <DirectBill />,
    title:'PPA Based Direct Bill',
    moduleName: 'BILLING',
    parentRoute:'/BillSummary'
  },
  '/PPABasedDirectBill': {
    component: <PPABasedDirectBill />,
    title:'Direct Bill',
    moduleName: 'BILLING',
    parentRoute:'/BillSummary'
  },

  '/DirectBill': {
    component: <DirectBill />,
    title:'Direct Bill',
    moduleName: 'BILLING',
    parentRoute:'/BillSummary'
  },


  '/ViewSite': {
    component: <ViewSite />,
    title:'View Site',
    moduleName: 'CRM',
    parentRoute:'/ManageBusinessPlan'

  },
// '/ViewSiteHelp': {
//     component: <ViewSiteHelp />,
//     title:'View Site',
//     moduleName: 'CRM',
//     parentRoute:'/ManageBusinessPlan'
//   },

  '/LDCDataSummary': {
    component: <LdcdataSummary />,
    title:'LDC Data Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageLdcdata': {
    component: <ManageLdcdata />,
    title:'Manage LDC Data',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/LDCDataSummary'
  },
  
};
