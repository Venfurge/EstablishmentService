namespace EstablishmentService.Models
{
    public class SingleFieldModel<T>
    {
        public T Value { get; set; }

        public SingleFieldModel(T value)
            => (Value) = (value);
    }
}
