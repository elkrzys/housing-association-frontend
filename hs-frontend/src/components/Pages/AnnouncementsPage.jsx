import MainLayout from './MainLayout';
import { AnnouncementsTable } from '../Announcements';

const AnnouncementsPage = () => {
  return (
    <MainLayout header="Ogłoszenia">
      <AnnouncementsTable />
    </MainLayout>
  );
};
export default AnnouncementsPage;
