/**
 * App module.
 * @file App 主模块
 * @module app/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '@app/app.controller';

// 拦截器
import { HttpCacheInterceptor } from '@app/interceptors/cache.interceptor';

// 中间件
import { CorsMiddleware } from '@app/middlewares/cors.middleware';
import { OriginMiddleware } from '@app/middlewares/origin.middleware';

// 公共模块
import { DatabaseModule } from '@app/processors/database/database.module';
import { CacheModule } from '@app/processors/cache/cache.module';
import { HelperModule } from '@app/processors/helper/helper.module';

import { WallpaperModule } from '@app/modules/wallpaper/wallpaper.module';
import { AuthModule } from '@app/modules/auth/auth.module';

import * as APP_CONFIG from '@app/app.config';

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    CacheModule,

    AuthModule,
    OptionModule,
    AnnouncementModule,
    TagModule,
    CategoryModule,
    ArticleModule,
    CommentModule,
    LikeModule,

    ExpansionModule,
    MusicModule,
    BilibiliModule,
    WallpaperModule,
    SitemapModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
