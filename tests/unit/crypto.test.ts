import { describe, expect, it } from 'vitest'
import { Encrypter, Verifier } from '../../src/lib/server/crypto'
import { Error } from '../../src/lib/error'

describe(Verifier, () => {
  describe('.verify', () => {
    it('verifies message signature', () => {
      const message = 'Hello, World'
      const secret = 'abcdefghijklmnopqrstuvwxyz123456'

      const verifier = new Verifier(secret, 'hex')
      const signature = verifier.sign(message)

      expect(verifier.verify(message, signature)).toBe(true)
      expect(verifier.verify('abcdef', signature)).toBe(false)
      expect(verifier.verify(message, 'wrong-signature')).toBe(false)
    })
  })
})

describe(Encrypter, () => {
  describe('.verifyAndDecrpt', () => {
    it('verifies and decrypts ciphertext', () => {
      const plaintext = 'Hello, World'
      const secret = 'abcdefghijklmnopqrstuvwxyz123456'

      const crypto = new Encrypter(secret)
      const ciphertext = crypto.encryptAndSign(plaintext)

      expect(crypto.verifyAndDecrypt(ciphertext)).toBe(plaintext)
      expect(() => crypto.verifyAndDecrypt('wrong:ciphertext')).toThrow(Error)
    })
  })
})
