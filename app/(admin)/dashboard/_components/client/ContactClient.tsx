"use client";

import { ContactForm } from "../ContactForm";
import { SectionPageShell } from "../SectionPageShell";
import { useSectionContent } from "../useSectionContent";

export default function ContactClient({ initial }: { initial: any }) {
  const manager = useSectionContent("contact", {
    initial,
    skipInitialFetch: true,
  });
  return (
    <SectionPageShell
      title="Contact"
      description="Edit the contact details, form copy, and subject options."
      manager={manager}
    >
      <ContactForm
        value={manager.value}
        onChange={manager.setValue}
        onSave={() => void manager.save()}
        saving={manager.saving}
      />
    </SectionPageShell>
  );
}
