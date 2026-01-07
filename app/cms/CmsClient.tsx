"use client";
import * as React from "react";
import { toast } from "sonner";
import type {
  SiteContent,
  ProductOverviewItem,
  CustomerLogo,
} from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { setSection } from "../(admin)/dashboard/_actions/content";
import { CmsDataTable } from "../(admin)/dashboard/_components/CmsDataTable";
import { ItemsDataTable } from "../(admin)/dashboard/_components/ItemsDataTable";
import { ArrowUpDown } from "lucide-react";
import {
  rowsToSection,
  sectionToRows,
} from "../(admin)/dashboard/_components/cmsTableAdapters";
import { uploadFile } from "../(admin)/dashboard/_components/upload";

type SectionKey = keyof SiteContent;

const SECTION_ORDER: Array<{ key: SectionKey; title: string; hint: string }> = [
  {
    key: "productOverviewHeader",
    title: "Product Overview",
    hint: "Content for the lifecycle walkthrough",
  },
  {
    key: "productOverview",
    title: "Product Overview Items",
    hint: "One row per item with image and details",
  },
  {
    key: "marketsHeader",
    title: "Export Markets",
    hint: "Title and subtitle for the world map",
  },
  {
    key: "customersHeader",
    title: "Customers",
    hint: "Copy for the customer marquee section",
  },
  {
    key: "customers",
    title: "Customers Logos",
    hint: "Logo list shown in the marquee",
  },
];

