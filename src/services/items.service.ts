import type { IBasicData } from '@/interfaces/data.interface'
import { ITEMS } from '@/mocks'

export class ItemsApi {
  private data: IBasicData[]
  constructor() {
    this.data = ITEMS()
  }
  /**
   * @description get all
   */
  public async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return this.data
  }
}
