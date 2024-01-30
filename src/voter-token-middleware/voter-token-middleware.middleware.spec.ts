import { VoterTokenMiddlewareMiddleware } from './voter-token-middleware.middleware';

describe('VoterTokenMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new VoterTokenMiddlewareMiddleware()).toBeDefined();
  });
});
