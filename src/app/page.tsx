import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, Map, ShieldAlert } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard
          href="/report-incident"
          title="Report Incident"
          icon={<ShieldAlert className="size-8 text-primary" />}
          description="Report unhygienic conditions."
        />
        <FeatureCard
          href="/map"
          title="Find Services"
          icon={<Map className="size-8 text-primary" />}
          description="Locate essential services."
        />
        <FeatureCard
          href="/health-report"
          title="Health Report"
          icon={<HeartPulse className="size-8 text-primary" />}
          description="Report health status."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  href,
  title,
  icon,
  description,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center justify-center text-center hover:bg-card/80 transition-colors">
      <Link href={href} className="w-full h-full p-4 flex flex-col items-center justify-center">
          <CardHeader className="p-2">
              {icon}
          </CardHeader>
          <CardContent className="p-2 flex flex-col gap-1">
              <CardTitle className="text-base font-bold">{title}</CardTitle>
              <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
      </Link>
    </Card>
  );
}
