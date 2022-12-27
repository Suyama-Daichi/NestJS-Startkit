import { AppController } from '@controllers/app.controller';
import { Module } from '@nestjs/common';
import { AppService } from '@services/app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user.module';
import configuration from '../config/configuration';
import { AuthModule } from '@/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
