import { useTranslation } from 'react-i18next';
import { Megaphone } from 'lucide-react';

export default function AnnouncementMarquee() {
  const { t } = useTranslation();

  return (
    <section className="mb-6">
      <div className="bg-gaming-amber/10 border border-gaming-amber/30 rounded-lg p-3 overflow-hidden">
        <div className="flex items-center">
          <Megaphone className="text-gaming-amber mr-3 flex-shrink-0" />
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-sm">{t('announcement')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
