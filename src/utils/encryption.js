import crypto from 'crypto';
import config from '../config/index.js';

const ENCRYPTION_KEY = config.encryption.key;
const ALGORITHM = config.encryption.algorithm;

export const encryptData = (data) => {
  try {
    const text = typeof data === 'string' ? data : JSON.stringify(data);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      encrypted,
      iv: iv.toString('hex'),
      algorithm: ALGORITHM
    };
  } catch {
    return { error: 'Encryption failed' };
  }
};

export const obfuscateData = (data) => {
  try {
    const text = typeof data === 'string' ? data : JSON.stringify(data);
    return Buffer.from(text).toString('base64');
  } catch {
    return null;
  }
};

export const advancedObfuscate = (data) => {
  try {
    const text = typeof data === 'string' ? data : JSON.stringify(data);
    const base64 = Buffer.from(text).toString('base64');

    let obfuscated = '';
    for (let i = 0; i < base64.length; i++) {
      const char = base64.charCodeAt(i);
      obfuscated += String.fromCharCode(char + (i % 7) + 3);
    }

    const timestamp = Date.now().toString(36);
    return `${timestamp}:${Buffer.from(obfuscated).toString('base64')}`;
  } catch {
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const { encrypted } = encryptedData;
    const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};

export const deobfuscateData = (obfuscatedData) => {
  try {
    const decoded = Buffer.from(obfuscatedData, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const advancedDeobfuscate = (obfuscatedData) => {
  try {
    const [, encodedData] = obfuscatedData.split(':');
    const obfuscated = Buffer.from(encodedData, 'base64').toString('utf8');

    let base64 = '';
    for (let i = 0; i < obfuscated.length; i++) {
      const char = obfuscated.charCodeAt(i);
      base64 += String.fromCharCode(char - (i % 7) - 3);
    }

    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export default {
  encryptData,
  decryptData,
  obfuscateData,
  deobfuscateData,
  advancedObfuscate,
  advancedDeobfuscate
};
