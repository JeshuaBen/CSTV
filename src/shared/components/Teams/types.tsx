import { ImageSourcePropType } from 'react-native';

export type TeamProps = {
  team1: { name: string; image?: ImageSourcePropType };
  team2: { name: string; image?: ImageSourcePropType };
};
