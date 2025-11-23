export async function uploadFile(file: File, token?: string): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: token ? { "x-admin-token": token } : undefined,
    body: fd,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url as string;
}
