import test from 'node:test';
import assert from 'node:assert';
import { parseDesc } from '../textUtils.js';

const mockIsSafeUrl = (url) => url && !url.startsWith('javascript:');

test('parseDesc handles basic text without links', () => {
  const desc = "Just plain text";
  const result = parseDesc(desc, {}, mockIsSafeUrl);
  assert.deepStrictEqual(result, ["Just plain text"]);
});

test('parseDesc handles null/empty inputs', () => {
  assert.deepStrictEqual(parseDesc("", {}, mockIsSafeUrl), [""]);
  assert.deepStrictEqual(parseDesc(null, {}, mockIsSafeUrl), [""]);
  assert.deepStrictEqual(parseDesc("some text", null, mockIsSafeUrl), ["some text"]);
});

test('parseDesc handles single link', () => {
  const desc = "Check out {mylink} here";
  const descLinks = {
    mylink: { text: "My Link", url: "https://example.com" }
  };
  const result = parseDesc(desc, descLinks, mockIsSafeUrl);
  assert.deepStrictEqual(result, [
    "Check out ",
    { type: 'link', url: "https://example.com", text: "My Link" },
    " here"
  ]);
});

test('parseDesc handles multiple links', () => {
  const desc = "{link1} and {link2}";
  const descLinks = {
    link1: { text: "One", url: "https://one.com" },
    link2: { text: "Two", url: "https://two.com" }
  };
  const result = parseDesc(desc, descLinks, mockIsSafeUrl);
  assert.deepStrictEqual(result, [
    "",
    { type: 'link', url: "https://one.com", text: "One" },
    " and ",
    { type: 'link', url: "https://two.com", text: "Two" },
    ""
  ]);
});

test('parseDesc handles unsafe URLs', () => {
  const desc = "Click {bad}";
  const descLinks = {
    bad: { text: "XSS", url: "javascript:alert(1)" }
  };
  const result = parseDesc(desc, descLinks, mockIsSafeUrl);
  // Should return the text but not as a link object
  assert.deepStrictEqual(result, [
    "Click ",
    "XSS",
    ""
  ]);
});

test('parseDesc handles missing link keys', () => {
  const desc = "Missing {unknown}";
  const descLinks = {
    known: { text: "Known", url: "https://known.com" }
  };
  const result = parseDesc(desc, descLinks, mockIsSafeUrl);
  assert.deepStrictEqual(result, [
    "Missing ",
    "unknown",
    ""
  ]);
});
