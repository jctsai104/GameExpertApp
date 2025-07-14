import { useTranslation } from 'react-i18next';
import { QrCode, Upload, Camera, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Scan() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 px-4 py-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          {t('scan')}
        </h1>

        {/* QR Scanner Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                <QrCode className="w-16 h-16 text-slate-400" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                {t('scan_qr_description')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2"
          >
            <Camera className="w-6 h-6" />
            <span className="text-sm">{t('camera')}</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2"
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm">{t('upload_image')}</span>
          </Button>
        </div>

        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>{t('recent_scans')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <QrCode className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('no_recent_scans')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}