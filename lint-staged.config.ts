import { type Configuration } from 'lint-staged';

const config: Configuration = {
  'src/**/*.ts': ['npm run lint:check', 'npm run format:check'],
};

export default config;
