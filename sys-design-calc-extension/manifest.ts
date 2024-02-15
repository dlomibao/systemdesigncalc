import { type ManifestV3Export } from '@crxjs/vite-plugin'
export const manifest: ManifestV3Export = {
    manifest_version: 3,
    name: 'System Design Calculator',
    description: 'This extension allows you to perform system design estimation calculation easily. highlight expression, ctrl+space to evaluate to clipboard, ctrl+v to replace selected text',
    version: process.env.npm_package_version?process.env.npm_package_version:'0.0.1',
    action: {
        default_popup: 'index.html',
    },
    icons: {
        "128": "assets/sysdesigncalc128.png",
        "48": "assets/sysdesigncalc48.png"
    },
    background: {
        service_worker: 'src/service-worker.ts',
        type: 'module',
    },
    web_accessible_resources: [
        {
            resources: ['public/**'],
            matches: ['*://*/*'],
        },
    ],
    permissions: [
        'activeTab',
        'storage',
    ],
    content_scripts: [
        {
            js: ['src/sysdesigncalc.ts'],
            matches: ['https://*/*', 'http://*/*'],
        },
    ],
    // Host permissions for all urls is needed because websites to block are determined by users.
    // Thus extension does not know which urls to block in advance
    host_permissions: ['<all_urls>'],
}