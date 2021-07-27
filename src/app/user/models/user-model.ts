import { Model } from "src/app/core/classes/model";

export class UserModel extends Model<UserModel>{
  public id: number = 0;
  public nickname: string = '';
  public email: string = '';
  public password: string = '';



  public deserialize(datas: any): UserModel {
    for (const property in datas) {
      if (this.hasOwnProperty(property)) {
        this[property] = datas[property];
      }
    }
    return this;
  }
}
