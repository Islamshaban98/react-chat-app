import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../components/Sidebar';
import { ChannelsProvider } from '../context/channelContext';

const Home = () => {
  return (
    <ChannelsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </ChannelsProvider>
  );
};

export default Home;
