import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import MainLayout from './MainLayout';
import UserDetails from '../Users/UserDetails';

const UserDetailsPage = () => {
  let { userId } = useParams();
  console.log('details');
  return (
    <MainLayout header="Szczegóły użytkownika">
      <UserDetails userId={userId} />
    </MainLayout>
  );
};
export default UserDetailsPage;
