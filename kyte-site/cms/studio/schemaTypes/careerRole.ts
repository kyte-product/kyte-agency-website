import {defineArrayMember, defineField, defineType} from 'sanity'

export const careerRole = defineType({
  name: 'careerRole',
  title: 'Career roles',
  type: 'document',
  groups: [
    {name: 'role', title: 'Role', default: true},
    {name: 'application', title: 'Application'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Role title', type: 'string', group: 'role', validation: rule => rule.required().max(100)}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', group: 'role', options: {source: 'title'}, validation: rule => rule.required()}),
    defineField({name: 'summary', title: 'Short role summary', type: 'text', rows: 3, group: 'role', validation: rule => rule.required().max(240)}),
    defineField({name: 'team', title: 'Team', type: 'string', group: 'role'}),
    defineField({name: 'location', title: 'Location', type: 'string', group: 'role', validation: rule => rule.required()}),
    defineField({name: 'workMode', title: 'Work mode', type: 'string', group: 'role', options: {list: ['On site', 'Hybrid', 'Remote']}, validation: rule => rule.required()}),
    defineField({name: 'experienceLevel', title: 'Experience level', description: 'Shown in the second column of the careers opportunities list.', type: 'string', group: 'role', options: {list: ['Entry level', 'Mid level', 'Senior level', 'Lead level']}}),
    defineField({name: 'employmentType', title: 'Employment type', type: 'string', group: 'role', options: {list: ['Full time', 'Part time', 'Contract', 'Internship']}}),
    defineField({name: 'responsibilities', title: 'What you will do', type: 'array', group: 'role', of: [defineArrayMember({type: 'string'})], validation: rule => rule.required().min(1)}),
    defineField({name: 'requirements', title: 'What we are looking for', type: 'array', group: 'role', of: [defineArrayMember({type: 'string'})], validation: rule => rule.required().min(1)}),
    defineField({name: 'hiringProcess', title: 'Hiring process', type: 'text', rows: 4, group: 'role'}),
    defineField({name: 'applyUrl', title: 'Application link', description: 'Add the full URL of the form or application page when applications open. Until then the Apply button is disabled.', type: 'url', group: 'application', validation: rule => rule.uri({scheme: ['https', 'http']})}),
    defineField({name: 'isPlaceholder', title: 'Placeholder listing', description: 'Mark an example role until its scope, location and application link are approved.', type: 'boolean', group: 'publishing', initialValue: false}),
    defineField({name: 'status', title: 'Opening status', description: 'Only published roles marked Open appear on the website.', type: 'string', group: 'publishing', options: {list: [{title: 'Open', value: 'open'}, {title: 'Closed', value: 'closed'}], layout: 'radio'}, initialValue: 'closed', validation: rule => rule.required()}),
    defineField({name: 'sortOrder', title: 'Display order', type: 'number', group: 'publishing', initialValue: 0, validation: rule => rule.integer().min(0)}),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', status: 'status', location: 'location'},
    prepare: ({title, status, location}) => ({title, subtitle: `${status === 'open' ? 'Open' : 'Closed'}${location ? ` · ${location}` : ''}`}),
  },
})
