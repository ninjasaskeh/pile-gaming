"use client";

import { useSectionContent } from "../useSectionContent";
import { SimpleDataTable } from "../SimpleDataTable";

export default function FooterClient({ initial }: { initial: any }) {
  const manager = useSectionContent("footer", {
    initial,
    skipInitialFetch: true,
  });

  return (
    <>
      <SimpleDataTable
        title="Footer Fields"
        description="Brand, contact, and map embed settings."
        rows={[
          {
            id: "brandName",
            keyPath: "brandName",
            value: manager.value?.brandName ?? "",
          },
          {
            id: "address",
            keyPath: "address",
            value: manager.value?.address ?? "",
          },
          { id: "email", keyPath: "email", value: manager.value?.email ?? "" },
          { id: "phone", keyPath: "phone", value: manager.value?.phone ?? "" },
          {
            id: "emailHref",
            keyPath: "emailHref",
            value: manager.value?.emailHref ?? "",
          },
          {
            id: "phoneHref",
            keyPath: "phoneHref",
            value: manager.value?.phoneHref ?? "",
          },
          {
            id: "mapEmbedUrl",
            keyPath: "mapEmbedUrl",
            value: manager.value?.mapEmbedUrl ?? "",
          },
        ]}
        onChange={(rows) => {
          const get = (id: string) =>
            rows.find((r) => r.id === id)?.value || null;
          manager.setValue({
            ...manager.value,
            brandName: get("brandName"),
            address: get("address"),
            email: get("email"),
            phone: get("phone"),
            emailHref: get("emailHref"),
            phoneHref: get("phoneHref"),
            mapEmbedUrl: get("mapEmbedUrl"),
          });
        }}
        onSave={() => manager.save()}
        saving={manager.saving}
      />
    </>
  );
}
