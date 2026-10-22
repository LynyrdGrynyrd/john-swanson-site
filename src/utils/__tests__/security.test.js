import test from 'node:test';
import assert from 'node:assert';
import { isSafeUrl } from '../security.js';

test('isSafeUrl validates protocols correctly', () => {
  assert.strictEqual(isSafeUrl('https://example.com'), true);
  assert.strictEqual(isSafeUrl('http://example.com'), true);
  assert.strictEqual(isSafeUrl('mailto:test@example.com'), true);
  assert.strictEqual(isSafeUrl('/internal-path'), true);
  assert.strictEqual(isSafeUrl('#anchor'), true);

  assert.strictEqual(isSafeUrl('javascript:alert(1)'), false);
  assert.strictEqual(isSafeUrl('data:text/html,abc'), false);
  assert.strictEqual(isSafeUrl(''), false);
  assert.strictEqual(isSafeUrl(null), false);
});
