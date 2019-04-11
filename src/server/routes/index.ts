import ApiRoutes from './api/index';
import WidgetRoutes from './widget';
import { App } from '../../types/express';

export default function(app: App) {
    WidgetRoutes(app);
    ApiRoutes(app);
}