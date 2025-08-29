import { HealthReporterForm } from '@/components/kumbh/HealthReporterForm';

export default function HealthReportPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center font-headline">Health Report</h1>
      <p className="text-center text-muted-foreground mb-6">
        Feeling unwell? Report your symptoms and request basic medical assistance if needed.
      </p>
      <HealthReporterForm />
    </div>
  );
}
