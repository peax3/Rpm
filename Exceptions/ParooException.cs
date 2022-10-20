using System;

namespace Paroo.Exceptions
{
  
    [Serializable]
    public abstract class ParooException : Exception
    {
        protected ParooException(string errorCode)
        {
            ErrorCode = errorCode;
        }

        protected ParooException(string errorCode, string message)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        protected ParooException(string errorCode, string message, Exception innerException)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
        }

        public string ErrorCode { get; }
    }
}
