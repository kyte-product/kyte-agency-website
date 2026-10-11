import {defineArrayMember, defineField, defineType} from 'sanity'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'Search and sharing',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'SEO title', type: 'string', validation: rule => rule.max(70)}),
    defineField({name: 'description', title: 'SEO description', type: 'text', rows: 3, validation: rule => rule.max(180)}),
    defineField({name: 'socialImage', title: 'Social sharing image', type: 'image', options: {hotspot: true}, fields: [
      defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: rule => rule.required()}),
    ]}),
  ],
})

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Editorial image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({name: 'alt', title: 'Alternative text', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
})

export const legacyEditorialMedia = defineType({
  name: 'legacyEditorialMedia',
  title: 'Legacy editorial media reference',
  type: 'object',
  fields: [
    defineField({name: 'source', title: 'Source asset path (internal)', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'alt', title: 'Existing alternative text', type: 'string'}),
  ],
})

export const richBody = defineType({
  name: 'richBody',
  title: 'Rich editorial content',
  type: 'array',
  of: [
    defineArrayMember({type: 'block', styles: [
      {title: 'Paragraph', value: 'normal'},
      {title: 'Heading 2', value: 'h2'},
      {title: 'Heading 3', value: 'h3'},
      {title: 'Quote', value: 'blockquote'},
    ], lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}], marks: {
      decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
      annotations: [defineArrayMember({name: 'link', title: 'Link', type: 'object', fields: [
        defineField({name: 'href', title: 'URL', type: 'url', validation: rule => rule.required()}),
      ]})],
    }}),
    defineArrayMember({type: 'editorialImage'}),
  ],
})

export const documentFields = (contentGroup: string, publishingGroup: string, seoGroup: string, {bodyRequired = true}: {bodyRequired?: boolean} = {}) => [
  defineField({name: 'slug', title: 'URL slug', type: 'slug', group: contentGroup, options: {source: 'title'}, validation: rule => rule.required()}),
  defineField({name: 'summary', title: 'Short summary', type: 'text', group: contentGroup, rows: 3, validation: rule => rule.required().max(240)}),
  defineField({name: 'coverImage', title: 'Cover image', type: 'editorialImage', group: contentGroup, validation: rule => rule.required()}),
  defineField({name: 'legacyCoverUrl', title: 'Legacy image URL (internal)', type: 'string', group: publishingGroup, readOnly: true, hidden: true}),
  defineField({name: 'legacyCoverAlt', title: 'Legacy image alt text (internal)', type: 'string', group: publishingGroup, readOnly: true, hidden: true}),
  defineField({name: 'legacyGallery', title: 'Legacy gallery assets (internal)', type: 'array', group: publishingGroup, of: [{type: 'legacyEditorialMedia'}], readOnly: true, hidden: true}),
  defineField({name: 'body', title: 'Page content', type: 'richBody', group: contentGroup, validation: rule => bodyRequired ? rule.required().min(1) : rule}),
  defineField({name: 'featured', title: 'Featured', type: 'boolean', group: publishingGroup, initialValue: false}),
  defineField({name: 'sortOrder', title: 'Manual sort order', type: 'number', group: publishingGroup, initialValue: 0, validation: rule => rule.integer().min(0)}),
  defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: seoGroup}),
  defineField({name: 'migrationSource', title: 'Migration source (internal)', type: 'string', group: publishingGroup, readOnly: true, hidden: true}),
]
