import {defineField, defineType} from 'sanity'
import {documentFields} from './shared'

export const designNews = defineType({
  name: 'designNews',
  title: 'Design News',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content', validation: rule => rule.required().max(110)}),
    ...documentFields('content', 'metadata', 'seo'),
    defineField({name: 'author', title: 'Author', type: 'string', group: 'metadata', validation: rule => rule.required()}),
    defineField({name: 'authorRole', title: 'Author role', type: 'string', group: 'metadata'}),
    defineField({name: 'authorLocation', title: 'Author location', type: 'string', group: 'metadata'}),
    defineField({name: 'authorBio', title: 'Author bio', type: 'text', rows: 3, group: 'metadata'}),
    defineField({name: 'authorLinkedIn', title: 'Author LinkedIn URL', type: 'url', group: 'metadata'}),
    defineField({name: 'category', title: 'Category', type: 'string', group: 'metadata', validation: rule => rule.required()}),
    defineField({name: 'tags', title: 'Tags', type: 'array', group: 'metadata', of: [{type: 'string'}]}),
    defineField({name: 'publishedAt', title: 'Publish date', type: 'datetime', group: 'metadata'}),
    defineField({name: 'updatedAt', title: 'Updated date', type: 'datetime', group: 'metadata'}),
    defineField({name: 'featuredOrder', title: 'Featured story order', type: 'number', group: 'metadata', description: 'Order in the featured horizontal story strip. Lower numbers appear first.', validation: rule => rule.integer().min(0)}),
    defineField({name: 'relatedArticles', title: 'Related Design News', type: 'array', group: 'metadata', of: [{type: 'reference', to: [{type: 'designNews'}]}], validation: rule => rule.unique()}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'coverImage'}},
})
