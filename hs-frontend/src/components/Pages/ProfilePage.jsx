import MainLayout from './MainLayout';
import { UserProfile } from '../UserProfile';

const ProfilePage = () => {
  return (
    <MainLayout header="Profil użytkownika">
      <UserProfile />
    </MainLayout>
  );
};
export default ProfilePage;
