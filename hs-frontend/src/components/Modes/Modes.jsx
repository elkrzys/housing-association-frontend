import { React } from 'react';
import { MODES } from '../../strings';
import { UserProfile } from '../UserProfile';
import { BuildingsTable } from '../Buildings';
import { Redirect } from 'react-router';

const Modes = ({ mode }) => {
  switch (mode) {
    case MODES.UserProfile:
      console.log('user profile mode');
      return <UserProfile />;
    case MODES.Buildings:
      console.log('buildings mode');
      return <BuildingsTable />;
    case MODES.HomePage:
      console.log('homepage mode');
      return <Redirect to="/home" />;
    default:
      return null;
  }
};
export default Modes;
