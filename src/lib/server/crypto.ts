import { Buffer } from 'buffer'
import {
  type BinaryToTextEncoding,
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual
} from  'crypto'
import { Error } from '$lib/error'

export class Verifier {
  constructor(
    private _secret: string,
    private _encoding: BinaryToTextEncoding
  ) { }

  sign(message: string) {
    return createHmac('sha256', this._secret)
      .update(message)
      .digest(this._encoding)
  }

  verify(message: string, signature: string) {
    const messageBuffer = Buffer.from(this.sign(message), this._encoding)
    const signatureBuffer = Buffer.from(signature, this._encoding)

    return Verifier.isEqual(messageBuffer, signatureBuffer)
  }

  static isEqual(a: Buffer, b: Buffer) {
    return a.length === b.length && timingSafeEqual(a, b)
  }
}

export class Encrypter {
  private readonly _algorithm = 'aes-256-cbc'
  private readonly _cipherEncoding = 'base64url'
  private readonly _ivEncoding = 'hex'
  private readonly _ivSize = 16 // 'aes' block size
  private readonly _plainEncoding = 'utf-8'
  private readonly _signSeparator = '.'
  private readonly _verifier

  constructor(private _secret: string) {
    this._verifier = new Verifier(this._secret, this._cipherEncoding)
  }

  encrypt(plaintext: string) {
    const ivBuffer = randomBytes(this._ivSize)
    const secretBuffer = Buffer.from(this._secret)
    const cipher = createCipheriv(this._algorithm, secretBuffer, ivBuffer)

    let ciphertext = cipher.update(
      plaintext,
      this._plainEncoding,
      this._cipherEncoding
    )

    const iv = ivBuffer.toString(this._ivEncoding)
    ciphertext += cipher.final(this._cipherEncoding)

    return `${iv}${ciphertext}`
  }

  decrypt(ciphertext: string) {
    const ivSize = this._ivSize * 2 // Because 'hex'

    const iv = ciphertext.slice(0, ivSize)
    const text = ciphertext.slice(ivSize)
    const ivBuffer = Buffer.from(iv, this._ivEncoding)
    const secretBuffer = Buffer.from(this._secret)

    const decipher = createDecipheriv(this._algorithm, secretBuffer, ivBuffer)

    const plaintext = decipher.update(
      text,
      this._cipherEncoding,
      this._plainEncoding
    )

    return plaintext + decipher.final(this._plainEncoding)
  }

  encryptAndSign(plaintext: string) {
    const ciphertext = this.encrypt(plaintext)
    const signature = this._verifier.sign(ciphertext)

    return `${ciphertext}${this._signSeparator}${signature}`
  }

  verifyAndDecrypt(ciphertext: string) {
    const [ text, signature ] = ciphertext.split(this._signSeparator, 2)

    if (!signature || !this._verifier.verify(text, signature)) {
      throw new Error('Message verification failed')
    }

    return this.decrypt(text)
  }
}
