// @ts-ignore
import sharp, { Blend, Gravity, Metadata, OverlayOptions, Sharp } from 'sharp';
import { extname } from 'node:path';
import { readFile } from 'node:fs/promises';
import { NonSharedBuffer } from 'node:buffer';

export type WatermarkOptions = Partial<{
    text: string;
    gravity: Gravity;
    color: string;
    fontSize: number;
    blend: Blend;
}>;

export function watermarkPlugin(options?: WatermarkOptions) {
    const text: string = '© by Ⓣⓞⓜ Ⓢ.';
    const gravity: Gravity = 'center';
    const color: string = 'white';
    const fontSize: number = 48;
    const blend: Blend = 'color-dodge';

    options = { text, gravity, color, fontSize, blend, ...options };

    return {
        name: 'vite-watermark-plugin',
        async transform(src: string, id: string): Promise<string | null | undefined> {
            if (!id.match(/\.(png|jpg|jpeg|webp)$/i)) {
                return null;
            }

            console.log(src);

            try {
                const imageBuffer: NonSharedBuffer = await readFile(id);
                const image: Sharp = sharp(imageBuffer);
                const metadata: Metadata = await image.metadata();

                const svgText: string = `
                    <svg width="${metadata.width}" height="${metadata.height}">
                        <style>
                            .text { fill: ${options.color}; font-size: ${options.fontSize}px; font-family: sans-serif; }
                        </style>
                        <text 
                          x="50%" 
                          y="50%" 
                          text-anchor="middle" 
                          class="text"
                          dominant-baseline="middle"
                        >${options.text}</text>
                    </svg>
                `;

                const overlayOptions: Array<OverlayOptions> = [{
                    input: Buffer.from(svgText),
                    gravity: options.gravity,
                    blend: options.blend
                }];
                const processedImage: Buffer<ArrayBufferLike> = await image.composite(overlayOptions).toBuffer();
                const base64Image: string = processedImage.toString('base64');

                return `export default "data:image/${extname(id).slice(1)};base64,${base64Image}"`;
            } catch (error) {
                console.error(error);
            } finally {
                console.log('watermarkPlugin');
            }
        }
    };
}
