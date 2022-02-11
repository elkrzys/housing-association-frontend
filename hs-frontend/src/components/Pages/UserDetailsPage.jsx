import { useParams } from 'react-router-dom';
import MainLayout from './MainLayout';
import UserDetails from '../Users/UserDetails';

const UserDetailsPage = () => {
  let { userId } = useParams();
  return (
    <MainLayout header="Szczegóły użytkownika">
      <UserDetails userId={userId} />
    </MainLayout>
  );
};
export default UserDetailsPage;
