import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    UsersModule,
    CoreModule,
    JwtModule.register({
      global: true,
      secret: 'this_is_super_secret_key',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
