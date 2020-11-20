import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/ProfileContext';

const PublicRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center size="md" content="loading" speed="slow" />
      </Container>
    );
  }

  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;
