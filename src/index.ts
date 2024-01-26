interface InputRefacterOptions {
  min?: number;
  max?: number;

  small?: boolean;
  capital?: boolean;
  numeric?: boolean;
  special?: boolean;
  require?: boolean;

  pattern?: RegExp;
}

export type InputRefacterErrors = {
    [K in keyof InputRefacterOptions]: string;
}

const SMALL_REGX = new RegExp(/[a-z]+/);
const CAPITAL_REGX = new RegExp(/[A-Z]+/);
const NUMERIC_REGX = new RegExp(/\d+/);
const SPECIAL_REGX = new RegExp(/[@_-]+/);

/**
 * Input Refacter
 * -----------
 * fullstack input validation
 * @param name fieldName
 * @param value fieldValue
 * @param opts validationOptions
 * @returns vaild, error, firstError as first
 */
export default function refacter(
  name: string,
  value: string,
  opts: InputRefacterOptions
) {
  const errors: InputRefacterErrors = {};

  if (opts.require && !value) {
    errors.require = `${name} is required!`;
  }
  if (opts.small && !value.match(SMALL_REGX)) {
    errors.small = `${name} needs small letter.`;
  }
  if (opts.capital && !value.match(CAPITAL_REGX)) {
    errors.capital = `${name} needs capital letter.`;
  }
  if (opts.numeric && !value.match(NUMERIC_REGX)) {
    errors.numeric = `${name} needs numeric letter.`;
  }
  if (opts.special && !value.match(SPECIAL_REGX)) {
    errors.special = `${name} needs special letter.`;
  }
  if (opts.min && value.length < opts.min) {
    errors.min = `${name} is too short.`;
  }
  if (opts.max && value.length > opts.max) {
    errors.max = `${name} is too big.`;
  }
  if (opts.pattern && !value.match(opts.pattern)) {
    errors.pattern = `${name} is invalid.`;
  }

  const errorArray = Object.entries(errors);
  const valid: boolean = errorArray.length === 0;
  const first: string = valid ? "" : errorArray[0][1];

  return { valid, errors, first };
}
