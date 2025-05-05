import {IButtonDefinition, IControlDefinition, IRFControlEventParams, RFActionBar, RFSection} from '@retina360-ai/core-ui-library-v2';
import * as React from 'react';

interface IRFFooterProps {
  buttons: IControlDefinition[];
  metaData?: IControlDefinition[];
}

export const RFFooter: React.FC<IRFFooterProps> = (props) => {

  //here adding the eventFor:'PAGE_SAVE' instead of adding eventFor:'PAGE_SAVE' in every page...
  const updatedButtons = React.useMemo(():IControlDefinition[]=>{
    return (props.buttons as IButtonDefinition[]).map((x)=>{
      if((x as IButtonDefinition).event){
        x = {
          ...x,
          event:{
            ...x.event,
            eventFor:'PAGE_SAVE'
          },
        };
      }
      return x as IControlDefinition;
    })
  },[props.buttons]);

  return (
    <>
      <RFActionBar controls={updatedButtons} className={'rf-footer-btn'} />
      {props.metaData && <RFSection controls={props.metaData} columns={4} className={'rf-footer-meta'} />}
    </>
  );
};
