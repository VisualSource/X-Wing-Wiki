import { useColorScheme } from "./useColorScheme";
import { Colors } from '@/constants/Colors';

export const useTheme = () => {
    const scheme = useColorScheme();
    return Colors[scheme ?? "light"]
}