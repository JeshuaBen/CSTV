import Avatar from '../Avatar';
import Box from '../Box';
import Text from '../Text';
import { TeamProps } from './Models';

const Teams = ({ team1, team2, imageTeam1, imageTeam2 }: TeamProps) => {
  return (
    <Box direction="row" align="center" justify="center" className="gap-4 mt-6">
      <Avatar shape="circle" label={team1} source={imageTeam1} />
      <Text weight={400} size="sm">
        vs
      </Text>
      <Avatar shape="circle" label={team2} source={imageTeam2} />
    </Box>
  );
};

export default Teams;
