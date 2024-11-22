import type { IBasicData } from '@/interfaces/data.interface'
import { USER_ITEMS } from '@/mocks'

export class UserItemsApi {
  private data: IBasicData[]
  constructor() {
    this.data = USER_ITEMS()
  }
  /**
   * @description get all
   */
  public async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return this.data
  }
}
