import ApiRoutes from './api/index';
import { App } from '../../types/express';

export default function(app: App) {
    ApiRoutes(app);
}