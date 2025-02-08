import { Repository, TreeRepository } from 'typeorm';
import { dataSource } from '../databases';
import { logger } from '../utils/logger';




export class AuthService {

    constructor() {

        logger.info('AuthService initialized');
    }

    addUser() {
        logger.warn('addUser method not implemented');
    }
}
