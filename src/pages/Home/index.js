import React from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { ChannelsProvider } from '../../context/channelContext';
import { useMediaQuery } from '../../misc/useModal';
import Chat from './Chat';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { isExact } = useRouteMatch();
  const renderSidebar = isDesktop || isExact;
  return (
    <ChannelsProvider>
      <Router>
        <Grid fluid className="h-100">
          <Row className="h-100">
            {renderSidebar && (
              <Col xs={24} md={6} className="h-100">
                <Sidebar />
              </Col>
            )}
            <Switch>
              <Route exact path="/channels/:channelId">
                <Col xs={24} md={18} className="h-100">
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
      </Router>
    </ChannelsProvider>
  );
};

export default Home;
