export class ModuleLoadedOnce {
  public constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded in AppModule`);
    }
  }
}
