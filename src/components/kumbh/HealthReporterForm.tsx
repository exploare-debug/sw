'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

const commonSymptoms = [
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Cough' },
  { id: 'headache', label: 'Headache' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'stomach_ache', label: 'Stomach Ache' },
];

export function HealthReporterForm() {
  const [symptoms, setSymptoms] = useState<Set<string>>(new Set());
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [requestMedicine, setRequestMedicine] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    setSymptoms(prev => {
      const newSymptoms = new Set(prev);
      if (checked) {
        newSymptoms.add(symptomId);
      } else {
        newSymptoms.delete(symptomId);
      }
      return newSymptoms;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.size === 0 && !otherSymptoms) {
      alert('Please select or describe your symptoms.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      // Reset form
      setSymptoms(new Set());
      setOtherSymptoms('');
      setRequestMedicine(false);
    }, 1500);
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
            <CardDescription>Please report your current health condition.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Common Symptoms</Label>
              <div className="grid grid-cols-2 gap-3">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom.id}
                      checked={symptoms.has(symptom.id)}
                      onCheckedChange={(checked) => handleSymptomChange(symptom.id, !!checked)}
                    />
                    <Label htmlFor={symptom.id} className="font-normal cursor-pointer">{symptom.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-symptoms">Other Symptoms/Details</Label>
              <Textarea
                id="other-symptoms"
                placeholder="Please describe any other symptoms..."
                value={otherSymptoms}
                onChange={(e) => setOtherSymptoms(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <Label htmlFor="request-medicine" className="font-medium">Request basic medicine?</Label>
              <Switch
                id="request-medicine"
                checked={requestMedicine}
                onCheckedChange={setRequestMedicine}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
               {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Health Report'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Health Report Submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Your health report has been received. If you requested assistance, our medical team will be in touch. Please take care.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowConfirmation(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
