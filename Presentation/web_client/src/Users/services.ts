import { BaseService } from '../data/services/BaseService.ts';

export class UserServices extends BaseService {
    constructor() {
        super('/user');
    }
}
