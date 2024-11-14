import { Text, TextProps } from "react-native";

import ICONS, { type XWing } from "@/constants/Icons";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = TextProps & { icon: XWing | string, useDef?: boolean };

export const XWingIcon: React.FC<Props> = ({ icon, useDef, style }) => {
    const color = useThemeColor({}, "text");
    let displayIcon = icon;
    if (useDef) {
        displayIcon = ICONS[icon as XWing];
        if (!displayIcon) return (
            <Text style={{ color: "red" }}>(MISSING ICON: {icon})</Text>
        );
    }
    return (
        <Text style={{ color, fontFamily: "XWingIcons", fontWeight: "normal", }}>{displayIcon}</Text>
    );
}