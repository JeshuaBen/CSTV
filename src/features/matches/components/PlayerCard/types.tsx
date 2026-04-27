import { PlayerModel } from '../../types/match-details';

export type PlayerCardSide = 'left' | 'right';

export type PlayerCardProps = {
  player: PlayerModel | null;
  side?: PlayerCardSide;
};
