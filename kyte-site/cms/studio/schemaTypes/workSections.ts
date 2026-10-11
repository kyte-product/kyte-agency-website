import {defineArrayMember, defineField, defineType} from 'sanity'

export const workTextSection = defineType({
  name: 'workTextSection', title: 'Text section', type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'body', title: 'Content', type: 'richBody', validation: rule => rule.required().min(1)}),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Text section'})},
})

export const workMediaSection = defineType({
  name: 'workMediaSection', title: 'Image section', type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'editorialImage', validation: rule => rule.required()}),
    defineField({name: 'width', title: 'Image width', type: 'string', options: {list: [
      {title: 'Content width', value: 'content'}, {title: 'Full rail width', value: 'rail'},
    ]}, initialValue: 'content', validation: rule => rule.required()}),
  ],
  preview: {select: {title: 'image.caption', media: 'image'}, prepare: ({title, media}) => ({title: title || 'Image section', media})},
})

export const workSplitSection = defineType({
  name: 'workSplitSection', title: 'Text and image', type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: rule => rule.required()}),
    defineField({name: 'body', title: 'Content', type: 'richBody', validation: rule => rule.required().min(1)}),
    defineField({name: 'image', title: 'Image', type: 'editorialImage', validation: rule => rule.required()}),
    defineField({name: 'imageSide', title: 'Image position', type: 'string', options: {list: [
      {title: 'Left', value: 'left'}, {title: 'Right', value: 'right'},
    ]}, initialValue: 'right', validation: rule => rule.required()}),
  ],
  preview: {select: {title: 'heading', media: 'image'}},
})

export const workMetricSection = defineType({
  name: 'workMetricSection', title: 'Verified results', type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'items', title: 'Results', type: 'array', of: [defineArrayMember({type: 'object', fields: [
      defineField({name: 'value', title: 'Value', type: 'string', validation: rule => rule.required()}),
      defineField({name: 'label', title: 'Label', type: 'string', validation: rule => rule.required()}),
      defineField({name: 'evidence', title: 'Source or approval evidence (internal)', type: 'string', validation: rule => rule.required()}),
    ], preview: {select: {title: 'value', subtitle: 'label'}}})], validation: rule => rule.required().min(1)}),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Verified results'})},
})

export const workGallerySection = defineType({
  name: 'workGallerySection', title: 'Image grid', type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'images', title: 'Images', type: 'array', of: [defineArrayMember({type: 'editorialImage'})], validation: rule => rule.required().min(2)}),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Image grid'})},
})

export const workVideoSection = defineType({
  name: 'workVideoSection', title: 'Video section', type: 'object',
  fields: [
    defineField({name: 'video', title: 'Video file', type: 'file', options: {accept: 'video/*'}, validation: rule => rule.required()}),
    defineField({name: 'poster', title: 'Poster image', type: 'editorialImage', validation: rule => rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
  preview: {select: {title: 'caption', media: 'poster'}, prepare: ({title, media}) => ({title: title || 'Video section', media})},
})
