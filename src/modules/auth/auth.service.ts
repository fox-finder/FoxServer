/**
 * Auth service.
 * @file 权限与管理员模块服务
 * @module module/auth/service
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import * as APP_CONFIG from '@app/app.config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@app/transforms/model.transform';
import { decodeBase64, decodeMd5 } from '@app/transforms/codec.transform';
import { TMongooseModel } from '@app/interfaces/mongoose.interface';
import { ITokenResult } from './auth.interface';
import { Auth } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Auth) private readonly authModel: TMongooseModel<Auth>,
  ) {}

  // 签发 Token
  private createToken(): ITokenResult {
    return {
      access_token: this.jwtService.sign({ data: APP_CONFIG.AUTH.data }),
      expires_in: APP_CONFIG.AUTH.expiresIn as number,
    };
  }

  // 获取已有密码
  private getExtantPassword(auth: Auth): string {
    return auth && auth.password || decodeMd5(APP_CONFIG.AUTH.defaultPassword as string);
  }

  // 验证 Auth 数据
  public validateAuthData(payload: any): Promise<any> {
    const isVerified = lodash.isEqual(payload.data, APP_CONFIG.AUTH.data);
    return isVerified ? payload.data : null;
  }

  // 获取管理员信息
  public getAdminInfo(): Promise<Auth> {
    return this.authModel.findOne(null, '-_id name slogan gravatar').exec();
  }

  // 修改管理员信息
  public putAdminInfo(auth: Auth): Promise<Auth> {

    // 密码解码
    const password = decodeBase64(auth.password);
    const new_password = decodeBase64(auth.new_password);

    Reflect.deleteProperty(auth, 'password');
    Reflect.deleteProperty(auth, 'new_password');

    // 验证密码
    if (password || new_password) {
      if (!password || !new_password) {
        return Promise.reject('密码不完整或无效');
      }
      if (password === new_password) {
        return Promise.reject('新旧密码不可一致');
      }
    }

    return this.authModel
      .findOne()
      .exec()
      .then(extantAuth => {

        // 修改密码 -> 核对已存在密码
        if (password) {
          const oldPassword = decodeMd5(password);
          const extantPassword = this.getExtantPassword(extantAuth);
          if (oldPassword !== extantPassword) {
            return Promise.reject('原密码不正确');
          } else {
            auth.password = decodeMd5(new_password);
          }
        }

        // 更新数据
        const action = extantAuth && !!extantAuth._id
          ? Object.assign(extantAuth, auth).save()
          : new this.authModel(auth).save();

        return action.then(data => {
          data = data.toObject();
          Reflect.deleteProperty(data, 'password');
          return data;
        });
      });
  }

  // 登陆
  public adminLogin(password: string): Promise<ITokenResult> {
    return this.authModel
      .findOne(null, 'password')
      .exec()
      .then(auth => {
        const extantPassword = this.getExtantPassword(auth);
        const loginPassword = decodeMd5(decodeBase64(password));
        if (loginPassword === extantPassword) {
          return Promise.resolve(this.createToken());
        } else {
          return Promise.reject('密码不匹配');
        }
      });
  }
}
