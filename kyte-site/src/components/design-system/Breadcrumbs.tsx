import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import "./Breadcrumbs.css";

/** Shared detail-page breadcrumb, based on the Work page pattern. */
export function Breadcrumbs({ href, label, current }: { href: string; label: string; current: string }) {
  return <nav className="editorial-detail__breadcrumbs" aria-label="Breadcrumb">
    <Link className="editorial-detail__breadcrumb-link" href={href}><ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" /> {label}</Link>
    <span className="editorial-detail__breadcrumb-separator" aria-hidden="true">/</span>
    <span aria-current="page">{current}</span>
  </nav>;
}
