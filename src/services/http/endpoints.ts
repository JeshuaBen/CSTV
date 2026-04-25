export const endpoints = {
  upcomingMatches: '/csgo/matches/upcoming',
  runningMatches: '/csgo/matches/running',
  matchById: (id: string | number) => `/matches/${id}`,
};
