/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import danielProfileImg from "$lib/images/daniel-profile-64px.png";
import { plasma, image, zero, random, one, rect, blink, lonelyRunner, ledTest } from "./generators";
import { translate, time, dim, vignette, speed, scale, fadeIn, fadeOut } from "./modifiers";
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

const scaledLogo = scale(logo, { sx: 0.87 });

// export default photo;

export default sequence(
  [zero, 1.],
  [fadeIn(vignette(plasma), 2), 3.],
  [fade(vignette(plasma), multiply(plasma, photo)), 2.],
  [fade(multiply(plasma, photo), photo), 5.],
  [loop(
    sequence(
      [photo, 5.],
      [fade(photo, multiply(plasma, photo)), 2.],
      [fade(multiply(plasma, photo), multiply(plasma, scaledLogo)), 2.],
      [fade(multiply(plasma, scaledLogo), scaledLogo), 2.],
      [fade(scaledLogo, multiply(plasma, scaledLogo)), 2.],
      [fade(multiply(plasma, scaledLogo), multiply(plasma, photo)), 2.],
      [fade(multiply(plasma, photo), photo), 2.],
      [photo, 15],
      [add(photo, speed(ledTest, 40)), 1.6],
      [subtract(photo, speed(ledTest, 80)), 0.8],
      [photo, 60],
    ), 60
  )]
);
