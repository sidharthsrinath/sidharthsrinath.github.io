function hexToRgb(hex: string): [number, number, number] {
    // Remove the '#' if present
    const normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;

    if (normalizedHex.length === 3) {
        // Convert 3-digit hex to 6-digit hex
        const r = normalizedHex.charAt(0);
        const g = normalizedHex.charAt(1);
        const b = normalizedHex.charAt(2);
        return [parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16)];
    } else if (normalizedHex.length === 6) {
        return [
            parseInt(normalizedHex.substring(0, 2), 16),
            parseInt(normalizedHex.substring(2, 4), 16),
            parseInt(normalizedHex.substring(4, 6), 16),
        ];
    } else {
        throw new Error('Invalid hex color format');
    }
}

function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (x: number) => x.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function blend(hexColor1: string, hexColor2:string, opacity: number): string {
    const [r1, g1, b1] = hexToRgb(hexColor1);
    const [r2, g2, b2] = hexToRgb(hexColor2);
    console.log(r2,g2,b2)

    const newR = Math.round(r1 * opacity + r2 * (1 - opacity));
    const newG = Math.round(g1 * opacity + g2 * (1 - opacity));
    const newB = Math.round(b1 * opacity + b2 * (1 - opacity));

    return rgbToHex(newR, newG, newB);
}

const getResultantColor =(hexColor1: string, hexColor2:string = '#FFFFFF', opacity:number = .2): string  => {
    return blend(hexColor1, hexColor2, opacity);
}


export default getResultantColor