import { ControlType, IControlDefinition, IRetinaFormOptions } from "@retina360-ai/core-ui-library-v2";
import { DATE_TIME_FORMAT } from "./constants";

export const RETINA_MODULE_NAME = 'Besos';
export const USER_MODULE_NAME = 'UserManagement';

export interface IPageBaseProps {
    scrollKey?: string;
}

export interface ICRMAppOptions extends IRetinaFormOptions{
}

export const userInfoSection: IControlDefinition[] = [
    {
      type: ControlType.LABEL,
      name: 'strCreatedBy',
      isStatic: false,
      prefixText: 'Created By : ',
    },
    {
        type: ControlType.LABEL,
        name: 'dtCreatedDate',
        isStatic: false,
        prefixText: 'Created Date : ',
        format:DATE_TIME_FORMAT
      },
    {
      type: ControlType.LABEL,
      name: 'strModifiedBy',
      isStatic: false,
      prefixText: 'Modified By : ',
    },
    {
        type: ControlType.LABEL,
        name: 'dtModifiedDate',
        isStatic: false,
        prefixText: 'Modified Date : ',
        format:DATE_TIME_FORMAT
      },
  ];