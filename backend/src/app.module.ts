import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { PositionModule } from './position/position.module';
import { VacationModule } from './vacation/vacation.module';

@Module({
  imports: [UsersModule, LoginModule, PositionModule, VacationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
