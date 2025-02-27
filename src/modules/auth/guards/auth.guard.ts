import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.getToken(request);

    if (!token) throw new UnauthorizedException('Unauthorized');

    const { user, token: newToken } = await firstValueFrom(
      this.clientProxy.send('auth.user.validate', token).pipe(
        catchError((error) => {
          throw new UnauthorizedException(error.message);
        }),
      ),
    );

    request['user'] = user;

    return true;
  }

  private getToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
