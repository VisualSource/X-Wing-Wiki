import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export const useTheme = () => {
    const scheme = useColorScheme();
    return Colors[scheme ?? "light"]
}