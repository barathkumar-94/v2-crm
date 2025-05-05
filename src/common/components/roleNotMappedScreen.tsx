import {AppStatusContainer, StatusMessage} from '@retina360-ai/core-ui-library-v2';
import {Icon} from 'office-ui-fabric-react';
import * as React from 'react';

export const RoleNotMappedMessage: React.FC = () => {
  return (
    <AppStatusContainer>
      <Icon iconName={'Warning12'} className={'status-icon'} />
      <StatusMessage className="status-message">
        Role not mapped to your account. Please contact the Administrator for assistance.
      </StatusMessage>
    </AppStatusContainer>
  );
};
