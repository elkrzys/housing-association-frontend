export const BASE_URL = "https://localhost:5001";
export const REQUEST_STATUS =
{
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}

const Controllers = {
    authentication: "auth",
    users: "users",
    buildings: "buildings",
    locals: "locals",
    issues: "issues",
    announcements: "announcements"
}

const url = (controller, endpoint) => {
    return `${BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ''}`;
}

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
    // buildings
    buildings: url(Controllers.buildings),
    buildingsAll: url(Controllers.buildings, 'all'),
    // locals
    locals: url(Controllers.locals),
    localsAll: url(Controllers.locals, 'all'),
    // issues
    issues: url(Controllers.issues),
    issuesAll: url(Controllers.issues, 'all'),
    // announcements
    announcements: url(Controllers.announcements),
    announcementsAll: url(Controllers.announcements, 'all')
}

export const MODES = {
    UserProfile: 'User profile'
}