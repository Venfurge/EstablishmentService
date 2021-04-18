using System;
using System.IO;
using System.Security.Cryptography;

namespace EstablishmentService.Services
{
    public static class AesAlgorithm
    {
        #region Private Members

        private static Aes _aes { get; set; }

        #endregion

        #region Constructors

        static AesAlgorithm()
        {
            _aes = Aes.Create();
        }

        #endregion

        public static byte[] EncryptStringToBytes(string text)
        {
            // Check arguments
            if (text == null || text.Length <= 0)
                throw new ArgumentNullException("text");
            if (_aes.Key == null || _aes.Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (_aes.IV == null || _aes.IV.Length <= 0)
                throw new ArgumentNullException("IV");

            byte[] encryptedText;

            // Create an encryptor to perform the stream transform.
            ICryptoTransform encryptor = _aes.CreateEncryptor(_aes.Key, _aes.IV);

            // Create the streams used for encryption.
            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                    {
                        //Write all data to the stream.
                        swEncrypt.Write(text);
                    }
                    encryptedText = msEncrypt.ToArray();
                }
            }


            // Return the encrypted bytes from the memory stream.
            return encryptedText;
        }

        public static string DecryptStringFromBytes(byte[] encryptedText)
        {
            // Check arguments.
            if (encryptedText == null || encryptedText.Length <= 0)
                throw new ArgumentNullException("encryptedText");
            if (_aes.Key == null || _aes.Key.Length <= 0)
                throw new ArgumentNullException("Key");
            if (_aes.IV == null || _aes.IV.Length <= 0)
                throw new ArgumentNullException("IV");

            // Declare the string used to hold
            // the decrypted text.
            string text = null;

            // Create a decryptor to perform the stream transform.
            ICryptoTransform decryptor = _aes.CreateDecryptor(_aes.Key, _aes.IV);

            // Create the streams used for decryption.
            using (MemoryStream msDecrypt = new MemoryStream(encryptedText))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {

                        // Read the decrypted bytes from the decrypting stream
                        // and place them in a string.
                        text = srDecrypt.ReadToEnd();
                    }
                }
            }

            return text;
        }
    }
}
