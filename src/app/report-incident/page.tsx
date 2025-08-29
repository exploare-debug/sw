import { IncidentReporterForm } from '@/components/kumbh/IncidentReporterForm';

export default function ReportIncidentPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center font-headline">Report an Incident</h1>
      <p className="text-center text-muted-foreground mb-6">
        Spotted an unhygienic area? Let us know by submitting a report with a photo.
      </p>
      <IncidentReporterForm />
    </div>
  );
}
