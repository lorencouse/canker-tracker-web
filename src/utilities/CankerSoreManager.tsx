import { ImageScale } from "../types";

export function calculateScaledXY(x: number, y: number, imageName: string) {
    const imageScale: { [key: string]: ImageScale } = {
        tongue: {scaleX: 0.6, scaleY: 0.6, xOffset: 74.2, yOffset: 162.73},
        lowerGums: { scaleX: 0.558, scaleY: 0.558, xOffset: 81.30, yOffset: 175.87 },
        upperGums: { scaleX: 0.576, scaleY: 0.576, xOffset: 81.16, yOffset: -49.2 },
        leftCheek: { scaleX: 0.338, scaleY: 1.583, xOffset: 0, yOffset: -191.16 },
        rightCheek: { scaleX: 0.338, scaleY: 1.583, xOffset: 250, yOffset: -191.16 }

    }

    const zoneName = imageName.replace('.png', '');

    if (!(zoneName in imageScale)) {
        throw new Error(`${zoneName} not found.`)
    }
    
    const scale = imageScale[zoneName];
    const xScaled = (x * scale.scaleX) + scale.xOffset;
    const yScaled = (y * scale.scaleY) + scale.yOffset;
    const xRatio = xScaled / 380
    const yRatio = yScaled / 380

    return [xRatio, yRatio]

}