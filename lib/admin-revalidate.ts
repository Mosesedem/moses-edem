import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_CACHE_TAG } from "@/lib/queries";
import { PERSONA_KEYS } from "@/lib/schema";

/** Bust public CMS cache + path-level revalidation after admin writes. */
export function revalidatePublicSite() {
  revalidateTag(CMS_CACHE_TAG, "max");
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/blog");
  for (const key of PERSONA_KEYS) {
    revalidatePath(`/${key}`);
  }
}

export function revalidateAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/personas");
  revalidatePath("/admin/blocks");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/profile");
}
