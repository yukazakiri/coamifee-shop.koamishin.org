import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Prologue',
      items: [
        {
          type: 'doc',
          label: 'Release Notes',
          id: 'prologue/release-notes',
        },
        {
          type: 'doc',
          label: 'Upgrade Guide',
          id: 'prologue/upgrade',
        },
        {
          type: 'doc',
          label: 'Contribution Guide',
          id: 'prologue/contribution-guide',
        },
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        {
          type: 'doc',
          label: 'Introduction',
          id: 'getting-started/introduction',
        },
        {
          type: 'doc',
          label: 'Installation',
          id: 'getting-started/installation',
        },
        {
          type: 'doc',
          label: 'Securing',
          id: 'getting-started/securing',
        },
        {
          type: 'doc',
          label: 'Configuration',
          id: 'getting-started/configuration',
        },
        {
          type: 'doc',
          label: 'Update',
          id: 'getting-started/update',
        },
      ],
    },
  ],
};

export default sidebars;
