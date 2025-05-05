import {Dictionary} from 'lodash';
import * as React from 'react';
import {EmailNotificationSummary} from '../../master/EmailNotificationSummary/EmailNotificationSummary';
import {ManageEmailNotification} from '../../master/EmailNotificationSummary/ManageEmailNotification';
import {PPASummary} from '../../master/PPA/PPASummary';
import {ManagePPA} from '../../master/PPA/ManagePPA';
import {LOISummary} from '../../master/LOIMaster/LOISummary';
import {ManageLOI} from '../../master/LOIMaster/ManageLOI';
import {Paymentsecuritysummary} from '../../master/PaymentSecuritySummary/PaymentSecuritySummary';
import {ManagePaymentSecurity} from '../../master/PaymentSecuritySummary/ManagePaymentSecurity';
import {PaymentHelp} from '../../master/PaymentSecuritySummary/PaymentHelp';
import {Managetcd} from '../../master/Tcdmaster/ManageTcd';
import {ManageTod} from '../../master/TOD/ManageTod';
import {TODSummary} from '../../master/TOD/TODSummary';
import {ICRMRouteComponent} from './objects';
import { DirectPPA } from '../../master/PPA/DirectPPA';
import { PPAAmendment } from '../../master/PPAAmendment/PPAAmendmentsummary';
import { title } from 'process';
import { ManagePPAAmendment } from '../../master/PPAAmendment/ManagePPAAmendment';
import { DirectPPAAmmendment } from '../../master/PPAAmendment/DirectPPAAmmendment';
import { ManageTarrif } from '../../master/TariffMaster/ManageTarrif';
import { ConsumerDemandPlanningSummary, } from '../../energyAccounting/EnergyDemandPlanning/ConsumerDemandPlanningSummary';
import { ManageEnergyDemandPlanning } from '../../energyAccounting/EnergyDemandPlanning/ManageEnergyDemandPlanning';
import { GroupCaptiveAllotmentSummary } from '../../energyAccounting/GroupCaptiveAllotment/GroupCaptiveAllotmentSumamry';
import { BankingDetails } from '../../energyAccounting/BankingDetails/BankingDetails';
import { JMREntrySummary } from '../../energyAccounting/JMREntry/JMREntry';
import { ManageJMREntry } from '../../energyAccounting/JMREntry/ManageJMREntry';
import { WorkflowAccess } from '../../master/Workflow/workflowAccess';
import { WorkFlowRule } from '../../master/Workflow/workflowRule';
import { ManageWorkFlow } from '../../master/Workflow/manageWorkflow';
import { WorkFlowSummary } from '../../master/Workflow/workflowSummary';
import { ManageGroupCaptiveAllotment } from '../../energyAccounting/GroupCaptiveAllotment/ManageGroupCaptiveAllotment';
import { ViewPPA } from '../../energyAccounting/EnergyDemandPlanning/ViewPPA';
import { ManageChannelPartner } from '../../master/ChannelPartners/ManageChannelPartner';
import { ChargesComputation } from '../../energyAccounting/GroupCaptiveAllotment/ChargesComputation';
import { BulkUploadJMREntry } from '../../energyAccounting/JMREntry/JMRBulkUpload';
import { BulkUploadBankingDetails } from '../../energyAccounting/BankingDetails/BankingDetailsBulkUpload';

