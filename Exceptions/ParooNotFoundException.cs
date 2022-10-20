using System;

namespace Paroo.Exceptions
{
    [Serializable]
    public class ParooNotFoundException : ParooException
    {
        public ParooNotFoundException()
            : base(ParooErrorCode.NotFound)
        {
        }

        public ParooNotFoundException(string message)
            : base(ParooErrorCode.NotFound, message)
        {
        }

        public ParooNotFoundException(string message, Exception innerException)
            : base(ParooErrorCode.NotFound, message, innerException)
        {
        }
    }
}
