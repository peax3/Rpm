using System;

namespace Paroo.Exceptions
{
    [Serializable]
    public class ParooInvalidOperationException : ParooException
    {
        public ParooInvalidOperationException()
            : base(ParooErrorCode.InvalidOperation)
        {
        }

        public ParooInvalidOperationException(string message)
            : base(ParooErrorCode.InvalidOperation, message)
        {
        }

        public ParooInvalidOperationException(string message, Exception innerException)
            : base(ParooErrorCode.InvalidOperation, message, innerException)
        {
        }
    }
}