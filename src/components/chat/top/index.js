import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useCurrentChannel } from '../../../context/currentChannelContext';
import { useMediaQuery } from '../../../misc/useModal';
import ChannelInfoBtn from './ChannelInfoBtn';
import { hashName } from '../../../misc/helperFunctions';

const Top = () => {
  const name = useCurrentChannel(v => v.name);
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          <Icon
            componentClass={Link}
            to="/"
            icon="angle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear pl-2 text-blue  ">
            {' '}
            <Icon icon="hashtag" size="2x" /> {hashName(name)}
          </span>
        </h4>
        <ButtonToolbar className="ws-nowrap">Todo</ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-item-center">
        <span>todo</span>
        <ChannelInfoBtn />
      </div>
    </div>
  );
};
export default memo(Top);
