import { GoogleAuthorizationMiddleware } from './googleAuthorization.middleware';

describe('GoogleAuthorizationMiddleware', () => {
  it('should be defined', () => {
    expect(new GoogleAuthorizationMiddleware()).toBeDefined();
  });
});
