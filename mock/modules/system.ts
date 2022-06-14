import { resultSuccess } from "../_utils";
import { Random } from 'mockjs';

const articleList = () => {
  const result: any[] = [];
  const len = Random.natural(10, 99);
  for(let i = 0;i < len;i++) {
    result.push({
      title: Random.cparagraph(1),
      date: Random.date('yyyy-MM-dd'),
      text: Random.cparagraph(10, 99),
      key: i,
    });
  }

  return { 
    result,
    len,
  };
};

const pictureList = () => {
  const result: any[] = [];
  const len = Random.natural(1, 20);
  const size = '400x300';
  const format = 'png';
  for(let i = 0;i < len;i++) {
    result.push({
      data: Random.image(size, format),
    });
  }
  return {
    result,
    size,
    format,
    len,
  };
};

const discussList = () => {
  const result: any[] = [];
  const len = Random.natural(5, 10);
  for(let i = 0;i < len;i++) {
    result.push({
      message: Random.cparagraph(3, 10),
    });
  }

  return {
    result,
  };
};

export default [
  {
    url: '/api/articles',
    timeout: 1000,
    method: 'GET',
    response: () => {
      const result  = articleList();
      // console.log(result);
      return resultSuccess({
        ...result
      });
    },
  },
  {
    url: '/api/pictures',
    timeout: 1000,
    method: 'GET',
    response: () => {
      const result = pictureList();
      return resultSuccess({
        ...result,
      });
    },
  },
  {
    url: '/api/discuss',
    timeout: 1000,
    method: 'GET',
    response: () => {
      const result = discussList();
      return resultSuccess({
        ...result,
      });
    },
  },
];