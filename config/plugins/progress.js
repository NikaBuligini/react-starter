// @flow

export default (percentage: number, ratio: number = 40) => {
  const progress = Math.floor(percentage * ratio);
  let body = '='.repeat(progress);
  const spaceLeft = ' '.repeat(ratio - progress);

  if (body.length > 0 && progress !== ratio) {
    body = `${body.substring(0, body.length - 1)}>`;
  }

  return `[${body}${spaceLeft}] ${Math.floor(percentage * 100)}%`;
};
