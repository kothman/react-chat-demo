import * as path from 'path';
export default function(app: any) {
    app.get('/widget', function(req: any, res: any) {
        res.render(
            path.resolve(__dirname, '../../../dist/public/widget/index.html')
        );
    });
    app.get('/widget/demo', function(req: any, res: any) {
        res.render(
            path.resolve(__dirname, '../../../dist/public/widget/demo.html')
        );
    });
}