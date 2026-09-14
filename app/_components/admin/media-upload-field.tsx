"use client";

import { useState } from "react";

export function MediaUploadField({ domain, fieldName, slug = "new", url = "", keyName = "" }: { domain: string; fieldName: string; slug?: string; url?: string; keyName?: string }) {
  const [message, setMessage] = useState("");
  async function upload(file: File) {
    setMessage("Subiendo…");
    let uploadedKey = "";
    try {
      const options = { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(30000) };
      const response = await fetch("/api/admin/media/presign", { ...options, body: JSON.stringify({ domain, recordId: crypto.randomUUID(), slug, contentType: file.type, size: file.size }) });
      if (!response.ok) { setMessage("No se pudo validar el archivo"); return; }
      const signed = await response.json();
      uploadedKey = signed.key;
      const put = await fetch(signed.url, { method: "PUT", headers: { "Content-Type": file.type }, body: file, signal: AbortSignal.timeout(30000) });
      if (!put.ok) { await fetch("/api/admin/media/cleanup", { ...options, body: JSON.stringify({ key: signed.key }) }); setMessage("No se pudo subir el archivo"); return; }
      const verify = await fetch("/api/admin/media/verify", { ...options, body: JSON.stringify({ key: signed.key, size: file.size, contentType: file.type }) });
      if (!verify.ok) { await fetch("/api/admin/media/cleanup", { ...options, body: JSON.stringify({ key: signed.key }) }); setMessage("No se pudo verificar el archivo"); return; }
      (document.querySelector(`[data-media-url='${domain}']`) as HTMLInputElement).value = signed.publicUrl;
      (document.querySelector(`[data-media-key='${domain}']`) as HTMLInputElement).value = signed.key;
      (document.querySelector(`[data-media-size='${domain}']`) as HTMLInputElement).value = String(file.size);
      (document.querySelector(`[data-media-type='${domain}']`) as HTMLInputElement).value = file.type;
      setMessage("Archivo listo para guardar");
    } catch {
      if (uploadedKey) await fetch("/api/admin/media/cleanup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: uploadedKey }) }).catch(() => undefined);
      setMessage("No se pudo subir el archivo");
    }
  }
  return <div className="grid gap-1 text-sm"><label>Subir imagen<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} /></label><input type="hidden" name={fieldName} data-media-url={domain} defaultValue={url} /><input type="hidden" name="media_key" data-media-key={domain} defaultValue={keyName} /><input type="hidden" name="media_size" data-media-size={domain} /><input type="hidden" name="media_type" data-media-type={domain} />{message && <span role="status">{message}</span>}</div>;
}
