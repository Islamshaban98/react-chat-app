import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { ChannelsProvider } from '../../context/channelContext';
import { useMediaQuery } from '../../misc/useModal';
import Chat from './Chat';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { isExact } = useRouteMatch();
  // console.log(isExact);
  const renderSidebar = isDesktop || isExact;
  // console.log(renderSidebar);
  return (
    <ChannelsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {renderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}
          <Switch>
            <Route exact path="/channels/:channelId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">please select chat</h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </ChannelsProvider>
  );
};

export default Home;
