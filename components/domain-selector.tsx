"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Loader2 } from "lucide-react"
import { debounce } from 'lodash'

interface DomainSelectorProps {
  onChange: (domain: string) => void
}

export function DomainSelector({ onChange }: DomainSelectorProps) {
  const [domainType, setDomainType] = useState("subdomain")
  const [subdomain, setSubdomain] = useState("")
  const [customDomain, setCustomDomain] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkDomainAvailability = async (domain: string) => {
    if (!domain) {
      setIsAvailable(null);
      setErrorMessage(null);
      return;
    }

    setIsChecking(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/check-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check domain availability');
      }

      setIsAvailable(data.available);
      if (!data.available) {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error checking domain:', error);
      setErrorMessage('Failed to check domain availability');
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  // Create a debounced version of the check function
  const debouncedCheck = debounce(checkDomainAvailability, 500);

  const handleDomainTypeChange = (value: string) => {
    setDomainType(value);
    if (value === "subdomain") {
      onChange(subdomain ? `${subdomain}.vercel.app` : "");
    } else {
      onChange(customDomain);
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(value);
    onChange(`${value}.vercel.app`);
    if (value) {
      debouncedCheck(value);
    }
  };

  const handleCustomDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setCustomDomain(value);
    onChange(value);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedCheck.cancel();
    };
  }, []);

  return (
    <div className="space-y-6">
      <RadioGroup value={domainType} onValueChange={handleDomainTypeChange}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="subdomain" id="subdomain" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="subdomain" className="font-medium">
                Use Vercel Subdomain (Free)
              </Label>
              <p className="text-sm text-muted-foreground">Get a free yourname.vercel.app domain</p>

              {domainType === "subdomain" && (
                <div className="mt-3 flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Input
                      value={subdomain}
                      onChange={handleSubdomainChange}
                      placeholder="yourname"
                      className="pr-24"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted-foreground">
                      .vercel.app
                    </div>
                  </div>

                  {isChecking && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}

                  {isAvailable === true && !isChecking && (
                    <div className="flex items-center text-sm text-green-500">
                      <Check className="mr-1 h-4 w-4" />
                      Available
                    </div>
                  )}

                  {isAvailable === false && !isChecking && (
                    <div className="text-sm text-red-500">{errorMessage || 'Already taken'}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="custom" className="font-medium">
                Use Custom Domain
              </Label>
              <p className="text-sm text-muted-foreground">Use a domain you already own</p>

              {domainType === "custom" && (
                <div className="mt-3">
                  <Input value={customDomain} onChange={handleCustomDomainChange} placeholder="example.com" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    After deployment, you'll need to update DNS settings with your domain registrar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
