import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

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
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
