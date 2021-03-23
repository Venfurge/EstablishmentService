using EstablishmentService.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
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

        public async Task<string> CropImage(string fileName, int width, int heigth)
        {
            //Generate directory path
            string path = GetFilePath();

            //If directory not exist
            if (!Directory.Exists(path))
                return null;

            Image image;

            try
            {
                //Load image
                image = await Image.LoadAsync(Path.Combine(path, fileName));
            }
            catch (Exception)
            {
                return null;
            }

            //Create crop variables
            int cropX = 0,
                cropY = 0,
                cropSize = 0;

            //Get crop X, Y, size
            if (image.Height > image.Width)
            {
                cropY = (image.Height / 2) - (image.Width / 2);
                cropSize = image.Width;
            }
            else
            {
                cropX = (image.Width / 2) - (image.Height / 2);
                cropSize = image.Height;
            }

            //Crop and resize image
            var clone = image.Clone(x => x
                    .Crop(new Rectangle(cropX, cropY, cropSize, cropSize))
                    .Resize(width, heigth)
            );

            //Check directory
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            //Generate file name
            var newFileName = GenerateGuidFileName(fileName);

            //Generate file path
            path = Path.Combine(path, newFileName);

            //Save file
            await clone.SaveAsync(path);

            //Delete old file
            await DeleteFile(fileName);

            //Dispose images
            clone?.Dispose();
            image?.Dispose();

            //Return file name
            return newFileName;
        }

        public async Task<(byte[] bytes, string type)> GetImage(string fileName)
        {
            try
            {
                //Get image type
                new FileExtensionContentTypeProvider().TryGetContentType(fileName, out string contentType);

                //Get image bytes and return
                return (await File.ReadAllBytesAsync(Path.Combine(GetFilePath(), fileName)), contentType ?? "application/octet-stream");
            }
            catch (Exception)
            {
                throw new NotFoundException("Image");
            }
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
