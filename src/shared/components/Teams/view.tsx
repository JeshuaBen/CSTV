import Avatar from '../Avatar/view';
import Box from '../Box/view';
import Text from '../Text/view';
import { TeamProps } from './types';

const Teams = ({ team1, team2, imageTeam1, imageTeam2 }: TeamProps) => {
  return (
    <Box direction="row" align="center" justify="center" className="gap-4">
      <Avatar shape="circle" label={team1} source={imageTeam1} />
      <Text weight={400} size="sm" className="text-primaryWhite/50">
        vs
      </Text>
      <Avatar shape="circle" label={team2} source={imageTeam2} />
    </Box>
  );
};

export default Teams;
