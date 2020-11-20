import React from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createsAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed In Successfully', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const handelFacebook = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const handelGoogle = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
            xs={24}
            md={12}
            mdOffset={6}
          >
            <Panel>
              <div className="text-center">
                <h1>your palce to talk</h1>
                <p>Chat and find new friends now</p>
              </div>
              <div className="mt-4">
                <Button block color="blue" onClick={handelFacebook}>
                  <Icon icon="facebook-official" /> Continue with Facebook
                </Button>
                <Button block color="red" onClick={handelGoogle}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
