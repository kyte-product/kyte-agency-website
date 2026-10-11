import {defineArrayMember, defineField, defineType} from 'sanity'
import {documentFields} from './shared'

const workFilterCategories = [
  {title: 'Website Design', value: 'Website Design'},
  {title: 'Brand Identity', value: 'Brand Identity'},
  {title: 'Logo Design', value: 'Logo Design'},
  {title: 'Content Marketing', value: 'Content Marketing'},
  {title: 'Media Production', value: 'Media Production'},
  {title: 'Personal Branding', value: 'Personal Branding'},
]

export const workProject = defineType({
  name: 'workProject',
  title: 'Work Projects',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'project', title: 'Project details'},
    {name: 'publishing', title: 'Publishing'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Project title', type: 'string', group: 'content', validation: rule => rule.required().max(100)}),
    ...documentFields('content', 'publishing', 'seo', {bodyRequired: false}),
    defineField({name: 'bodyMode', title: 'Case-study content layout', type: 'string', group: 'content', initialValue: 'standard', options: {list: [
      {title: 'Written story or custom sections', value: 'standard'},
      {title: 'Hero only, then related projects', value: 'heroOnly'},
    ]}, description: 'Use the hero-only layout when the source project has no written case-study body. Custom sections, if added, always appear between the hero and related projects.'}),
    defineField({name: 'sections', title: 'Custom case-study sections', description: 'Arrange these sections in the order they should appear. When present, they replace the legacy Page content and Gallery below; the shared hero, project facts, results, related work and footer remain.', type: 'array', group: 'content', of: [
      defineArrayMember({type: 'workTextSection'}), defineArrayMember({type: 'workMediaSection'}), defineArrayMember({type: 'workSplitSection'}),
      defineArrayMember({type: 'workMetricSection'}), defineArrayMember({type: 'workGallerySection'}), defineArrayMember({type: 'workVideoSection'}),
    ]}),
    defineField({name: 'client', title: 'Client', type: 'string', group: 'project', validation: rule => rule.required()}),
    defineField({name: 'role', title: 'Kyte’s role', type: 'string', group: 'project'}),
    defineField({name: 'projectType', title: 'Project type label', type: 'string', group: 'project', description: 'The category shown in the project detail hero.'}),
    defineField({name: 'duration', title: 'Project duration', type: 'string', group: 'project'}),
    defineField({name: 'location', title: 'Project location', type: 'string', group: 'project'}),
    defineField({name: 'services', title: 'Services', type: 'array', group: 'project', of: [{type: 'string'}]}),
    defineField({name: 'cardService', title: 'Work card service label', description: 'The short service line shown beneath this project on the Work listing.', type: 'string', group: 'project', validation: rule => rule.required().max(100)}),
    defineField({name: 'filterCategories', title: 'Work filters', description: 'Choose only categories confirmed for this project in the source design.', type: 'array', group: 'project', of: [{type: 'string', options: {list: workFilterCategories}}], options: {layout: 'tags'}, validation: rule => rule.unique()}),
    defineField({name: 'gallery', title: 'Gallery', type: 'array', group: 'content', of: [{type: 'editorialImage'}]}),
    defineField({name: 'projectUrl', title: 'Live project URL', type: 'url', group: 'project'}),
    defineField({name: 'outcomes', title: 'Verified outcomes', type: 'array', group: 'project', of: [{type: 'object', fields: [
      defineField({name: 'label', title: 'Outcome', type: 'string', validation: rule => rule.required()}),
      defineField({name: 'evidence', title: 'Source or approval evidence', type: 'string', validation: rule => rule.required()}),
    ]}]}),
    defineField({name: 'completedAt', title: 'Completion date', type: 'date', group: 'project'}),
    defineField({name: 'relatedProjects', title: 'Related projects', type: 'array', group: 'project', of: [{type: 'reference', to: [{type: 'workProject'}], weak: true}], validation: rule => rule.unique(), description: 'Weak references allow the two source cards to be linked while every project is still an unpublished draft.'}),
  ],
  validation: rule => rule.custom(document => document?.bodyMode === 'heroOnly' || document?.sections?.length || document?.body?.length ? true : 'Add custom sections or page content.'),
  preview: {select: {title: 'title', subtitle: 'client', media: 'coverImage'}},
})
