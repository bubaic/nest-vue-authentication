import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtToken: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const token = context.switchToHttp().getRequest().cookies["token"];
    try {
      if (!this.jwtToken.verify(token)) {
        throw new HttpException("Unauthorized!", HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      throw new HttpException("Unauthorized!", HttpStatus.UNAUTHORIZED);
    }

    return next.handle();
  }
}
