import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin.module';
import { StudentModule } from './modules/student.module';
import { TeacherModule } from './modules/teacher.module';
import { ClazsModule } from './modules/clazs.module';
import { CourseModule } from './modules/course.module';
import { Clazs } from './entities/clazs.entity';
import { Admin} from './entities/admin.entity';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { Course } from './entities/course.entity';
import { ScoreModule } from './modules/score.module';
import { Score } from './entities/score.entity';
import { TcModule } from './modules/tc.module';
import { Tc } from './entities/tc.entity';
import { Sc } from './entities/sc.entity';
import { ScModule } from './modules/sc.module';
//import { AuthModule } from './auth/auth.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
@Module({
  /* imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 49153,
      database: 'stuman_db',
      username: 'postgres',
      password: 'abc123',
      logging: true,
      synchronize: true,
      entities: [Clazs,Admin], 
    }),
    ClazsModule,
    AdminModule,
  ],  */

  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database:  configService.get('DB_DATABASE'),
          //logging: configService.get('DB_LOGGING'),
          //synchronize: configService.get('DB_SYNCHRONIZE'),
          entities: [ Admin, Clazs, Student, Teacher, Course, Score, Sc, Tc],
        }
      },
      inject: [ConfigService],
    }),
    AdminModule,
    ClazsModule,
    StudentModule,
    TeacherModule,
    CourseModule,
    ScoreModule,
    ScModule,
    TcModule,
//    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
