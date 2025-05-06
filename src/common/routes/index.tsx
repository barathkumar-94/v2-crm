import { Dictionary, keys, trim, toLower } from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { QuickCodes } from '../../master/quickCodes/quickCodes';
import { RoleMaster } from '../../master/Rolemaster/rolemaster';
import { ManageRole } from '../../master/Rolemaster/managerole';
import { UserMaster } from '../../master/UserMaster/usermaster';
import { ManageUser } from '../../master/UserMaster/manageuser';
import { UserRoleMapping } from '../../master/UserRoleMapping/Userrolemapping';
import { ManageCompany } from '../../master/Company/company';
import { TcdMaster } from '../../master/Tcdmaster/Tcdmaster';
import { Managetcd } from '../../master/Tcdmaster/ManageTcd';
import { ManageUserMapping } from '../../master/UserMapping/manageuserMapping';
import { RoleComponentMapping } from '../../master/RoleComponentMapping/RoleComponentMapping';
import { DocumentNumbering } from '../../master/DocumentNumbering/documentNumbering';
import { CostCenter } from '../../master/CostCenter/costCenter';
import { UomMaster } from '../../master/UomMaster/UomMaster';
import { ManageUom } from '../../master/UomMaster/Manageuom';
import { SBUSummary } from '../../master/SBU/sbusummary';
import { ManageSBU } from '../../master/SBU/managesbu';
import { SiteSummary } from '../../master/Site/sitesummary';
import { ManageSite } from '../../master/Site/managesite';
import { routev } from './route_v';
import { FinancialYearPeriodSummary } from '../../master/FinancialYear_Period/FinancialYearPeriodSummary';
import { ManageFinancialYearPeriod } from '../../master/FinancialYear_Period/ManageFinancialYearPeriod';

import { TarrifMaster } from '../../master/TariffMaster/Tarriffmaster';
import { ManageTarrif } from '../../master/TariffMaster/ManageTarrif';
import { ManageState } from '../../master/State/managestate';
import { AgencyMaster } from '../../master/AgencyMaster/AgencyMaster';
import { ManageAgency } from '../../master/AgencyMaster/ManageAgency';
import { route3 } from './route3';
import { route1 } from './route1';
import { routem } from './route_m';
import { ICRMRouteComponent } from './objects';
import { PasswordPolicy } from '../../master/PasswordPolicy/passwordPolicy';
import { SalesDashboard } from '../../dashboard/Sales';
import { TemplateBuilder } from '../../master/TemplateBuilder/TemplateBuilder';
import { TemplateBuilderSummary } from '../../master/TemplateBuilder/TemplateBuilderSummary';
import { ChannelPartnerMaster } from '../../master/ChannelPartners/ChannelPartnerMaster';
import { ManageChannelPartner } from '../../master/ChannelPartners/ManageChannelPartner';
import { AuditLog } from '../../master/AuditLog';
import { CustomerDashboard } from '../../dashboard/customer';
import { CorporateDashboard } from '../../dashboard/corporate';
import { FourwayAnalysis } from '../../master/FourwayAnalysisScreen/FourwayAnalysis';
import ManageProject from '../../R360xGPT/manageproject';
import GPT from '../../gpt/GPT';

