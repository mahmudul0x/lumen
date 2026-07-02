// Bengali digit utilities
const BN = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
export function bnDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => BN[+d]);
}
export const bn = bnDigits;
export function bnDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return bnDigits(d.toLocaleDateString("en-GB").replace(/\//g, "/"));
}
