import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MediaUploadField } from "@/app/_components/admin/media-upload-field";

describe("MediaUploadField", () => {
  it("keeps the uploaded media values in the form fields after the status rerender", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(new Response(JSON.stringify({ key: "art/id/file.png", url: "https://upload.example", publicUrl: "https://public.example/file.png" }), { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 200 }));

    const { container } = render(<MediaUploadField domain="artwork" fieldName="image_path" />);
    const file = new File(["png"], "art.png", { type: "image/png" });
    fireEvent.change(screen.getByLabelText("Subir imagen"), { target: { files: [file] } });

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Archivo listo para guardar"));
    expect((container.querySelector("input[name='image_path']") as HTMLInputElement).value).toBe("https://public.example/file.png");
    expect((container.querySelector("input[name='media_key']") as HTMLInputElement).value).toBe("art/id/file.png");
    expect((container.querySelector("input[name='media_size']") as HTMLInputElement).value).toBe("3");
    expect((container.querySelector("input[name='media_type']") as HTMLInputElement).value).toBe("image/png");
  });
});
