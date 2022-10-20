using System;

namespace Paroo.Exceptions
{
    [Serializable]
    public class ParooAccessForbiddenException : ParooException
    {
        public ParooAccessForbiddenException()
            : base(ParooErrorCode.AccessForbidden)
        {
        }

        public ParooAccessForbiddenException(string message)
            : base(ParooErrorCode.AccessForbidden, message)
        {
        }

        public ParooAccessForbiddenException(string message, Exception innerException)
            : base(ParooErrorCode.AccessForbidden, message, innerException)
        {
        }
    }
}