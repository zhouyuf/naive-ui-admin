import axios from "axios";

const host = '';

export function getArticles() {
  return axios.request({
    url: `${host}/api/articles`,
    method: 'GET',
  });
};

export function getPictures() {
  return axios.request({
    url: `${host}/api/pictures`,
    method: 'GET',
  });
};

export function getDiscuss() {
  return axios.request({
    url: `${host}/api/discuss`,
    method: 'GET',
  });
};