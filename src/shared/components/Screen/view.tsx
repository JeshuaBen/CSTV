import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenProps } from './Models';

const Screen = ({ children, className }: ScreenProps) => {
  return (
    <SafeAreaView edges={['top', 'bottom']} className={`flex-1 bg-background px-6 ${className}`}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;
