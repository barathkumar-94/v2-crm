export type CRM_MODULES = 'USERADMINISTRATOR' | 'SETUP' | 'CRM' | 'ENERGYACCOUNTING' | 'BILLING' | 'COMMON' | 'DASHBOARD' | 'REPORTS';

export interface ICRMRouteComponent {
  component: JSX.Element;
  moduleName: CRM_MODULES;
  title:string;
  parentRoute?: string;
}
