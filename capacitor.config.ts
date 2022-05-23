import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.organizador.log',
  appName: 'OrganizadorEstudio',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '918626326557-m87q0d092u343dkjl9u09dasnrbd9fic.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
