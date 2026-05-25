export const API_CONFIG = {
  basescanBaseUrl: import.meta.env.VITE_BASESCAN_API_URL ?? 'https://api.basescan.org/api',
  apiKey: import.meta.env.VITE_BASESCAN_API_KEY ?? '',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
};