export const routes: Dictionary<ICRMRouteComponent> = {
  ...route3,
  ...route1,
  ...routev,
  ...routem,
  '/createProject': {
    component: <ManageProject />,
    title: 'Template Builder Summary',
    moduleName: 'CLM',
  },
  '/gpt': {
    component: <GPT />,
    title: 'Prompt Analysis',
    moduleName: 'DASHBOARD'
  },
  '/TemplateBuilderSummary': {
    component: <TemplateBuilderSummary />,
    title: 'Template Builder Summary',
    moduleName: 'SETUP',
  },
  '/TemplateBuilder': {
    component: <TemplateBuilder />,
    title: 'Manage Template',
    moduleName: 'SETUP',
    parentRoute: '/TemplateBuilderSummary'
  },
  '/QuickCodes': {
    component: <QuickCodes />,
    title: 'Quick Codes',
    moduleName: 'SETUP',
  },
  '/RoleMaster': {
    component: <RoleMaster />,
    title: 'Role Master',
    moduleName: 'USERADMINISTRATOR',
  },
  '/ManageRole': {
    component: <ManageRole />,
    title: 'Manage Role',
    moduleName: 'USERADMINISTRATOR',
    parentRoute: '/RoleMaster'
  },
  '/UserMaster': {
    component: <UserMaster />,
    title: 'User Summary',
    moduleName: 'USERADMINISTRATOR',
  },
  '/ManageUser': {
    component: <ManageUser />,
    title: 'Manage User',
    moduleName: 'USERADMINISTRATOR',
    parentRoute: '/UserMaster'
  },
  '/UserRoleMapping': {
    component: <UserRoleMapping />,
    title: 'User Role Mapping',
    moduleName: 'USERADMINISTRATOR',
  },
  '/managestate': {
    component: <ManageState />,
    title: 'Manage State',
    moduleName: 'SETUP',
    parentRoute: '/StateSummary'
  },
  '/ManageCompany': {
    component: <ManageCompany />,
    title: 'Manage Company',
    moduleName: 'SETUP',
  },
  '/TcdMaster': {
    component: <TcdMaster />,
    title: 'TCD Summary',
    moduleName: 'SETUP',
  },
  '/Managetcd': {
    component: <Managetcd />,
    title: 'Manage TCD',
    moduleName: 'SETUP',
    parentRoute: '/TcdMaster'
  },
  '/DocumentNumbering': {
    component: <DocumentNumbering />,
    title: 'Manage Document Numbering',
    moduleName: 'SETUP',
  },
  '/ManageUserMapping': {
    component: <ManageUserMapping />,
    title: 'User SBU & Site Mapping',
    moduleName: 'USERADMINISTRATOR',
  },
  '/RoleComponentMapping': {
    component: <RoleComponentMapping />,
    title: 'Role Component Mapping',
    moduleName: 'USERADMINISTRATOR',
  },
  '/CostCenter': {
    component: <CostCenter />,
    title: 'Cost Center',
    moduleName: 'SETUP',
  },
  '/UomMaster': {
    component: <UomMaster />,
    title: 'UOM Summary',
    moduleName: 'SETUP',
  },
  '/ManageUom': {
    component: <ManageUom />,
    title: 'Manage UOM',
    moduleName: 'SETUP',
    parentRoute: '/UomMaster'
  },
  '/SBUSummary': {
    component: <SBUSummary />,
    title: 'SBU Summary',
    moduleName: 'SETUP',
  },
  '/ManageSBU': {
    component: <ManageSBU />,
    title: 'Manage SBU',
    moduleName: 'SETUP',
    parentRoute: '/SBUSummary'
  },
  '/SiteSummary': {
    component: <SiteSummary />,
    title: 'Site Summary',
    moduleName: 'SETUP'
  },
  '/ManageSite': {
    component: <ManageSite />,
    title: 'Manage Site',
    moduleName: 'SETUP',
    parentRoute: '/SiteSummary'
  },
  '/AgencyMaster': {
    component: <AgencyMaster />,
    title: 'Agency Summary',
    moduleName: 'SETUP',
  },
  '/ManageAgency': {
    component: <ManageAgency />,
    title: 'Manage Agency',
    moduleName: 'SETUP',
    parentRoute: '/AgencyMaster'
  },
  '/ChannelPartnerMaster': {
    component: <ChannelPartnerMaster />,
    title: 'Channel Partner Summary',
    moduleName: 'SETUP',
  },
  '/ManageChannelPartner': {
    component: <ManageChannelPartner />,
    title: 'Manage Channel Partner',
    moduleName: 'SETUP',
    parentRoute: '/ChannelPartnerMaster'
  },


  '/TarrifMaster': {
    component: <TarrifMaster />,
    title: 'Tariff Summary',
    moduleName: 'SETUP',
  },
  '/ManageTarrif': {
    component: <ManageTarrif />,
    title: 'Manage Tarrif',
    moduleName: 'SETUP',
    parentRoute: '/TarrifMaster'
  },
  '/ManageFinancialYearPeriod': {
    component: <ManageFinancialYearPeriod />,
    title: 'Manage Financial Year/Period',
    moduleName: 'SETUP',
    parentRoute: '/FinancialYearPeriodSummary'
  },
  '/FinancialYearPeriodSummary': {
    component: <FinancialYearPeriodSummary />,
    title: 'Financial Year/Period Summary',
    moduleName: 'SETUP',
  },
  '/PasswordPolicy': {
    component: <PasswordPolicy />,
    title: 'Password Policy',
    moduleName: 'USERADMINISTRATOR',
  },
  '/FourwayAnalysis': {
    component: <FourwayAnalysis />,
    title: 'Fourway Analysis',
    moduleName: 'REPORTS',
  },
  '/DailyMeterReadingReconSummary': {
    component: <div />,
    title: 'Daily Meter Reading Recon Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/MonthlyMeterReadingReconSummary': {
    component: <div />,
    title: 'Monthly Meter Reading Recon Summary',
    moduleName: 'ENERGYACCOUNTING',
  },
  '/Chatter': {
    component: <div />,
    title: 'Chatter Summary',
    moduleName: 'COMMON',
  },
  '/SalesDashboard': {
    component: <SalesDashboard />,
    title: 'Sales Dashboard',
    moduleName: 'DASHBOARD'
  },
  '/AuditLog': {
    component: <AuditLog />,
    title: 'Audit Log',
    moduleName: 'COMMON'
  },
  '/CustomerDashboard': {
    component: <CustomerDashboard />,
    title: 'Customer Dashboard',
    moduleName: 'DASHBOARD'
  },
  '/CorporateDashboard': {
    component: <CorporateDashboard />,
    title: 'Corporate Dashboard',
    moduleName: 'DASHBOARD'
  }
};

export type RouteComponentDictionary = Dictionary<(routeProps: RouteComponentProps) => React.ReactNode>;

export const routeComponents = keys(routes).reduce((acc, key) => {
  //key to remount the page if the query param change
  acc[key] = (routeProps) => (
    <React.Fragment key={routeProps.location.search}>
      <ComponentContainer routeName={key}>{routes[key].component}</ComponentContainer>
    </React.Fragment>
  );
  return acc;
}, {} as RouteComponentDictionary);

const ComponentContainer: React.FC<{ routeName: string }> = (props) => {
  let scrollKey = trim(props.routeName, '/');
  return <>{React.cloneElement(props.children as JSX.Element, { scrollKey })}</>;
};

export const routesWithLowerKey = keys(routes).reduce((acc, key) => {
  acc[toLower(key)] = routes[key];
  return acc;
}, {} as Dictionary<ICRMRouteComponent>);

export const lowerRouteKeys = keys(routesWithLowerKey);