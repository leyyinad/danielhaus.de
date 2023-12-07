import danielProfileImg from '$lib/images/daniel-profile-64px.png';
import xmasTreeImg from '$lib/images/xmas-tree.svg';
import { image, ledTest, plasma, snow, zero } from './generators';
import { fadeIn, fadeOut, scale, speed, vignette } from './modifiers';
import { add, loop, multiply, sequence, subtract } from './operators';
import { fade } from './transitions';

export * from './generators';
export * from './modifiers';
export * from './operators';

const photo = image(danielProfileImg, {
  width: 64,
  height: 64
});

const xmasTree = image(xmasTreeImg, {
  width: 64,
  height: 64
});

const logo = scale(
  image('/dh-logo.svg', {
    width: 64,
    height: 64
  }),
  { sx: 0.7 }
);

const scaledLogo = scale(logo, { sx: 0.87 });

export default sequence(
  [zero, 1],

  [fadeIn(vignette(plasma), 4), 4],
  [fade(vignette(plasma), multiply(plasma, photo)), 2],
  [fade(multiply(plasma, photo), photo), 5],
  [
    loop(
      sequence(
        [photo, 5],
        [fade(photo, multiply(plasma, photo)), 2],
        [fade(multiply(plasma, photo), multiply(plasma, scaledLogo)), 2],
        [fade(multiply(plasma, scaledLogo), scaledLogo), 2],
        [scale(scaledLogo, { sx: (t) => Math.cos(t * 5.0), sy: 1.0 }), (2 * Math.PI) / 5.0],
        [fade(scaledLogo, multiply(plasma, scaledLogo)), 2],
        [fade(multiply(plasma, scaledLogo), multiply(plasma, photo)), 2],
        [fade(multiply(plasma, photo), photo), 2],

        // [photo, 15],

        // BEGIN: xmas
        [photo, 4],
        [fade(photo, snow), 2],
        [snow, 1],
        [add(snow, fadeIn(xmasTree, 2)), 2],
        [add(xmasTree, fadeOut(snow, 4)), 4],
        [fade(xmasTree, photo), 2],
        // END: xmas

        [add(photo, speed(ledTest, 40)), 1.6],
        [subtract(photo, speed(ledTest, 80)), 0.8],
        [photo, 60]
      ),
      60
    )
  ]
);
