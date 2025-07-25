// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import type { IconProps } from '@expo/vector-icons/build/createIconSet';

export function TabBarIcon({ style, ...rest }: IconProps<React.ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
