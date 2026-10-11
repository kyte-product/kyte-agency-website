import {defineField, defineType} from 'sanity'

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Small label', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'children', title: 'Nested items', type: 'array', of: [{type: 'object', fields: [
      defineField({name: 'title', title: 'Title', type: 'string', validation: rule => rule.required()}),
      defineField({name: 'description', title: 'Description', type: 'text'}),
    ]}]}),
  ],
  preview: {select: {title: 'title', subtitle: 'label'}},
})
