"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { downloadRoadmapAsSvg } from "@/lib/roadmap/download-roadmap-as-svg";
import { getSocialLinks } from "@/lib/data/social-links";

interface ShareRoadmapDialogProps {
  children: ReactNode;
}

export default function ShareRoadmapDialog({
  children,
}: ShareRoadmapDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);

    if (isOpen) {
      setUrl(window.location.href);
      setCopied(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const message = encodeURIComponent("Check out my learning roadmap!");
  const socialLinks = getSocialLinks({ encodedUrl, message });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-8 sm:max-w-md">
        <DialogHeader className="text-left mb-2">
          <div className="flex flex-col sm:flex-row items-center text-center sm:items-start sm:text-left gap-3 pr-8">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-foreground">
              <Share2 className="size-5" />
            </div>

            <div>
              <DialogTitle className="text-xl font-semibold tracking-tight">
                Share your roadmap
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Share your learning journey or save it for later.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="roadmap-share-url"
            className="inline-block font-medium"
          >
            Roadmap link
          </label>

          <div className="flex gap-2">
            <Input
              id="roadmap-share-url"
              value={url}
              readOnly
              className="h-11 min-w-0 bg-background"
            />

            <Button
              type="button"
              variant="primary"
              size="icon-lg"
              className="shrink-0"
              onClick={handleCopy}
              aria-label="Copy roadmap link"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>

          {copied && (
            <p className="text-xs text-muted-foreground">
              Link copied to clipboard
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="font-medium">Share via</p>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {socialLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share via ${name}`}
                className="group flex flex-col items-center gap-2"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted/40 text-foreground transition-colors group-hover:border-primary group-hover:bg-accent">
                  {icon}
                </span>

                <span className="text-xs text-muted-foreground">{name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full justify-center gap-2"
            onClick={() => downloadRoadmapAsSvg()}
          >
            <Download className="size-4" />
            Download roadmap as SVG
          </Button>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            Save your roadmap as a scalable vector image.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
