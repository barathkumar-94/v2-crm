import {Dictionary} from 'lodash';
import * as React from 'react';
import {LeadSummary} from '../../master/Leads/leadsummary';
import {ManageLead} from '../../master/Leads/ManageLead';
import {OpportunitySummary} from '../../master/Opportunity/OpportunitySummary';
import {ManageOpportunity} from '../../master/Opportunity/ManageOpportunity';
import {ManageLeadOpportunity} from '../../master/Opportunity/ManageLeadOpportunity';
import {CustomerAccountSummary} from '../../master/CustomerAccount/CustomerAccountSummary';
import {ManageCustomerAccount} from '../../master/CustomerAccount/ManageCustomerAccount';
import {MonthlyMeterEntrySummary} from '../../energyAccounting/GenerationMonthlyMeterEntry/MonthlyMeterEntrySummary';
import {ManageMonthlyMeterEntry} from '../../energyAccounting/GenerationMonthlyMeterEntry/ManageMonthlyMeterEntry';
import {ConsumerMonthlyMeterSummary} from '../../energyAccounting/ConsumerMonthlyMeter/ConsumerMonthlyMeterSummary';
import {ManageConsumerMonthlyMeter} from '../../energyAccounting/ConsumerMonthlyMeter/ManageConsumerMonthlyMeter';
import {ChecklistSummary} from '../../master/Checklist/ChecklistSummary';
import {ManageChecklist} from '../../master/Checklist/ManageChecklist';
import {ICRMRouteComponent} from './objects';
import { MonthlyMeterReadingRecon } from '../../energyAccounting/MonthlyMeterReadingRecon/MonthlyMeterReadingRecon';
import { PSSLineLevelReport } from '../../Reports/PSSLineLevelReport/PSSLineLevelReport';
import { MonthlyGenerationKwhReport } from '../../Reports/MonthlyGenerationKwhReport/MonthlyGenerationKwhReport';
import { MonthlyGenerationKvarhReport } from '../../Reports/MonthlyGenerationKvarhReport/MonthlyGenerationKvarhReport';
import { DGR15minBlock } from '../../Reports/DGR15minBlock/DGR15minBlock';
import { DGRSummary } from '../../Reports/DGRSummary/DGRSummary';
import { WTGWiseReport } from '../../Reports/WTGwiseStatement/WTGWiseStatement';
import { WTGWiseAllocation } from '../../Reports/WTGWiseAllocation/WTGWiseAllocation';
import { AllocationSummary } from '../../Reports/AllocationSummary/AllocationSummary';
import { WTGBankOutput } from '../../Reports/WTGBankOutput/WTGBankOutput';
import { EnergyDataReport } from '../../Reports/EnergyData/EnergyDataReport';
import { OverallGCRpt } from '../../Reports/OverallGC/OverallGCRpt';
import { HTSCWiseActualAlloctionAsset } from '../../Reports/HTSCWiseActualAllocationAsset/HTSCWiseActualAlloctionAsset';
import { GrossAllocationPlantWise } from '../../Reports/GrossAllocationPlantWise/GrossAllocationPlantWise';
import { CustomerTariff } from '../../Reports/CustomerTarrif/CustomerTariff';
import { SECL2CG } from '../../Reports/SECL2GC/SECL2GC';
import { CustomerAllotment } from '../../Reports/CustomerAllotment/CustomerAllotment';
import { WTGBankOutputGC2 } from '../../Reports/WTGBankOutputGC2/WTGBankOutputGC2';
import { SystemAllotment } from '../../Reports/SystemAllotment/SystemAllotment';
import { BulkBillReportGeneration } from '../../Reports/BulkBillReport/bulkBillReport';
import { BankingDetails } from '../../Reports/BankingDetails/BankingDetails';
import { SECL1CG } from '../../Reports/SECL1CG/SECL1CG';
import { GCAllotmentRequestLetter } from '../../Reports/GCAllotmentRequestLetter/GCAllotmentRequestLetter';
import { CRMSalesMis } from '../../Reports/CRMSalesMis/CRMSalesMis';
import { DailyBulkUpload } from '../../energyAccounting/DailyMeterEntry/DailyBulkUpload';
import { BulkUploadMonthlyEntry } from '../../energyAccounting/GenerationMonthlyMeterEntry/BulkUploadMonthlyEntry';
import { ConsumerBulkUpload } from '../../energyAccounting/EnergyDemandPlanning/ConsumerBulkUpload';
import { ParkTotalInvoice } from '../../Reports/ParkTotalInvoice/ParkTotalInvoice';
import { SalesTallyReport } from '../../Reports/SalesTallyReport/SalesTallyReport';
import { ParkTotalInvoiceSlotWise } from '../../Reports/ParkTotalInvoiceSlotWise/ParkTotalInvoiceSlotWise';
import { CompliancePPA } from '../../Reports/ComplianceReportPPA/ComplianceReportPPA';


