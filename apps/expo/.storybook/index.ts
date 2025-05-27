import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'storybook',
});

import { view } from "./storybook.requires";

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: (...args) => new Promise(_ => storage.getString(...args) ?? null),
    setItem: (...args) => new Promise(_ => storage.set(...args)),
  },
});

export default StorybookUIRoot;
