namespace EstablishmentService.Models
{
    public class KeyValueModel
    {
        public string Key { get; set; }
        public string Value { get; set; }

        #region Constructors

        public KeyValueModel()
        {

        }

        public KeyValueModel(string key, string value)
        {
            Key = key;
            Value = value;
        }

        #endregion
    }
}
