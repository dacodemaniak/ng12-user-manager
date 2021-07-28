import { Model } from "src/app/core/classes/model";
import { Field } from "src/app/shared/decorators/model-decorator";

export class UserModel extends Model<UserModel>{
  public id: number = 0;
  @Field(
    {
      model: this,
      validators: [
        'required'
      ]
    }
  )
  public nickname: string = '';
  @Field(
    {
      model: this,
      validators: [
        'required'
      ]
    }
  )
  public email: string = '';

  @Field(
    {
      model: this,
      validators: [
        'required'
      ]
    }
  )
  public password: string = '';

  public toString(): string {
    return `nickname : ${this.nickname}`
  }

  public deserialize(datas: any): UserModel {
    for (const property in datas) {
      if (this.hasOwnProperty(property)) {
        this[property] = datas[property];
      }
    }
    return this;
  }
}
