"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Field } from "./Field";
import type { MarketsContent, MarketPoint } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const numberOrUndefined = (value: string): number | undefined => {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export function MarketsForm({
  value,
  onChange,
  onSave,
  saving,
}: {
  value?: MarketsContent;
  onChange: (v: MarketsContent) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const marketsContent = value ?? {};
  const header = marketsContent.header ?? {};

  const update = (next: Partial<MarketsContent>) => {
    onChange({ ...marketsContent, ...next });
  };

  const updateHeader = (patch: typeof header) => {
    update({ header: { ...header, ...patch } });
  };

  const origin: MarketPoint = marketsContent.origin ?? {};
  const markets: MarketPoint[] = marketsContent.markets ?? [];
  const [openAdd, setOpenAdd] = React.useState(false);
  const [draft, setDraft] = React.useState<MarketPoint>({});

  const updateOrigin = (patch: Partial<MarketPoint>) => {
    update({ origin: { ...origin, ...patch } });
  };
  const updateMarket = (index: number, patch: Partial<MarketPoint>) => {
    const next = markets.slice();
    next[index] = { ...(next[index] ?? {}), ...patch };
    update({ markets: next });
  };
  const addMarket = () => {
    setDraft({});
    setOpenAdd(true);
  };
  const confirmAdd = async () => {
    const next = [...markets, draft];
    update({ markets: next });
    setOpenAdd(false);
    await onSave();
  };
  const removeMarket = (index: number) => {
    const next = markets.slice();
    next.splice(index, 1);
    update({ markets: next });
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle>Export Markets</CardTitle>
        <p className="text-sm text-muted-foreground">
          Update the world map labels and routes displayed in the markets
          section.
        </p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Kicker">
            <Input
              value={header.kicker ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateHeader({ kicker: event.target.value })
              }
            />
          </Field>
          <Field label="Title">
            <Input
              value={header.title ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateHeader({ title: event.target.value })
              }
            />
          </Field>
        </div>
        <Field label="Subtitle">
          <Textarea
            value={header.subtitle ?? ""}
            rows={3}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateHeader({ subtitle: event.target.value })
            }
          />
        </Field>

        <Separator />
        <div className="grid gap-3">
          <p className="text-sm font-medium">Origin</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Latitude">
              <Input
                value={String(origin.lat ?? "")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateOrigin({ lat: numberOrUndefined(e.target.value) })
                }
              />
            </Field>
            <Field label="Longitude">
              <Input
                value={String(origin.lng ?? "")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateOrigin({ lng: numberOrUndefined(e.target.value) })
                }
              />
            </Field>
            <Field label="Label">
              <Input
                value={origin.label ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateOrigin({ label: e.target.value })
                }
              />
            </Field>
          </div>
        </div>

        <Separator />
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Markets</p>
          <Button type="button" variant="outline" onClick={addMarket}>
            Add market
          </Button>
        </div>
        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Market</DialogTitle>
              <DialogDescription>
                Enter coordinates and label.
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Latitude">
                <Input
                  value={String(draft.lat ?? "")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDraft({
                      ...draft,
                      lat: numberOrUndefined(e.target.value),
                    })
                  }
                />
              </Field>
              <Field label="Longitude">
                <Input
                  value={String(draft.lng ?? "")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDraft({
                      ...draft,
                      lng: numberOrUndefined(e.target.value),
                    })
                  }
                />
              </Field>
              <Field label="Label">
                <Input
                  value={draft.label ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDraft({ ...draft, label: e.target.value })
                  }
                />
              </Field>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAdd(false)}>
                Cancel
              </Button>
              <Button onClick={confirmAdd} disabled={saving}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="grid gap-4">
          {markets.map((m, idx) => (
            <Card key={idx}>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Market {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid md:grid-cols-4 gap-4">
                  <Field label="Latitude">
                    <Input
                      value={String(m.lat ?? "")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateMarket(idx, {
                          lat: numberOrUndefined(e.target.value),
                        })
                      }
                    />
                  </Field>
                  <Field label="Longitude">
                    <Input
                      value={String(m.lng ?? "")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateMarket(idx, {
                          lng: numberOrUndefined(e.target.value),
                        })
                      }
                    />
                  </Field>
                  <Field label="Label">
                    <Input
                      value={m.label ?? ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateMarket(idx, { label: e.target.value })
                      }
                    />
                  </Field>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeMarket(idx)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {markets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No markets yet. Click &quot;Add market&quot; to create one.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
