export abstract class Model<T> {
  public abstract deserialize(datas: any): T;
}
