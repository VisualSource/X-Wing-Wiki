export type RenderPageData = {
    getTextContent(): Promise<{
        items: {
            dir: string;
            width: number;
            height: number;
            fontName: string;
            str: string;
            transform: number[]
        }[],
        styles: Record<string, {
            fontFamily: string;
            ascent: number;
            descent: number;
        }>
    }>
}