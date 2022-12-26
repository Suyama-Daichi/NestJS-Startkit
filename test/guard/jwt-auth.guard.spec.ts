import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

describe('AuthUserGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
