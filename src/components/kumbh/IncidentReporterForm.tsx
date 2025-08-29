'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Camera, MapPin, Loader2 } from 'lucide-react';
import Image from 'next/image';

export function IncidentReporterForm() {
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [locationStatus, setLocationStatus] = useState('Fetching location...');
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
          setLocationStatus('Location captured');
        },
        () => {
          setLocationStatus('Could not get location. Please enable permissions.');
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !imagePreview || !location) {
      alert('Please fill all fields, upload an image, and allow location access.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      // Reset form
      setDescription('');
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>Provide details and a photo of the incident.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue (e.g., overflowing bin, litter on the ground)."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Photo</Label>
              <div
                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <Image src={imagePreview} alt="Incident preview" width={150} height={150} className="rounded-md object-cover" />
                ) : (
                  <>
                    <Camera className="size-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Click to upload a photo</p>
                  </>
                )}
              </div>
              <Input
                ref={fileInputRef}
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                required
              />
            </div>
            {isClient && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted rounded-md">
                <MapPin className="size-4" />
                <span>{location || locationStatus}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting || !location}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Submitted!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your contribution to keeping Mahakumbh clean and safe. Our team will review your report shortly.
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
