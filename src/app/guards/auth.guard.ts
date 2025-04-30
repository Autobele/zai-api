import { CanActivate, Injectable, ExecutionContext, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = (authorization ?? '').split(' ')[1];

    try {
      const data = this.authService.checkToken(token);
      request.tokenPayload = data;

      const user = await this.userService.show(data.id);

      request.user = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        profile: user?.profile,
        tenantId: user?.tenantId
      };

      return true;
    } catch (error) {
      return false;
    }
  }
}