export const routem: Dictionary<ICRMRouteComponent> = {  
  '/WorkFlowSummary': {
    component: <WorkFlowSummary />,
    title:'Workflow Summary',
    moduleName: 'SETUP',
  },
  '/manageWorkflow': {
    component: <ManageWorkFlow />,
    title:'Manage Workflow',
    moduleName: 'SETUP',
    parentRoute:'/WorkFlowSummary'
  },
  '/workflowAccess': {
    component: <WorkflowAccess />,
    title:'Workflow Access',
    moduleName: 'SETUP',
    parentRoute:'/WorkFlowSummary'
  },
  '/workflowRule': {
    component: <WorkFlowRule />,
    title:'Workflow Rule',
    moduleName: 'SETUP',
    parentRoute:'/WorkFlowSummary'
  },
  '/EmailNotificationSummary': {
    component: <EmailNotificationSummary />,
    title:'Email Notification Summary',
    moduleName: 'COMMON',
  },
  '/ManageEmailNotification': {
    component: <ManageEmailNotification />,
    title:'Manage Email Notification',
    moduleName: 'COMMON',
    parentRoute:'/EmailNotificationSummary'
  },
  '/PPASummary': {
    component: <PPASummary />,
    title:'PPA Summary',
    moduleName: 'CRM',
  },
  '/ManagePPA': {
    component: <ManagePPA />,
    title:'Manage PPA',
    moduleName: 'CRM',
    parentRoute:'/PPASummary'
  },
  '/DirectPPA': {
    component: <DirectPPA />,
    title:'Direct PPA',
    moduleName: 'CRM',
    parentRoute:'/PPASummary'
  },
  '/LOISummary': {
    component: <LOISummary />,
    title:'LOI/Term Sheet Summary',
    moduleName: 'CRM',
  },
  '/ManageLOI': {
    component: <ManageLOI />,
    title:'Manage LOI/Term Sheet',
    moduleName: 'CRM',
    parentRoute:'/LOISummary'
  },
  '/paymentsecuritysummary': {
    component: <Paymentsecuritysummary />,
    title:'Payment Security Summary',
    moduleName: 'CRM',
  },
  '/ManagePaymentSecurity': {
    component: <ManagePaymentSecurity />,
    title:'Manage Payment Security',
    moduleName: 'CRM',
    parentRoute:'/paymentsecuritysummary'
  },
  '/managetcd': {
    component: <Managetcd />,
    title:'Manage TCD',
    moduleName: 'SETUP',
  },
  // '/ViewBills': {
  //   component: <ViewBills />,
  //   title:'View Bills',
  //   moduleName: 'BILLING',
  // },
  '/TodMaster': {
    component: <TODSummary />,
    title:'TOD Summary',
    moduleName: 'SETUP',
  },
  '/ManageTod': {
    component: <ManageTod />,
    title:'Manage TOD',
    moduleName: 'SETUP',
    parentRoute:'/TodMaster'
  },
  '/PPAAmendment': {
    component: <PPAAmendment />,
    title:'PPA Amendment',
    moduleName: 'CRM',
  },
  '/ManagePPAAmendment': {
    component: <ManagePPAAmendment />,
    title:'Manage PPA Amendment',
    moduleName: 'CRM',
    parentRoute:'/PPAAmendment'
  },
  '/DirectPPAAmmendment': {
    component: <DirectPPAAmmendment />,
    title:'Direct PPA Amendment',
    moduleName: 'CRM',
    parentRoute:'/PPAAmendment'
  },
  '/ManageTariff': {
    component: <ManageTarrif />,
    title:'Manage Tariff',
    moduleName: 'CRM',
    parentRoute:'/TarrifMaster'
  },
  '/ManageChannelPartner': {
    component: <ManageChannelPartner />,
    title:'Manage Channel Partner',
    moduleName: 'CRM',
    parentRoute:'/ManageChannelPartner'
  },


  '/ConsumerDemandPlanningSummary': {
    component: <ConsumerDemandPlanningSummary />,
    title:'Consumer Demand Planning Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageEnergyDemandPlanning': {
    component: <ManageEnergyDemandPlanning />,
    title:'Manage Demand Planning',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/ConsumerDemandPlanningSummary'
  },
  '/JMREntry': {
    component: <JMREntrySummary />,
    title:'JMR Entry',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageJMREntry': {
    component: <ManageJMREntry />,
    title:'Manage JMR Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/JMREntrySummary'
  },

  '/BulkUploadJMREntry': {
    component: <BulkUploadJMREntry />,
    title:'Bulk Upload JMR Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/JMREntrySummary'
  },
  '/GroupCaptiveAllotment': {
    component: <GroupCaptiveAllotmentSummary />,
    title:'Group Captive Allotment',
    moduleName: 'ENERGYACCOUNTING',
   
  },
  '/ManageGroupCaptiveAllotment': {
    component: <ManageGroupCaptiveAllotment />,
    title:'Manage Group Captive Allotment',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/GroupCaptiveAllotment'

  },
  '/ChargesComputation': {
    component: <ChargesComputation />,
    title:'Charges Computation',
    moduleName: 'ENERGYACCOUNTING'

  },
  '/BankingDetails': {
    component: <BankingDetails />,
    title:'Banking Details',
    moduleName: 'ENERGYACCOUNTING',
   
  },

  '/BulkUploadBankingDetails': {
    component: <BulkUploadBankingDetails />,
    title:'Bulk Upload For Banking Details',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/BankingDetails'
  },
  '/JMREntrySummary': {
    component: <JMREntrySummary />,
    title:'JMR Entry Summary',
    moduleName: 'ENERGYACCOUNTING',
   
  },
  '/ViewPPA': {
    component: <ViewPPA />,
    title:'View PPA',
    moduleName: 'CRM',
  },
};



