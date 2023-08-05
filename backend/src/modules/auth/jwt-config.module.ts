import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtInterceptor } from './jwt.interceptor';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [JwtModule],
  providers: [JwtInterceptor],
})
export class JwtConfigModule {}
