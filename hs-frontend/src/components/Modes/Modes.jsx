import { React } from 'react';
import { MODES } from '../../strings';
import { UserProfile } from '../UserProfile';
import { BuildingsTable, BuildingDetails } from '../Buildings';
import { AnnouncementsTable } from '../Announcements';
import { CollapsedUsersTables } from '../Users';
import { Redirect } from 'react-router';

const Modes = ({ mode, contentId }) => {
  switch (mode) {
    case MODES.UserProfile:
      return <UserProfile />;
    case MODES.Buildings:
      return <BuildingsTable />;
    case MODES.HomePage:
      return <Redirect to="/home" />;
    case MODES.BuildingDetails:
      return <BuildingDetails buildingId={contentId} />;
    case MODES.Announcements:
      return <AnnouncementsTable />;
    case MODES.UsersTables:
      return <CollapsedUsersTables />;
    default:
      return null;
  }
};
export default Modes;
