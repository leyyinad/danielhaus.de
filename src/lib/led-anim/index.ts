/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import danielProfileImg from "$lib/images/daniel-profile-64px.png";
import { plasma, image, zero, random, one } from "./generators";
import { translate, time, dim, vignette, speed, scale } from "./modifiers";
import { add, loop, mix, multiply, sequence, subtract, timeline } from "./operators";
import { fade } from "./transitions";
import type { LedAnimComponentConfig, LedAnimGeneratorComponent } from "./types";
import { profile } from "./utils";

export * from "./generators";
export * from "./modifiers";
export * from "./operators";

// export default speed(reverb(ledTest), 32);
// export default speed(reverb(translate(image(danielProfileImg), { x: 32, y: 32 })), 32);
// export default translate(image(danielProfileImg), { x: 32, y: 32, rotate: true });
// export default image("/dh-logo.svg", { width: 64, height: 64 });
// export default add(dim(random, 0.25), multiply(image(danielProfileImg), random));

// export default scale(image(danielProfileImg), { sx: 0.25, sy: 0.25 });

// export default
//   timeline(
//     [fade(zero, plasma), 0, 1],
//     [loop(
//       timeline(
//         [plasma, 1, 2],
//         [fade(plasma, dh), 2, 3],
//         [dh, 3, 5],
//         [fade(dh, plasma), 5, 6],
//         [plasma, 6, 10],
//       ),
//       10
//     ), 1, Infinity]
//   );

const photo = image(danielProfileImg, {
  width: 64,
  height: 64,
});

const logo = scale(
  image("/dh-logo.svg", {
    width: 64,
    height: 64
  }), { sx: 0.7 });

// export default mul(
//   plasma,
//   photo,
// );

// export default vignette(plasma);

// export default vignette(logo);

export default
  sequence(
    [vignette(
      sequence(
        [fade(zero, plasma), 1.],
        [plasma, 2.],
        [fade(plasma, multiply(plasma, photo)), 1.],
        [multiply(plasma, photo), 2.],
        [fade(multiply(fade(plasma, one), photo), photo), 1.],
        // [fade(multiply(plasma, photo), logo), 5.],
        // [speed(fade(zero, plasma), 1. / 4.), 1.],
        // [plasma, 1.],
        // [speed(fade(plasma, logo), 1. / 4.), 1.],
        // [speed(fade(logo, plasma), 1. / 4.), 1.],
        // [speed(fade(plasma, photo), 1. / 4.), 1.],
      )), 7.],
    [fade(vignette(photo), photo), 1],
    [photo, Infinity] // TODO:; glitter
  );

// export default loop(
//   timeline(
//     [fade(plasma, photo), 0, 1],
//     [fade(photo, logo), 1, 2],
//     [fade(logo, time(plasma, -3)), 2, 3],
//   ),
//   3
// );

// export default fadeIn(
//   image(danielProfileImg),
// );



// export default rotate(image(danielProfileImg), {
//   // radians: 0 * Math.PI / 180.0,
//   radians: t => t * 64 * Math.PI / 180.0,
//   cx: 32,
//   cy: 32,
// });

// export default rotate(scale(image("/dh-logo.svg", {
//   width: 64,
//   height: 64
// }), {
//   sx: 0.75,
//   sy: 0.75,
// }), {
//   radians: 45.0 * Math.PI / 180.0,
// });

// export default scale(image("/dh-logo.svg", {
//   width: 64,
//   height: 64
// }), {
//   sx: 0.5,
// });

// export default add(
//   multiply(
//     rotate(image(danielProfileImg), { radians: 45.0 * Math.PI / 180.0 }),
//     add(dim(one, 0.25), random),
//   ),
//   multiply(
//     dim(image("/dh-logo.svg", { width: 64, height: 64 }), 0.25),
//     add(dim(one, 0.25), random),
//   ),
// );

// export default timeline(
//   [fadeIn(blink), 0, 1],
//   [fadeOut(blink), 1, 2],
//   [fadeIn(image(danielProfileImg)), 1, 4],
//   [fadeIn(speed(ledTest, 32), 3), 5, 10],
//   [subtract(
//     subtract(one, image(danielProfileImg)),
//     speed(ledTest, 64)
//   ), 4, 10],
// );

// export default sequence(
//   [fadeIn(blink), 3],
//   [image(danielProfileImg), 5],
//   [ledTest, 3],
// );


// export const delay = (
//   component: LedAnimGeneratorComponent,
//   count = 5,
// ) => (
//   x: number,
//   y: number,
//   config: LedAnimComponentConfig
// ) => {
//   // for (let j = 0; j <= 8; j++) {
//   // 	mx[i] += fn(x, y, { ...config, time: t - j }) * 0.01 * (8 - j);
//   // }

//     return component(x, y, config);
//   };



// dim(delay(ledTest, 1), 0.5),


// const dimDelay = compose(dim, delay);

// export default speed(add(blink), 4.0);
// export default speed(add(ledTest, blink), 4.0);
// export default delay(speed(ledTest, 4.0));

// export default speed(
//   add(
//     ledTest,
//     dim(delay(ledTest, 1), 0.25),
//     dim(delay(ledTest, 2), 0.20),
//     dim(delay(ledTest, 3), 0.15),
//     dim(delay(ledTest, 4), 0.10),
//     dim(delay(ledTest, 5), 0.05),
//   ), 16.0
// );

// export default image(danielProfileImg);
// export default add(image(danielProfileImg), speed(ledTest, 16));

// export const fadeIn = (
//   component: LedAnimGeneratorComponent,
//   duration: number = 10.0,
// ) => (
//   x: number,
//   y: number,
//   config: LedAnimComponentConfig
// ) => {
//   const f = config.t
//   return f * component(x, y, config);
//   };

// export default fadeIn(image(danielProfileImg));
// export default image(danielProfileImg);
// export default speed(ledTest, 16);
