import { React } from 'react';
import { MODES } from '../../strings';
import { UserProfile } from '../UserProfile';

const Modes = ({ mode }) => {
  switch (mode) {
    case MODES.UserProfile:
      console.log('user profile mode');
      return <UserProfile />;
    default:
      return null;
  }
};
export default Modes;
