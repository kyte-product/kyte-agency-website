import {defineField, defineType} from 'sanity'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Services',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'presentation', title: 'Page sections'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Service title', type: 'string', group: 'content', validation: rule => rule.required().max(110)}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', group: 'content', options: {source: 'title'}, validation: rule => rule.required()}),
    defineField({name: 'summary', title: 'Short summary', type: 'text', group: 'content', rows: 3, validation: rule => rule.required().max(240)}),
    defineField({name: 'line', title: 'Short service line', type: 'string', group: 'content'}),
    defineField({name: 'headline', title: 'Page headline', type: 'string', group: 'content'}),
    defineField({name: 'framerIntro', title: 'Framer page introduction', description: 'Source-matched copy below the service title. A blank value is intentional when the published page is blank.', type: 'text', rows: 5, group: 'content'}),
    defineField({name: 'description', title: 'Long description', type: 'text', group: 'content'}),
    defineField({name: 'coverImage', title: 'Listing or hero image', type: 'editorialImage', group: 'content'}),
    defineField({name: 'cardTitle', title: 'Services card title', type: 'string', group: 'presentation'}),
    defineField({name: 'cardDescription', title: 'Services card description', type: 'text', rows: 3, group: 'presentation'}),
    defineField({name: 'sections', title: 'Page sections', description: 'Content and approved section variants for the one shared service-page design. Match each existing Framer service page before migration.', type: 'array', group: 'presentation', of: [{type: 'serviceSection'}], validation: rule => rule.required().min(1)}),
    defineField({name: 'sortOrder', title: 'Services card order', type: 'number', group: 'publishing', validation: rule => rule.integer().min(0)}),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
    defineField({name: 'migrationSource', title: 'Migration source (internal)', type: 'string', group: 'publishing', readOnly: true, hidden: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'coverImage'}},
})
