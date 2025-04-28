import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

/* =================== locale: zh-CN ======================= */

const zhDemoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

const zhVoron24Note = defineNoteConfig({
    dir: 'voron24',
    link: '/voron24/',
    sidebar: [
        {
            text: 'VORON2.4介绍',
            items: [
              ''
            ],
        },
        {
            text: '硬件配置',
            prefix: 'hardware',
            items: [
              { text: '硬件配置', link: 'hardware'},
            ],
        },
        {
            text: '软件配置',
            prefix: 'software',
            items: [
              { text: '软件配置', link: 'software'},
            ],
        },
        {
            text: 'MOD配置',
            prefix: 'mods',
            items: [
              { text: 'MOD配置', link: 'mods'},
              { text: '270度前门', link: '270度前门'},
            ],
        },
    ],
  })

export const zhNotes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [zhDemoNote,zhVoron24Note],
})

/* =================== locale: en-US ======================= */

const enDemoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

export const enNotes = defineNotesConfig({
  dir: 'en/notes',
  link: '/en/',
  notes: [enDemoNote],
})

