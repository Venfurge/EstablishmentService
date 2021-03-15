using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace EstablishmentService.Services
{
    public class FileService
    {
        #region Private Members

        private IConfiguration _configuration;

        #endregion

        #region Constructors

        public FileService(IConfiguration configuration)
            => (_configuration) = (configuration);

        #endregion

        #region FileService Implementation

        public async Task<string> UploadFile(IFormFile file)
        {
            //Get directory path
            string path = GetFilePath();

            //Check if directory exist
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            //Generate unique file name
            var fileName = GenerateGuidFileName(file.FileName);

            //Generate file path
            path = Path.Combine(path, fileName);

            //Save file
            using (var filestream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(filestream);
            }

            //Return file name
            return fileName;
        }

        public async Task<bool> DeleteFile(string fileName)
        {
            //Generate directory path
            string path = GetFilePath();

            //If directory not exist
            if (!Directory.Exists(path))
                return false;

            try
            {
                //Remove file
                File.Delete(Path.Combine(path, fileName));
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }

        #endregion

        #region Private Methods

        private string GetFilePath()
        {
            return Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), //Get documents path
                _configuration["FilesDefaultPath"], //Use app path in documents
                _configuration["FilesPath"] //Use files path
                );
        }

        private string GenerateGuidFileName(string fileName)
        {
            return Guid.NewGuid().ToString() + Path.GetExtension(fileName);
        }

        #endregion
    }
}
