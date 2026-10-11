import {defineField, defineType} from 'sanity'

export const serviceSection = defineType({
  name: 'serviceSection',
  title: 'Service section',
  type: 'object',
  fields: [
    defineField({name: 'variant', title: 'Shared section variant', description: 'One approved component variant used by every service record.', type: 'string', options: {list: ['scope', 'process', 'fit', 'proof', 'reasons', 'faq', 'deliverables', 'collaboration', 'formats']}, validation: rule => rule.required()}),
    defineField({name: 'eyebrow', title: 'Small heading', type: 'string'}),
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'body', title: 'Section content', type: 'richBody'}),
    defineField({name: 'image', title: 'Section image', type: 'editorialImage'}),
    defineField({name: 'items', title: 'Section items', type: 'array', of: [{type: 'serviceItem'}]}),
    defineField({name: 'projectSlugs', title: 'Linked Work slugs', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'metrics', title: 'Case Work metrics', type: 'array', of: [{type: 'serviceItem'}]}),
    defineField({name: 'storyItems', title: 'Process scroll-story rows', description: 'Shared two-column scroll sequence between the first and repeated process panels.', type: 'array', of: [{type: 'serviceItem'}]}),
  ],
  preview: {select: {title: 'heading', subtitle: 'variant', media: 'image'}},
})
