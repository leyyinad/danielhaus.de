import { loadEnv, type Plugin } from 'vite';

interface Options {
  mode: string;
  cwd?: string;
  vars: string[];
  config?: Partial<SkrambleConfig>;
}
export interface SkrambleConfig {
  fillers: string;
  minChunkLength: number;
  maxChunkLength: number;
  minFillLength: number;
  maxFillLength: number;
  deflectorTag: string;
  dummyTag: string;
  atTag: string;
}

export const defaults: SkrambleConfig = {
  fillers: 'skramble-spam-protection-1234567890',
  minChunkLength: 2,
  maxChunkLength: 5,
  minFillLength: 2,
  maxFillLength: 5,
  deflectorTag: 'i',
  dummyTag: 'u',
  atTag: 'b'
};

export const skramble = (options: Options): Plugin[] => {
  const env = loadEnv(options.mode, options.cwd || process.cwd(), '');

  const skrambler = new Skrambler(options.config || {});

  const vars = options.vars
    .map((key) => [key, env[key]])
    .filter(([_key, value]) => value != null)
    .map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(skrambler.skramble(value))])
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

  return [
    {
      name: 'skramble',
      config() {
        return { define: vars };
      }
    }
  ];
};

export class Skrambler {
  config: SkrambleConfig;

  constructor(config?: Partial<SkrambleConfig>) {
    this.config = { ...defaults, ...config };
  }

  skramble(value: string): string {
    if (value.indexOf('@') > -1) {
      return this.skrambleEmail(value);
    }

    return this.skrambleText(value);
  }

  skrambleEmail(email: string): string {
    return email
      .split('@')
      .map((s) => this.skrambleText(s))
      .join(this.generateAtReplacement());
  }

  skrambleText(text: string): string {
    const { dummyTag, deflectorTag } = this.config;

    return this.chunkText(text)
      .map(
        (chunk) =>
          this.wrapWithTag(chunk, dummyTag) + this.wrapWithTag(this.generateFill(), deflectorTag)
      )
      .join('');
  }

  chunkText(text: string): string[] {
    const { minChunkLength, maxChunkLength } = this.config;
    let rest = text;
    const parts = [];
    while (rest.length > 0) {
      const len = this.randomInt(minChunkLength, maxChunkLength);
      parts.push(rest.substring(0, len));
      rest = rest.substring(len);
    }
    return parts;
  }

  generateFill(): string {
    const { fillers, minFillLength, maxFillLength } = this.config;
    const fillLength = this.randomInt(minFillLength, maxFillLength);
    const maxStart = fillers.length - fillLength;
    const start = this.randomInt(0, maxStart);
    const end = this.randomInt(start, start + fillLength);

    return fillers.substring(start, end);
  }

  generateAtReplacement(): string {
    return this.wrapWithTag('@', this.config.atTag);
  }

  wrapWithTag(hypertext: string, tagName: string): string {
    return `<${tagName}>${hypertext}</${tagName}>`;
  }

  randomFloat(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  randomInt(min: number, max: number): number {
    return Math.floor(this.randomFloat(min, max));
  }
}
