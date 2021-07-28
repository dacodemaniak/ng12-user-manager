export class Sort {
  private sortOrder: number = 1;
  private collator = new Intl.Collator(
    'fr-FR',
    {
      numeric: true,
      sensitivity: 'base'
    }
  );

  public startSort(property: string, order: string, type='') {
    if (order === 'desc') {
      this.sortOrder = -1;
    }

    return (obj1: any, obj2: any) => {
      return this.collator.compare(obj1[property], obj2[property]) * this.sortOrder;
    }
  }
}