export const routev: Dictionary<ICRMRouteComponent> = {
  '/LeadSummary': {
    component: <LeadSummary />,
    title:'Lead Summary',
    moduleName: 'CRM',
  },
  '/ManageLead': {
    component: <ManageLead />,
    title:'Manage Lead',
    moduleName: 'CRM',
    parentRoute:'/LeadSummary'
  },
  '/OpportunitySummary': {
    component: <OpportunitySummary />,
    title:'Opportunity Summary',
    moduleName: 'CRM',
  },
  '/ManageOpportunity': {
    component: <ManageOpportunity />,
    title:'Manage Opportunity',
    moduleName: 'CRM',
    parentRoute:'/OpportunitySummary'
  },
  '/ManageLeadOpportunity': {
    component: <ManageLeadOpportunity />,
    title:'Manage Lead Opportunity',
    moduleName: 'CRM',
    parentRoute:'/OpportunitySummary'
  },
  '/CustomerAccountSummary': {
    component: <CustomerAccountSummary />,
    title:'Customer Account Summary',
    moduleName: 'SETUP',
  },
  '/ManageCustomerAccount': {
    component: <ManageCustomerAccount />,
    title:'Manage Customer Account',
    moduleName: 'SETUP',
    parentRoute:'/CustomerAccountSummary'
  },
  '/MonthlyMeterEntrySummary': {
    component: <MonthlyMeterEntrySummary />,
    title:'Monthly Meter Entry Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageMonthlyMeterEntry': {
    component: <ManageMonthlyMeterEntry />,
    title:'Manage Monthly Meter Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/MonthlyMeterEntrySummary'
  },
  '/BulkUploadMonthlyEntry': {
    component: <BulkUploadMonthlyEntry />,
    title:'Bulk Upload Monthly Meter Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/MonthlyMeterEntrySummary'
  },
  '/ConsumerMonthlyMeterSummary': {
    component: <ConsumerMonthlyMeterSummary />,
    title:'Monthly Meter Entry Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/ManageConsumerMonthlyMeter': {
    component: <ManageConsumerMonthlyMeter />,
    title:'Manage Monthly Meter Entry',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/ConsumerMonthlyMeterSummary'
  },
  '/ChecklistSummary': {
    component: <ChecklistSummary />,
    title:'Checklist Summary',
    moduleName: 'SETUP',
  },
  '/ManageChecklist': {
    component: <ManageChecklist />,
    title:'Manage Checklist',
    moduleName: 'SETUP',
    parentRoute:'/ChecklistSummary'
  },
  '/MonthlyMeterReadingRecon': {
    component: <MonthlyMeterReadingRecon />,
    title:'Monthly Meter Reading Reconciliation',
    moduleName: 'ENERGYACCOUNTING'
  },
  '/PssLineLevelReport': {
    component: <PSSLineLevelReport />,
    title:'PSS Line Level Report',
    moduleName: 'REPORTS'
  },
  '/MonthlyGenerationKwhReport': {
    component: <MonthlyGenerationKwhReport />,
    title:'Monthly Generation Report(kWh)',
    moduleName: 'REPORTS'
  },
  '/MonthlyGenerationKvarhReport': {
    component: <MonthlyGenerationKvarhReport />,
    title:'Monthly Generation Report(kVARh)',
    moduleName: 'REPORTS'
  },
  '/DGR15min': {
    component: <DGR15minBlock />,
    title:'DGR 15min Block',
    moduleName: 'REPORTS'
  },
  '/DGRSummary': {
    component: <DGRSummary />,
    title:'DGR Summary',
    moduleName: 'REPORTS'
  },
  '/EnergyData': {
    component: <EnergyDataReport />,
    title:'Energy Data',
    moduleName: 'REPORTS'
  },
  '/WTGWiseReport': {
    component: <WTGWiseReport />,
    title:'WTG Wise Statement',
    moduleName: 'REPORTS'
  },
  '/WTGWiseAllocation': {
    component: <WTGWiseAllocation />,
    title:'WTG Wise Allocation',
    moduleName: 'REPORTS'
  },

  '/SalesTallyReport': {
    component: <SalesTallyReport />,
    title:'Sales Tally Integration Report',
    moduleName: 'REPORTS'
  },
  '/AllocationSummary': {
    component: <AllocationSummary />,
    title:'Allocation Summary',
    moduleName: 'REPORTS'
  },
  '/WTGBankOutput': {
    component: <WTGBankOutput />,
    title:'WTG Bank Output',
    moduleName: 'REPORTS'
  },
  '/WTGBankOutputGC2': {
    component: <WTGBankOutputGC2 />,
    title:'WTG Bank Output for GC2',
    moduleName: 'REPORTS'
  },
  '/OverallGC': {
    component: <OverallGCRpt />,
    title:'Overall GC',
    moduleName: 'REPORTS'
  },
  '/HtscWiseActualAllocationAsset': {
    component: <HTSCWiseActualAlloctionAsset />,
    title:'HTSC Wise Actual Allocation-By Asset',
    moduleName: 'REPORTS'
  },
  '/GrossAllocationPlant': {
    component: <GrossAllocationPlantWise />,
    title:'Gross Allocation Plant Wise Summary Report',
    moduleName: 'REPORTS'
  },
  '/Customer Tariff': {
    component: <CustomerTariff />,
    title:'Customer Tariff',
    moduleName: 'REPORTS'
  },
  '/SECL2GC': {
    component: <SECL2CG />,
    title:'SECL2CG',
    moduleName: 'REPORTS'
  },
  '/CustomerAllotment': {
    component: <CustomerAllotment />,
    title:'Customer Allotment',
    moduleName: 'REPORTS'
  },
  '/SystemAllotment': {
    component: <SystemAllotment />,
    title:'System Allotment',
    moduleName: 'REPORTS'
  },
  '/BulkBillReportGeneration': {
    component: <BulkBillReportGeneration />,
    title:'Bulk Bill Report Generation',
    moduleName: 'BILLING'
  },
  '/Banking_Details': {
    component: <BankingDetails />,
    title:'Banking Details',
    moduleName: 'REPORTS'
  },
  '/SECL1GC': {
    component: <SECL1CG />,
    title:'SE CL1 GC',
    moduleName: 'REPORTS'
  },
  '/GCAllotmentRequestLetter':{
    component: <GCAllotmentRequestLetter />,
    title:'GC Request Letter',
    moduleName: 'REPORTS'
  },
  '/CRMSALESMIS':{
    component: <CRMSalesMis />,
    title:'CRM Sales MIS',
    moduleName: 'REPORTS'
  },
  '/DailyBulkUpload': {
    component: <DailyBulkUpload />,
    title:'Bulk Upload',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/DailyMetersummary'
  },
  '/ConsumerBulkUpload': {
    component: <ConsumerBulkUpload />,
    title:'Bulk Upload',
    moduleName: 'ENERGYACCOUNTING',
    parentRoute:'/ConsumerDemandPlanningSummary'
  },
  '/PARK_TOTAL_INVOICE': {
    component: <ParkTotalInvoice />,
    title:'Park Total Invoice',
    moduleName: 'REPORTS'
  },

  '/PARK_TOTAL_SLOT_WISE_INVOICE': {
    component: <ParkTotalInvoiceSlotWise />,
    title:'Park Total Invoice - Slot Wise',
    moduleName: 'REPORTS'
  },


  '/COMPLIANCE_PPA': {
    component: <CompliancePPA />,
    title:'Compliance Report - PPA',
    moduleName: 'REPORTS'
  },
};

