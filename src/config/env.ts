export const env = {
  pandaScoreToken: process.env.EXPO_PUBLIC_PANDA_SCORE_TOKEN ?? '',
};

export const hasPandaScoreToken = Boolean(env.pandaScoreToken);
