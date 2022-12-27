import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';

describe('AuthUserGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
