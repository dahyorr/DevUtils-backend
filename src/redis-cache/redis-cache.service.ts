import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setValue<T>(key: string, value: T) {
    /* set value in cache */
    return await this.cacheManager.set<T>(key, value);
  }

  async getValue<T>(key: string){
    /* retrieve value from cache */
    return await this.cacheManager.get<T>(key);
  }
}
