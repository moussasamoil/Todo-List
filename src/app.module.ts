import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/authentication.guard';
import { JwtEncryptService } from './common/services/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from './repositories/user.repo';
import { userModel } from './models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
        onConnectionCreate: (connect: Connection) => {
          connect.on("connected", () => {
            console.log(`connect to db ${config.get<string>('DATABASE_URL')}`)
          })
          connect.on("error", () => {
            console.log(`error  ${config.get<string>('DATABASE_URL')}`)
          })
          connect.on("disconnected", () => {
            console.log(`disconnection  ${config.get<string>('DATABASE_URL')}`)
          })
        }
      }),
    }),
    UserModule,
    AuthModule,
    userModel],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AppService, JwtEncryptService, JwtService, UserRepo],
})
export class AppModule { }
