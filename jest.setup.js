import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import 'whatwg-fetch';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
