export default function(url, params) {
  Object.keys(params).sort().forEach(key => {
    let separator = (url.indexOf('?') === -1) ? '?' : '&';
    let param = encodeURIComponent(key);
    let value = encodeURIComponent(params[key]);

    url += `${separator}${param}=${value}`;
  });

  return url;
}
