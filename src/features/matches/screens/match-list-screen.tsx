import { Screen, Text } from '@/shared/components';
import { typography } from '@/shared/theme';

export function MatchesScreen() {
    return (
        <Screen className="justify-center">
            <Text className={typography.title}>CSTV Matches</Text>
            <Text className={`${typography.caption} mt-2`}>
                Feature bootstrap complete. Implement list and refresh next.
            </Text>
        </Screen>
    );
}
