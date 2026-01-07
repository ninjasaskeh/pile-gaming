"use client";

import { useSectionContent } from "../useSectionContent";
import { SimpleDataTable } from "../SimpleDataTable";

export default function SiteMetadataClient({ initial }: { initial: any }) {
  const manager = useSectionContent("siteMetadata", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <>
      <SimpleDataTable
        title="Site Metadata Fields"
        description="Title, description, URL, OG image, and Twitter card."
        rows={[
          { id: "title", keyPath: "title", value: manager.value?.title ?? "" },
          {
            id: "description",
            keyPath: "description",
            value: manager.value?.description ?? "",
          },
          { id: "url", keyPath: "url", value: manager.value?.url ?? "" },
          {
            id: "ogImage.src",
            keyPath: "ogImage.src",
            value: manager.value?.ogImage?.src ?? "",
          },
          {
            id: "ogImage.width",
            keyPath: "ogImage.width",
            value: String(manager.value?.ogImage?.width ?? ""),
          },
          {
            id: "ogImage.height",
            keyPath: "ogImage.height",
            value: String(manager.value?.ogImage?.height ?? ""),
          },
          {
            id: "ogImage.alt",
            keyPath: "ogImage.alt",
            value: manager.value?.ogImage?.alt ?? "",
          },
          {
            id: "twitterCard",
            keyPath: "twitterCard",
            value: manager.value?.twitterCard ?? "",
          },
        ]}
        onChange={(rows) => {
          const get = (id: string) =>
            rows.find((r) => r.id === id)?.value || null;
          manager.setValue({
            ...manager.value,
            title: get("title"),
            description: get("description"),
            url: get("url"),
            ogImage: {
              src: get("ogImage.src") || undefined,
              width: (get("ogImage.width")
                ? Number(get("ogImage.width"))
                : undefined) as any,
              height: (get("ogImage.height")
                ? Number(get("ogImage.height"))
                : undefined) as any,
              alt: (get("ogImage.alt") || undefined) as any,
            },
            twitterCard: (get("twitterCard") || undefined) as any,
          });
        }}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </>
  );
}
