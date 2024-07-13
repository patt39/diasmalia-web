export type Method = {
  endpoint: string;
  method: 'get' | 'post' | 'put' | 'delete';
  error?: string;
};

type MethodC = (endpoint: string, options?: { error?: string }) => Method;

export const GET: MethodC = (endpoint, options) => ({
  method: 'get',
  endpoint,
  ...options,
});

export const POST: MethodC = (endpoint, options) => ({
  method: 'post',
  endpoint,
  ...options,
});

export const PUT: MethodC = (endpoint, options) => ({
  method: 'put',
  endpoint,
  ...options,
});

export const DELETE: MethodC = (endpoint, options) => ({
  method: 'delete',
  endpoint,
  ...options,
});
