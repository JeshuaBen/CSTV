import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenProps } from './types';

const Screen = ({ children, className }: ScreenProps) => {
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      className={['flex-1 bg-background', className].filter(Boolean).join(' ')}
    >
      {children}
    </SafeAreaView>
  );
};

export default Screen;
