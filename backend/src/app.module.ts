import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { VacationsModule } from './modules/vacations/vacations.module';
import { LoginModule } from './modules/login/login.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    VacationsModule,
    LoginModule,
    PositionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
