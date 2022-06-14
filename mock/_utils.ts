import Mock from 'mockjs';
export function resultSuccess (result, { message = 'OK' } = {}) {
  return Mock.mock({
    code: '200',
    result,
    message,
    type: 'success',
  });
}