export function CmsClient({ initial }: { initial: SiteContent }) {
  const [content, setContent] = React.useState<SiteContent>(initial);
  const [selected, setSelected] = React.useState<SectionKey>(
    "productOverviewHeader"
  );
  const [savingKey, setSavingKey] = React.useState<SectionKey | null>(null);

  const [poEditingIndex, setPoEditingIndex] = React.useState<number | null>(
    null
  );
  const [poEditingDraft, setPoEditingDraft] =
    React.useState<ProductOverviewItem | null>(null);
  const [poIsNew, setPoIsNew] = React.useState(false);
  const [poIsPending, setPoIsPending] = React.useState(false);
  const [poIsUploading, setPoIsUploading] = React.useState(false);

  const [logoEditingIndex, setLogoEditingIndex] = React.useState<number | null>(
    null
  );
  const [logoEditingDraft, setLogoEditingDraft] =
    React.useState<CustomerLogo | null>(null);
  const [logoIsNew, setLogoIsNew] = React.useState(false);
  const [logoIsPending, setLogoIsPending] = React.useState(false);

  const updateSection = <K extends SectionKey>(
    key: K,
    value: SiteContent[K]
  ) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const closePoEditor = () => {
    setPoEditingIndex(null);
    setPoEditingDraft(null);
    setPoIsNew(false);
    setPoIsPending(false);
    setPoIsUploading(false);
  };

  const handlePoAdd = () => {
    setPoIsNew(true);
    setPoEditingIndex(null);
    setPoEditingDraft({
      title: "",
      code: "",
      category: "",
      description: "",
      specs: {},
      tags: [],
    });
  };

  const handlePoEdit = (item: ProductOverviewItem, index: number) => {
    setPoIsNew(false);
    setPoEditingIndex(index);
    setPoEditingDraft(item);
  };

  const handlePoImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files?.length || !poEditingDraft || poIsUploading)
      return;

    const file = e.dataTransfer.files[0];
    setPoIsUploading(true);
    try {
      const url = await uploadFile(file);
      setPoEditingDraft({
        ...poEditingDraft,
        src: url,
      });
      toast.success("Image uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setPoIsUploading(false);
    }
  };

  const handlePoImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !poEditingDraft || poIsUploading) return;

    setPoIsUploading(true);
    try {
      const url = await uploadFile(file);
      setPoEditingDraft({
        ...poEditingDraft,
        src: url,
      });
      toast.success("Image uploaded");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
    } finally {
      setPoIsUploading(false);
      e.target.value = "";
    }
  };

  const applyPoEdit = async () => {
    if (poIsPending || poIsUploading || !poEditingDraft) return;

    setPoIsPending(true);
    const items = Array.isArray(content.productOverview?.items)
      ? ([
          ...(content.productOverview!.items as ProductOverviewItem[]),
        ] as ProductOverviewItem[])
      : [];

    if (poIsNew) {
      items.push(poEditingDraft);
    } else if (poEditingIndex != null) {
      items[poEditingIndex] = {
        ...(items[poEditingIndex] || {}),
        ...poEditingDraft,
      } as ProductOverviewItem;
    }

    const nextValue = {
      ...(content.productOverview || {}),
      items,
    } as SiteContent["productOverview"];

    updateSection("productOverview", nextValue as any);

    try {
      await setSection("productOverview" as any, nextValue as any);
      toast.success(poIsNew ? "Product item added" : "Product changes applied");
      closePoEditor();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setPoIsPending(false);
    }
  };

  const closeLogoEditor = () => {
    setLogoEditingIndex(null);
    setLogoEditingDraft(null);
    setLogoIsNew(false);
    setLogoIsPending(false);
  };

  const handleLogoAdd = () => {
    setLogoIsNew(true);
    setLogoEditingIndex(null);
    setLogoEditingDraft({ src: "", alt: "" });
  };

  const handleLogoEdit = (item: CustomerLogo, index: number) => {
    setLogoIsNew(false);
    setLogoEditingIndex(index);
    setLogoEditingDraft(item);
  };

  const applyLogoEdit = async () => {
    if (logoIsPending || !logoEditingDraft) return;

    setLogoIsPending(true);
    const logos = Array.isArray(content.customers?.logos)
      ? ([...(content.customers!.logos as CustomerLogo[])] as CustomerLogo[])
      : [];

    if (logoIsNew) {
      logos.push(logoEditingDraft);
    } else if (logoEditingIndex != null) {
      logos[logoEditingIndex] = {
        ...(logos[logoEditingIndex] || {}),
        ...logoEditingDraft,
      } as CustomerLogo;
    }

    const nextValue = {
      ...(content.customers || {}),
      logos,
    } as SiteContent["customers"];

    updateSection("customers", nextValue as any);

    try {
      await setSection("customers" as any, nextValue as any);
      toast.success(
        logoIsNew ? "Customer logo added" : "Customer logo updated"
      );
      closeLogoEditor();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setLogoIsPending(false);
    }
  };

  const handleSave = async (key: SectionKey) => {
    console.log("[CmsClient.handleSave] start", {
      key,
      payload: content[key],
    });
    setSavingKey(key);
    try {
      await setSection(key as any, content[key]);
      console.log("[CmsClient.handleSave] success", { key });
      toast.success("Content saved");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("[CmsClient.handleSave] error", { key, err });
      toast.error(message);
    } finally {
      setSavingKey(null);
    }
  };

  const sectionValue = content[selected];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Content Manager
          </h1>
          <Badge variant="outline">CMS</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Table-only editor. Changes are saved per section.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sections</CardTitle>
              <CardDescription>
                Select which section you want to edit.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {SECTION_ORDER.map((section) => (
                <Button
                  key={section.key}
                  variant={selected === section.key ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setSelected(section.key)}
                  disabled={savingKey !== null}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {section.hint}
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </aside>
        <main className="grid gap-6">
          {selected === "productOverview" ? (
            <ItemsDataTable
              title={
                SECTION_ORDER.find((s) => s.key === selected)?.title ?? "Items"
              }
              description="One row per item with image and details."
              data={content.productOverview?.items ?? []}
              getThumb={(it: any) => ({ src: it?.src, alt: it?.title })}
              filterKey="title"
              columns={[
                {
                  accessorKey: "title",
                  header: ({ column }: any) => (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      Title
                      <ArrowUpDown />
                    </Button>
                  ),
                  cell: ({ row }: any) => (
                    <div className="capitalize">{row.getValue("title")}</div>
                  ),
                },
                {
                  accessorKey: "code",
                  header: ({ column }: any) => (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      Code
                      <ArrowUpDown />
                    </Button>
                  ),
                  cell: ({ row }: any) => (
                    <div className="lowercase">{row.getValue("code")}</div>
                  ),
                },
                {
                  accessorKey: "category",
                  header: () => <div>Category</div>,
                  cell: ({ row }: any) => (
                    <div className="capitalize">{row.getValue("category")}</div>
                  ),
                },
              ]}
              renderDetail={(it: any) => (
                <div className="grid gap-2">
                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <div className="text-muted-foreground">Title</div>
                    <div>{it?.title ?? ""}</div>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <div className="text-muted-foreground">Code</div>
                    <div>{it?.code ?? ""}</div>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <div className="text-muted-foreground">Category</div>
                    <div>{it?.category ?? ""}</div>
                  </div>
                  {it?.description ? (
                    <div className="grid grid-cols-[140px_1fr] gap-2">
                      <div className="text-muted-foreground">Description</div>
                      <div>{it.description}</div>
                    </div>
                  ) : null}
                  {it?.specs ? (
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Specs</div>
                      {Object.entries(it.specs).map(([k, v]: any) => (
                        <div
                          key={k}
                          className="grid grid-cols-[140px_1fr] gap-2"
                        >
                          <div className="text-muted-foreground">{k}</div>
                          <div>{String(v ?? "")}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {Array.isArray(it?.tags) && it.tags.length ? (
                    <div className="grid grid-cols-[140px_1fr] gap-2">
                      <div className="text-muted-foreground">Tags</div>
                      <div>{it.tags.join(", ")}</div>
                    </div>
                  ) : null}
                </div>
              )}
              onDelete={(_, index) => {
                if (poIsPending) return;

                const items = Array.isArray(content.productOverview?.items)
                  ? ([
                      ...(content.productOverview!
                        .items as ProductOverviewItem[]),
                    ] as ProductOverviewItem[])
                  : [];
                items.splice(index, 1);
                const nextValue = {
                  ...(content.productOverview || {}),
                  items,
                } as SiteContent["productOverview"];
                updateSection("productOverview", nextValue as any);
                setPoIsPending(true);
                void (async () => {
                  try {
                    await setSection(
                      "productOverview" as any,
                      nextValue as any
                    );
                    toast.success("Product item deleted");
                  } catch (err) {
                    const message =
                      err instanceof Error ? err.message : "Unknown error";
                    toast.error(message);
                  } finally {
                    setPoIsPending(false);
                  }
                })();
              }}
              onEdit={(item, index) =>
                handlePoEdit(item as ProductOverviewItem, index)
              }
              onSave={async () => {}}
              saving={false}
              primaryActionLabel="Add"
              primaryActionLoading={poIsPending}
              primaryActionLoadingLabel="Opening…"
              onPrimaryAction={handlePoAdd}
            />
          ) : selected === "customers" ? (
            <ItemsDataTable
              title={
                SECTION_ORDER.find((s) => s.key === selected)?.title ?? "Items"
              }
              description="One row per logo with image and details."
              data={content.customers?.logos ?? []}
              getThumb={(lg: any) => ({ src: lg?.src, alt: lg?.alt })}
              filterKey="alt"
              columns={[
                {
                  accessorKey: "alt",
                  header: ({ column }: any) => (
                    <Button
                      variant="ghost"
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                    >
                      Alt
                      <ArrowUpDown />
                    </Button>
                  ),
                  cell: ({ row }: any) => (
                    <div className="lowercase">{row.getValue("alt")}</div>
                  ),
                },
              ]}
              renderDetail={(lg: any) => (
                <div className="grid gap-2">
                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <div className="text-muted-foreground">Alt</div>
                    <div>{lg?.alt ?? ""}</div>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <div className="text-muted-foreground">Src</div>
                    <div>{lg?.src ?? ""}</div>
                  </div>
                </div>
              )}
              onDelete={(_, index) => {
                if (logoIsPending) return;

                const logos = Array.isArray(content.customers?.logos)
                  ? ([
                      ...(content.customers!.logos as CustomerLogo[]),
                    ] as CustomerLogo[])
                  : [];
                logos.splice(index, 1);
                const nextValue = {
                  ...(content.customers || {}),
                  logos,
                } as SiteContent["customers"];
                updateSection("customers", nextValue as any);
                setLogoIsPending(true);
                void (async () => {
                  try {
                    await setSection("customers" as any, nextValue as any);
                    toast.success("Customer logo deleted");
                  } catch (err) {
                    const message =
                      err instanceof Error ? err.message : "Unknown error";
                    toast.error(message);
                  } finally {
                    setLogoIsPending(false);
                  }
                })();
              }}
              onEdit={(item, index) =>
                handleLogoEdit(item as CustomerLogo, index)
              }
              onSave={async () => {}}
              saving={false}
              primaryActionLabel="Add"
              primaryActionLoading={logoIsPending}
              primaryActionLoadingLabel="Adding…"
              onPrimaryAction={handleLogoAdd}
            />
          ) : (
            <CmsDataTable
              title={
                SECTION_ORDER.find((s) => s.key === selected)?.title ??
                String(selected)
              }
              rows={sectionToRows(selected, sectionValue)}
              onChange={(nextRows) =>
                updateSection(
                  selected,
                  rowsToSection(selected, nextRows, sectionValue)
                )
              }
              onSave={() => handleSave(selected)}
              saving={savingKey === selected}
            />
          )}
        </main>
      </div>
      <Dialog open={!!poEditingDraft}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {poIsNew ? "Add product" : "Edit product"}
            </DialogTitle>
            <DialogDescription>
              Update basic information, specs, and tags for this product.
              Changes are saved immediately when you apply them.
            </DialogDescription>
          </DialogHeader>
          {poEditingDraft ? (
            <div className="grid gap-4">
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label>Image</Label>
                <div className="grid gap-2">
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={handlePoImageDrop}
                    className="flex flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/40 bg-muted/40 px-4 py-6 text-center text-xs text-muted-foreground"
                  >
                    <p className="mb-1 font-medium">Drag and drop image here</p>
                    <p>or click to select a file</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePoImageInput}
                      className="mt-2 block text-xs"
                    />
                  </div>
                  {poEditingDraft.src ? (
                    <div className="break-all text-xs text-muted-foreground">
                      Current image: {poEditingDraft.src}
                    </div>
                  ) : null}
                  {poIsUploading ? (
                    <div className="text-xs text-muted-foreground">
                      Uploading image...
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="po-title">Title</Label>
                <Input
                  id="po-title"
                  value={poEditingDraft.title ?? ""}
                  onChange={(e) =>
                    setPoEditingDraft({
                      ...poEditingDraft,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="po-code">Code</Label>
                <Input
                  id="po-code"
                  value={poEditingDraft.code ?? ""}
                  onChange={(e) =>
                    setPoEditingDraft({
                      ...poEditingDraft,
                      code: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="po-category">Category</Label>
                <Input
                  id="po-category"
                  value={poEditingDraft.category ?? ""}
                  onChange={(e) =>
                    setPoEditingDraft({
                      ...poEditingDraft,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label htmlFor="po-description">Description</Label>
                <Textarea
                  id="po-description"
                  value={poEditingDraft.description ?? ""}
                  onChange={(e) =>
                    setPoEditingDraft({
                      ...poEditingDraft,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label>Specs</Label>
                <div className="grid gap-2">
                  {(
                    [
                      "pileHeight",
                      "weight",
                      "composition",
                      "finish",
                      "color",
                    ] as const
                  ).map((key) => (
                    <div
                      key={key}
                      className="grid grid-cols-[100px_1fr] items-center gap-2"
                    >
                      <div className="text-xs text-muted-foreground">{key}</div>
                      <Input
                        value={poEditingDraft.specs?.[key] ?? ""}
                        onChange={(e) =>
                          setPoEditingDraft({
                            ...poEditingDraft,
                            specs: {
                              ...(poEditingDraft.specs || {}),
                              [key]: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-start gap-2">
                <Label htmlFor="po-tags">Tags</Label>
                <Input
                  id="po-tags"
                  placeholder="Comma-separated"
                  value={
                    Array.isArray(poEditingDraft.tags)
                      ? poEditingDraft.tags.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    setPoEditingDraft({
                      ...poEditingDraft,
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closePoEditor}
              disabled={poIsPending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={applyPoEdit} disabled={poIsPending}>
              {poIsPending
                ? poIsNew
                  ? "Adding…"
                  : "Applying…"
                : poIsNew
                ? "Add"
                : "Apply changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!logoEditingDraft}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {logoIsNew ? "Add customer logo" : "Edit customer logo"}
            </DialogTitle>
            <DialogDescription>
              Update image URL and alt text for this logo.
            </DialogDescription>
          </DialogHeader>
          {logoEditingDraft ? (
            <div className="grid gap-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="logo-src">Src</Label>
                <Input
                  id="logo-src"
                  value={logoEditingDraft.src ?? ""}
                  onChange={(e) =>
                    setLogoEditingDraft({
                      ...logoEditingDraft,
                      src: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <Label htmlFor="logo-alt">Alt</Label>
                <Input
                  id="logo-alt"
                  value={logoEditingDraft.alt ?? ""}
                  onChange={(e) =>
                    setLogoEditingDraft({
                      ...logoEditingDraft,
                      alt: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeLogoEditor}
              disabled={logoIsPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={applyLogoEdit}
              disabled={logoIsPending}
            >
              {logoIsPending
                ? logoIsNew
                  ? "Adding…"
                  : "Applying…"
                : logoIsNew
                ? "Add"
                : "Apply changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
/*
"use client";
import * as React from "react";
import { toast } from "sonner";
import type { SiteContent } from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setSection } from "../(admin)/dashboard/_actions/content";
import { CmsDataTable } from "../(admin)/dashboard/_components/CmsDataTable";
import { JsonDataTable } from "../(admin)/dashboard/_components/JsonDataTable";
import { ItemsTable } from "../(admin)/dashboard/_components/ItemsTable";
import {
  rowsToSection,
  sectionToRows,
} from "../(admin)/dashboard/_components/cmsTableAdapters";

type SectionKey = keyof SiteContent;

const SECTION_ORDER: Array<{ key: SectionKey; title: string; hint: string }> = [
  {
    key: "productOverviewHeader",
    title: "Product Overview",
    hint: "Content for the lifecycle walkthrough",
  },
  {
    key: "productOverview",
    title: "Product Overview Items",
    hint: "One row per item with image and details",
  },
  {
    key: "marketsHeader",
    title: "Export Markets",
    hint: "Title and subtitle for the world map",
  },
  {
    key: "customersHeader",
    title: "Customers",
    import { ItemsDataTable } from "../(admin)/dashboard/_components/ItemsDataTable";
  },
  {
    key: "customers",
    title: "Customers Logos",
    hint: "Logo list shown in the marquee",
  },
];

export function CmsClient({ initial }: { initial: SiteContent }) {
  const [content, setContent] = React.useState<SiteContent>(initial);
  const [selected, setSelected] = React.useState<SectionKey>(
    "productOverviewHeader"
  );
  const [savingKey, setSavingKey] = React.useState<SectionKey | null>(null);

  const updateSection = <K extends SectionKey>(
    key: K,
    value: SiteContent[K]
  ) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: SectionKey) => {
    setSavingKey(key);
    try {
      await setSection(key as any, content[key]);
      toast.success("Content saved");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setSavingKey(null);
    }
  };

  const sectionValue = content[selected];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 py-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Content Manager
          </h1>
          <Badge variant="outline">CMS</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Table-only editor. Changes are saved per section.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sections</CardTitle>
              <CardDescription>
                Select which section you want to edit.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {SECTION_ORDER.map((section) => (
                <Button
                  key={section.key}
                  variant={selected === section.key ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setSelected(section.key)}
                  disabled={savingKey !== null}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{section.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {section.hint}
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </aside>
        <main className="grid gap-6">
          {selected === "productOverview" ? (
            <ItemsTable
              title={
                SECTION_ORDER.find((s) => s.key === selected)?.title ?? "Items"
              }
              description="One row per item. Click to view details."
              items={content.productOverview?.items ?? []}
              getThumb={(it: any) => ({ src: it?.src, alt: it?.title })}
              columns={[
                { header: "Title", render: (it: any) => it?.title ?? "" },
                { header: "Code", render: (it: any) => it?.code ?? "" },
                { header: "Category", render: (it: any) => it?.category ?? "" },
              ]}
              onSave={() => handleSave("productOverview")}
              saving={savingKey === "productOverview"}
            />
          ) : selected === "customers" ? (
            <ItemsTable
              title={
                SECTION_ORDER.find((s) => s.key === selected)?.title ?? "Items"
              }
              description="One row per logo. Click to view details."
              items={content.customers?.logos ?? []}
              getThumb={(lg: any) => ({ src: lg?.src, alt: lg?.alt })}
                <ItemsDataTable
                  title={SECTION_ORDER.find((s) => s.key === selected)?.title ?? "Items"}
                  description="One row per item with image and details."
                  data={content.productOverview?.items ?? []}
                  getThumb={(it: any) => ({ src: it?.src, alt: it?.title })}
                  filterKey="title"
                  columns={[
                    {
                      accessorKey: "title",
                      header: ({ column }: any) => (
                        <Button
                          variant="ghost"
                          onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                          }
                        >
                          Title
                          <ArrowUpDown />
                        </Button>
                      ),
                      cell: ({ row }: any) => (
                        <div className="capitalize">{row.getValue("title")}</div>
                      ),
                    },
                    {
                      accessorKey: "code",
                      header: ({ column }: any) => (
                        <Button
                          variant="ghost"
                          onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                          }
                        >
                          Code
                          <ArrowUpDown />
                        </Button>
                      ),
                      cell: ({ row }: any) => (
                        <div className="lowercase">{row.getValue("code")}</div>
                      ),
                    },
                    {
                      accessorKey: "category",
                      header: () => <div>Category</div>,
                      cell: ({ row }: any) => (
                        <div className="capitalize">{row.getValue("category")}</div>
                      ),
                    },
                  ]}
                  onSave={() => handleSave("productOverview")}
                  saving={savingKey === "productOverview"}
                />
                  selected,
                <ItemsDataTable
                  title={SECTION_ORDER.find((s) => s.key === selected)?.title ?? "Items"}
                  description="One row per logo with image and details."
                  data={content.customers?.logos ?? []}
                  getThumb={(lg: any) => ({ src: lg?.src, alt: lg?.alt })}
                  filterKey="alt"
                  columns={[
                    {
                      accessorKey: "alt",
                      header: ({ column }: any) => (
                        <Button
                          variant="ghost"
                          onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                          }
                        >
                          Alt
                          <ArrowUpDown />
                        </Button>
                      ),
                      cell: ({ row }: any) => (
                        <div className="lowercase">{row.getValue("alt")}</div>
                      ),
                    },
                  ]}
                  onSave={() => handleSave("customers")}
                  saving={savingKey === "customers"}
                />
}
*/
