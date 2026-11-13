import assert from 'node:assert/strict';
import test from 'node:test';

import { demoHref, demos } from '../../resources/js/landing/content/demos.ts';
import { interactiveUrl, pageUrl } from '../../resources/js/landing/content/links.ts';

const LANGS = ['en', 'id', 'ja'];

test('AI categories open the interactive site in the chosen language', () => {
    for (const lang of LANGS) {
        assert.equal(interactiveUrl('/solutions', lang), `https://fts-ai-lp.fts-tech.co.id/fts/solutions?lang=${lang}`);
        assert.equal(interactiveUrl('', lang), `https://fts-ai-lp.fts-tech.co.id/fts?lang=${lang}`);
    }
});

test('every demo keeps its own direct link with the language parameter', () => {
    assert.equal(demos.length, 16);
    assert.equal(new Set(demos.map((demo) => demo.url)).size, 16);

    for (const demo of demos) {
        assert.match(demo.url, /^https:\/\/[a-z-]+\.fts-tech\.co\.id\//);
        assert.doesNotMatch(demo.url, /fts-ai-lp/);
        for (const lang of LANGS) {
            const expected = demo.brokenLangs?.includes(lang) ? 'id' : lang;
            assert.equal(demoHref(demo, lang), `${demo.url}?lang=${expected}`);
        }
    }
});

test('in-page links keep the language before the hash', () => {
    assert.equal(pageUrl('/', 'ja', '#solutions'), '/?lang=ja#solutions');
    assert.equal(pageUrl('/consultation', 'id'), '/consultation?lang=id');
});
