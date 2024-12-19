interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // 如果JSON序列化失败，返回通用错误
    return new Error(String(maybeError));
  }
}

export function handleError(error: unknown, fallbackMessage: string): Error {
  const errorWithMessage = toErrorWithMessage(error);
  
  // 记录错误日志
  console.error('API Error:', {
    message: errorWithMessage.message,
    originalError: error
  });

  // 返回用户友好的错误信息
  return new Error(fallbackMessage);
}

export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
} 