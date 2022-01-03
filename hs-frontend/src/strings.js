export const BASE_URL = 'https://localhost:5001';
export const REQUEST_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const Controllers = {
  authentication: 'auth',
  users: 'users',
  buildings: 'buildings',
  locals: 'locals',
  issues: 'issues',
  announcements: 'announcements',
  documents: 'documents',
  addresses: 'addresses'
};

const url = (controller, endpoint) => `${BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ''}`;

export const Endpoints = {
  // authentication
  register: url(Controllers.authentication, 'register'),
  login: url(Controllers.authentication, 'login'),
  refreshToken: url(Controllers.authentication, 'refresh-token'),
  revokeToken: url(Controllers.authentication, 'revoke-refresh-token'),
  resetPassword: url(Controllers.authentication, 'reset-password'),
  // users
  users: url(Controllers.users),
  usersUnconfirmed: url(Controllers.users, 'not-enabled'),
  usersResidents: url(Controllers.users, 'residents'),
  usersWorkers: url(Controllers.users, 'workers'),
  usersUnregister: url(Controllers.users, 'unregister'),
  usersBan: url(Controllers.users, 'ban'),
  // buildings
  buildings: url(Controllers.buildings),
  buildingsAll: url(Controllers.buildings, 'all'),
  buildingsByAddress: url(Controllers.buildings, 'address'),
  // locals
  locals: url(Controllers.locals),
  localsAll: url(Controllers.locals, 'all'),
  localsResident: url(Controllers.locals, 'get-by-resident'),
  localsAddResident: url(Controllers.locals, 'add-resident'),
  localsRemoveResident: url(Controllers.locals, 'remove-resident'),
  localsBuilding: url(Controllers.locals, 'get-by-building'),
  localByDetails: url(Controllers.locals, 'get-by-details'),
  // issues
  issues: url(Controllers.issues),
  issuesByAuthor: url(Controllers.issues, 'author'),
  issuesCancel: url(Controllers.issues, 'cancel'),
  issuesResolve: url(Controllers.issues, 'resolve'),
  // announcements
  announcements: url(Controllers.announcements),
  announcementsNotCancelled: url(Controllers.announcements, 'not-cancelled'),
  announcementsReceiver: url(Controllers.announcements, 'receiver'),
  announcementsPostByBuildings: url(Controllers.announcements, 'add-by-buildings'),
  announcementsPostByAddress: url(Controllers.announcements, 'add-by-address'),
  // documents
  documents: url(Controllers.documents),
  documentsByAuthor: url(Controllers.documents, 'author'),
  documentsByReceiver: url(Controllers.documents, 'receiver'),
  documentsFromAssociation: url(Controllers.documents, 'all-from-association'),
  documentsFromResidents: url(Controllers.documents, 'all-from-residents'),
  //addresses
  addresses: url(Controllers.addresses),
  cities: url(Controllers.addresses, 'cities'),
  districts: url(Controllers.addresses, 'districts'),
  streets: url(Controllers.addresses, 'streets'),
};

export const MODES = {
  UserProfile: 'Profil użytkownika',
  Buildings: 'Budynki wspólnoty',
  HomePage: 'Strona główna',
  BuildingDetails: 'Szczegóły budynku',
  Announcements: 'Tablica ogłoszeń',
  UsersTables: 'Użytkownicy',
  Issues: 'Tablica zgłoszeń',
  ResidentLocals: 'Twoje lokale',
  Documents: 'Dokumenty',
  UserDetails: 'Szczegóły użytkownika'
};
