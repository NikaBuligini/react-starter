// @flow

export default (percentage: number, ratio: number = 40) => {
  const progress = Math.floor(percentage * ratio);
  const body = '#'.repeat(progress);
  const spaceLeft = '-'.repeat(ratio - progress);

  return `[${body}${spaceLeft}] ${Math.floor(percentage * 100)}%`;
};
