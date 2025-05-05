import {
  ControlType,
  IControlDefinition,
  IOnLoadEventParams,
  RFSection,
  RetinaFormBuilder,
  TableCellRendererType,
} from '@retina360-ai/core-ui-library-v2';
import {random} from 'lodash';
import * as React from 'react';
import {CRM_USER} from '../constants';
import {VectorFamilyIconEnum} from '@retina360-ai/core-ui-library-v2';

const tableSection: IControlDefinition[] = [
  {
    name: 'files',
    type: ControlType.TABLE,
    isPrimeReactTable: true,
    noPagination: true,
    sortable: false,
    filter: false,
    excelExport: false,
    columns: [
      {
        title: 'Module Name',
        dataField: 'title',
      },
      {
        title: 'Download',
        dataField: 'fileName',
        cellRenderer: TableCellRendererType.ICON,
        cellClass: 'user-manual-download-icon-cell',
        cellRendererParams: {
          iconName: 'Download',
          iconTooltipText: 'Click here to download the guide',
          iconFamily: VectorFamilyIconEnum.FABRIC,
          event: {
            getEventProps: (rowData) => {
              return {
                downloadFile: {
                  fileName: rowData.fileName,
                  input: ['fileNameForDownload'],
                },
              };
            },
          },
        },
      },
    ],
  },
];

const onLoadEventParams: IOnLoadEventParams = {
  moduleName: CRM_USER,
  serviceName: 'INIT_USER_GUIDE',
  processResponse: (response) => {
    let files = Array.isArray(response.data.files) ? response.data.files : [];
    return {
      ...response,
      data: {
        ...response.data,
        //to avoid the download from cache
        files: files.map((x: any) => ({...x, fileNameForDownload: `${x.fileName}?v=${random(1, 100)}`})),
      },
    };
  },
};

const DownloadTable: React.FC = () => {
  return (
    <RetinaFormBuilder
      onLoadEventParams={onLoadEventParams}
      components={modalComponents}>
      <RFSection controls={tableSection} transparent columns={1} className="m-t-0" />
    </RetinaFormBuilder>
  );
};

const section: IControlDefinition[] = [
  {
    name: 'icon',
    type: ControlType.ICON,
    iconName: 'images/icons/help.svg',
    iconTooltipText: 'Download User Guide',
    iconFamily: 'SVG',
    event: {
      openModal: true,
      modalProps: {
        componentName: 'DownloadTable',
        title: 'User Guide',
        popupProps: {
          width: 450,
          height: 'auto',
        },
      },
    },
  },
];

const modalComponents = {
  DownloadTable: DownloadTable,
};

export const HelpDocumentDownload: React.FC = () => {
  return (
    <div className="navbar-rf">
      <RetinaFormBuilder components={modalComponents}>
        <RFSection controls={section} transparent columns={1} />
      </RetinaFormBuilder>
    </div>
  );
};
