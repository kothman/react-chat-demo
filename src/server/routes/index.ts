import ApiRoutes from './api/index';
import WidgetRoutes from './widget';

export default function(app: any) {
    WidgetRoutes(app);
    ApiRoutes(app);
}