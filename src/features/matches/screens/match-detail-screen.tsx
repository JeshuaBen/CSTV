import { Screen, Text } from '@/shared/components';
import { typography } from '@/shared/theme';

const MatchDetailScreen = () => {
    return (
        <Screen className="justify-center">
            <Text className={typography.title}>Match Details</Text>
            <Text className={`${typography.caption} mt-2`}>
                Detail route scaffolded. Integrate roster and API in next phase.
            </Text>
        </Screen>
    );
}

export default MatchDetailScreen;