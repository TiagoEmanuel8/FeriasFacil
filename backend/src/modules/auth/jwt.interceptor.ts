import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (token) {
      const decoded = this.jwtService.decode(token);
      request.user = decoded;
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
