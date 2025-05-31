import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config"

@Module({
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      privateKey: process.env.PRIVATE_KEY,
      publicKey: process.env.PUBLIC_KEY,
      signOptions: {
        expiresIn: "15m",
        algorithm: "RS256"
      }
    })
  
  ]
})
export class AuthModule {}
