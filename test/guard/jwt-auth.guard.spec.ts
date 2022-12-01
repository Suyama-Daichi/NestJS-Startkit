import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';

describe('AuthUserGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
