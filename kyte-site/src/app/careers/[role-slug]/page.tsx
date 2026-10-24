import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import { ArrowLeft, ArrowRight } from "lucide-react";
import {SiteHeader} from '@/components/SiteHeader'
import {SiteFooter} from '@/components/SiteFooter'
import {getPublishedCareerRoleBySlug, isSafeApplicationUrl} from '@/lib/sanity'
import '../careers.css'

type Props = {params: Promise<{'role-slug': string}>}
export const instant = false;

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {'role-slug': slug} = await params
  try {
    const role = await getPublishedCareerRoleBySlug(slug)
    if (!role) return {title: 'Role unavailable | Kyte Agency'}
    return {title: role.seo?.title || `${role.title} | Careers at Kyte`, description: role.seo?.description || role.summary}
  } catch {
    return {title: 'Careers at Kyte'}
  }
}

export default async function CareerRolePage({params}: Props) {
  const {'role-slug': slug} = await params
  let role
  try {
    role = await getPublishedCareerRoleBySlug(slug)
  } catch {
    role = null
  }
  if (!role) notFound()

  return <>
    <SiteHeader />
    <main className="careers-page careers-role">
      <section className="careers-page__stage" aria-labelledby="career-role-title">
        <div className="careers-page__glow" aria-hidden="true" />
        <div className="careers-page__inner">
          <Link className="careers-role__back" href="/careers"><ArrowLeft size={17} aria-hidden="true" /> All opportunities</Link>
          <div className="careers-role__intro">

            <h1 id="career-role-title">{role.title}</h1>
            <p>{role.summary}</p>
            <div className="careers-role__facts">{[role.location, role.workMode, role.employmentType].filter(Boolean).map(item => <span key={item}>{item}</span>)}</div>
            {isSafeApplicationUrl(role.applyUrl) ? <a className="kyte-button careers-page__apply" href={role.applyUrl!} target="_blank" rel="noopener noreferrer">Apply now <ArrowRight size={17} aria-hidden="true" /></a> : <button className="kyte-button careers-page__apply" type="button" disabled>Apply now <ArrowRight size={17} aria-hidden="true" /></button>}
          </div>
          <div className="careers-role__body">
            <section aria-labelledby="role-responsibilities"><h2 id="role-responsibilities">What you will do</h2><ul>{role.responsibilities?.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>
            <section aria-labelledby="role-requirements"><h2 id="role-requirements">What we are looking for</h2><ul>{role.requirements?.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>
            {role.hiringProcess && <section aria-labelledby="role-process"><h2 id="role-process">Hiring process</h2><p>{role.hiringProcess}</p></section>}
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>
}
