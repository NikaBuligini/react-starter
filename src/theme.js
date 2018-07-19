// @flow

export const colors = {};

export const SIZES = {
  xsmall: { min: 0, max: 599 },
  small: { min: 600, max: 779 },
  medium: { min: 780, max: 979 },
  large: { min: 980, max: 1279 },
  xlarge: { min: 1280, max: 1339 },
  xxlarge: { min: 1340, max: Infinity },

  // Sidebar/nav related tweakpoints
  largerSidebar: { min: 1100, max: 1339 },
  sidebarFixed: { min: 2000, max: Infinity },
};

type Size = $Keys<typeof SIZES>;

export const media = {
  between(smallKey: Size, largeKey: Size, excludeLarge: boolean = false) {
    if (excludeLarge) {
      return `@media (min-width: ${SIZES[smallKey].min}px) and (max-width: ${SIZES[largeKey].min -
        1}px)`;
    }

    if (SIZES[largeKey].max === Infinity) {
      return `@media (min-width: ${SIZES[smallKey].min}px)`;
    }

    return `@media (min-width: ${SIZES[smallKey].min}px) and (max-width: ${SIZES[largeKey].max}px)`;
  },

  greaterThan(key: Size) {
    return `@media (min-width: ${SIZES[key].min}px)`;
  },

  lessThan(key: Size) {
    return `@media (max-width: ${SIZES[key].min - 1}px)`;
  },

  size(key: Size) {
    const size = SIZES[key];

    if (size.min == null) {
      return media.lessThan(key);
    }

    if (size.max == null) {
      return media.greaterThan(key);
    }

    return media.between(key, key);
  },
};
