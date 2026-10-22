import test from 'node:test';
import assert from 'node:assert';
import { isSafeUrl } from '../security.js';

test('isSafeUrl', async (t) => {
  await t.test('returns true for safe http URLs', () => {
    assert.strictEqual(isSafeUrl('http://example.com'), true);
    assert.strictEqual(isSafeUrl('http://example.com/path'), true);
  });

  await t.test('returns true for safe https URLs', () => {
    assert.strictEqual(isSafeUrl('https://example.com'), true);
    assert.strictEqual(isSafeUrl('https://example.com/path'), true);
  });

  await t.test('returns true for safe mailto URLs', () => {
    assert.strictEqual(isSafeUrl('mailto:test@example.com'), true);
  });

  await t.test('returns true for safe relative root paths', () => {
    assert.strictEqual(isSafeUrl('/about'), true);
    assert.strictEqual(isSafeUrl('/'), true);
  });

  await t.test('returns true for safe anchor URLs', () => {
    assert.strictEqual(isSafeUrl('#section'), true);
    assert.strictEqual(isSafeUrl('#'), true);
  });

  await t.test('handles whitespace and case insensitivity', () => {
    assert.strictEqual(isSafeUrl('  HTTPS://example.com  '), true);
    assert.strictEqual(isSafeUrl('MailTo:test@example.com'), true);
  });

  await t.test('returns false for unsafe javascript URLs', () => {
    assert.strictEqual(isSafeUrl('javascript:alert(1)'), false);
    assert.strictEqual(isSafeUrl('  javascript:alert(1)'), false);
    assert.strictEqual(isSafeUrl('JaVaScRiPt:alert(1)'), false);
  });

  await t.test('returns false for unsafe data URLs', () => {
    assert.strictEqual(isSafeUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTs8L3NjcmlwdD4='), false);
  });

  await t.test('returns false for arbitrary protocols', () => {
    assert.strictEqual(isSafeUrl('ftp://example.com'), false);
    assert.strictEqual(isSafeUrl('file:///etc/passwd'), false);
    assert.strictEqual(isSafeUrl('ws://example.com'), false);
  });

  await t.test('returns false for empty or falsy inputs', () => {
    assert.strictEqual(isSafeUrl(''), false);
    assert.strictEqual(isSafeUrl(null), false);
    assert.strictEqual(isSafeUrl(undefined), false);
  });
});
